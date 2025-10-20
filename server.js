require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Admin Login API
app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM admins WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid Username or Password" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Public Login API
app.post('/public-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      `SELECT * FROM public WHERE userpass = ? AND (usermail = ? OR userph = ? OR username = ?)`,
      [password, username, username, username]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid Username or Password" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Verify email/username exists
app.post("/forgot-password", async (req, res) => {
  const { identifier } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM public WHERE usermail = ? OR username = ?",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "User Not Found." });
    }

    return res.json({
      success: true,
      message: "User Found. Please Enter your New Password.",
    });
  } catch (err) {
    console.error("Error in /forgot-password:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// Reset Password
app.post("/reset-password", async (req, res) => {
  const { identifier, newPassword } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE public SET userpass = ? WHERE usermail = ? OR username = ?",
      [newPassword, identifier, identifier]
    );

    if (result.affectedRows === 0) {
      return res.json({
        success: false,
        message: "User Not Found. Cannot Reset Password.",
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /reset-password:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// Get all alerts
app.get("/alerts", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM alerts ORDER BY date DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Update an alert by ID
app.put("/alerts/:id", async (req, res) => {
  const { id } = req.params;
  const { message, date } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE alerts SET message = ?, date = ? WHERE id = ?",
      [message, date, Number(id)]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Alert updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Alert not found" });
    }
  } catch (error) {
    console.error("Error updating alert:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Report Disaster API
app.post("/report-disaster", async (req, res) => {
  const { date, location, latitude, longitude, disasterType, district } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO disaster (ddate, dlocation, dlatitude, dlongtitude, dtype, ddistrict) 
       VALUES (?, ?, ?, ?, ?, ?)`, [date, location, latitude, longitude, disasterType, district]
    );

    res.json({
      success: true,
      message: "Disaster Reported Successfully",
      reportId: result.insertId
    });

  } catch (err) {
    console.error("Error Inserting Report:", err);
    res.status(500).json({ success: false, message: "Database Error" });
  }
});

// Show Disaster which are Live - API
app.get("/live-updates", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM disaster WHERE dstatus IN ('Active', 'Progress','Completed') ORDER BY reported_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Disasters:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Disaster Status Update API
app.post("/status-disaster", async (req, res) => {
  const { reportId, status, deathCount } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE disaster SET dstatus = ?, ddeathcount = ? WHERE did = ?`,
      [status, deathCount, reportId]
    );

    await db.query(
      `DELETE v FROM volunteer v JOIN disaster d ON v.disasterid = d.did WHERE d.dstatus = 'Inactive';`
    );

    await db.query(
      `DELETE vi FROM victim vi JOIN disaster di ON vi.disasterid = di.did WHERE di.dstatus = 'Inactive';`
    );

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Report Not Found" });
    }
  } catch (err) {
    console.error("Error Updating Status:", err);
    res.status(500).json({ success: false, message: "Database Error" });
  }
});

// List of all Disasters - API
app.get("/all-disasters", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM disaster  ORDER BY did ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Disasters:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// New User Registration API
app.post("/new-user", async (req, res) => {
  const { name, dob, mailId, phoneNumber, houseName, location, panchayathName, district, state, gender, password } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO public(username, userdob, usermail, userph, userhouse, userlocation, userpanchayath, userdistrict, userstate, usergender, userpass) 
             VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, dob, mailId, phoneNumber, houseName, location, panchayathName, district, state, gender, password]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Check User Details API
app.get("/check-user", async (req, res) => {
  const { label, inputValue } = req.query;

  const allowedLabels = ["idpublic", "username", "usermail", "userph", "userhouse", "userlocation"];
  if (!allowedLabels.includes(label)) {
    return res.status(400).json({ success: false, message: "Invalid label" });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM public WHERE (${label}) LIKE (?)`,
      [`%${inputValue}%`]
    );

    if (rows.length > 0) {
      res.json({ success: true, users: rows });
    } else {
      res.json({ success: false, message: "User Not Found" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Volunteer Registration
app.post("/volunteers", async (req, res) => {
  const { id, disasterid, role } = req.body;

  try {
    await db.query(
      "INSERT INTO volunteer (userid, disasterid, role) VALUES (?, ?, ?)",
      [id, disasterid, role]
    );
    res.json({ success: true, message: "Volunteer Registered Successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// Volunteer Update
app.post("/update-volunteers", async (req, res) => {
  const { id, disasterid, role } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE volunteer SET role = ?, disasterid = ? WHERE userid = ? ",
      [role, disasterid, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    }

    if (result.affectedRows > 0 && result.changedRows === 0) {
      return res.json({ success: true, message: "No change: Volunteer already has this status" });
    }

    return res.json({ success: true, message: "Volunteer Status Updated Successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// List of Volunteers
app.get("/all-volunteers", async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT v.*, p.*, d.dlocation AS disaster_name, d.dtype AS disaster_type,d.did FROM volunteer v INNER JOIN public p ON v.userid = p.idpublic INNER JOIN disaster d ON v.disasterid = d.did ORDER BY d.did DESC;
        `);
    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Volunteers with Public:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Victim Registration
app.post("/victims", async (req, res) => {
  const { id, disasterid, status } = req.body;

  try {
    await db.query(
      "INSERT INTO victim (userid, disasterid, status) VALUES (?, ?, ?)",
      [id, disasterid, status]
    );
    res.json({ success: true, message: "Victim Registered Successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// Victim Update
app.post("/update-victims", async (req, res) => {
  const { userid, status } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE victim SET status = ? WHERE userid = ?",
      [status, userid]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Victim not found" });
    }

    if (result.affectedRows > 0 && result.changedRows === 0) {
      return res.json({ success: true, message: "No change: Victim already has this status" });
    }

    return res.json({ success: true, message: "Victim Status Updated Successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// List of Victims 
app.get("/all-victims", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT v.*, p.*, d.dlocation AS disaster_name, d.dtype AS disaster_type, d.did FROM victim v INNER JOIN public p ON v.userid = p.idpublic INNER JOIN disaster d ON v.disasterid = d.did ORDER BY d.dlocation ASC;`
    );

    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Victims with Public:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Count of Volunteers by Role
app.get("/volunteer-count", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
    d.did,
    d.dlocation,
    d.dtype,
    v.role,
    SUM(CASE WHEN p.usergender = 'Male' THEN 1 ELSE 0 END) AS male_count,
    SUM(CASE WHEN p.usergender = 'Female' THEN 1 ELSE 0 END) AS female_count,
    COUNT(*) AS total
FROM volunteer v
INNER JOIN disaster d ON v.disasterid = d.did
INNER JOIN public p ON v.userid = p.idpublic
GROUP BY d.did, v.role
ORDER BY d.did DESC;`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// New Camp Registration
app.post("/new-camp", async (req, res) => {
  const { campName, location, panchayathName, district, state, capacity, wardNumber, phoneNumber, rooms, washrooms, kitchen } = req.body;

  const commodities = [
    "Rice", "Wheat", "Dal (Lentils)", "Vegetable - Cabbage", "Vegetable - Carrot",
    "Vegetable - Potato", "Vegetable - Onion", "Vegetable - Tomato", "Milk", "Eggs",
    "Bread", "Water Bottles", "Blankets", "Clothes", "Soap", "Sanitary Pads", "Toothpaste"
  ];

  try {
    const [result] = await db.query(
      "INSERT INTO reliefcamp (rname, rlocation, rpan, rdis, rstate, rpeople, rward, rph, rroom, rwash, rkit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [campName, location, panchayathName, district, state, capacity, wardNumber, phoneNumber, rooms, washrooms, kitchen]
    );

    const campId = result.insertId;

    const values = commodities.map(item => [campId, item]);
    await db.query(
      "INSERT INTO resource (campid, oname) VALUES ?",
      [values]
    );

    res.json({ success: true, campId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// Listing Single Camp Details
app.get("/check-relief", async (req, res) => {
  const { label, inputValue } = req.query;

  if (!label || !inputValue) {
    return res.json({ success: false, message: "Missing parameters" });
  }

  const allowedLabels = ["rnumber", "rname", "rlocation", "rpan", "rward", "rph"];
  if (!allowedLabels.includes(label)) {
    return res.json({ success: false, message: "Invalid label" });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM reliefcamp WHERE ${label} = ?`,
      [inputValue]
    );

    if (rows.length > 0) {
      res.json({ success: true, users: rows });
    } else {
      res.json({ success: false, message: "No matching camp found" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "Error querying database" });
  }
});

// List of all Relief Camps 
app.get("/reliefcamps", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.rnumber,
        r.rname,
        r.rlocation,
        r.rdis,
        r.rstate,
        r.rpan,
        r.rward,
        r.rph,
        r.rpeople,
        r.rroom,
        r.rwash,
        r.rkit,
        COUNT(CASE WHEN p.usergender = 'Male' THEN 1 END) AS men_count,
        COUNT(CASE WHEN p.usergender = 'Female' THEN 1 END) AS women_count
      FROM reliefcamp r
      LEFT JOIN reliefcampusers ru ON r.rnumber = ru.campid
      LEFT JOIN public p ON ru.userid = p.idpublic
      WHERE r.rstatus = 'Active'
      GROUP BY r.rnumber, r.rname, r.rlocation, r.rdis, r.rstate, r.rpan, r.rward, r.rph, r.rpeople, r.rroom, r.rwash, r.rkit
      ORDER BY r.rnumber ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Relief Camp Status Update API
app.post("/status-relief", async (req, res) => {
  const { rcId, rcstatus } = req.body;

  const commodities = [
    "Rice", "Wheat", "Dal (Lentils)", "Vegetable - Cabbage", "Vegetable - Carrot",
    "Vegetable - Potato", "Vegetable - Onion", "Vegetable - Tomato", "Milk", "Eggs",
    "Bread", "Water Bottles", "Blankets", "Clothes", "Soap", "Sanitary Pads", "Toothpaste"
  ];

  try {
    const [result] = await db.query(
      `UPDATE reliefcamp SET rstatus = ? WHERE rnumber = ?`,
      [rcstatus, rcId]
    );

    if (rcstatus === "Inactive") {
      await db.query(
        `DELETE v FROM resource v 
         JOIN reliefcamp d ON v.campid = d.rnumber 
         WHERE d.rstatus = 'Inactive' AND d.rnumber = ?`,
        [rcId]
      );
      await db.query(
        `DELETE vi FROM reliefcampusers vi 
         JOIN reliefcamp di ON vi.campid = di.rnumber 
         WHERE di.rstatus = 'Inactive' AND di.rnumber = ?`,
        [rcId]
      );
    } else if (rcstatus === "Active") {
      const values = commodities.map(item => [rcId, item]);
      await db.query(
        "INSERT INTO resource (campid, oname) VALUES ?",
        [values]
      );
    }

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Relief Camp Not Found" });
    }
  } catch (err) {
    console.error("Error Updating Status:", err);
    res.status(500).json({ success: false, message: "Relief Camp Not Found" });
  }
});

// Relief Camp Details Update API
app.post("/update-relief", async (req, res) => {
  const { rnumber, label, inputValue } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE reliefcamp SET ${label} = ? WHERE rnumber = ?`,
      [inputValue, rnumber]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Relief Camp Not Found" });
    }
  } catch (err) {
    console.error("Error Updating Status:", err);
    res.status(500).json({ success: false, message: "Database Error" });
  }
});

// New Resident Registration in Relief Camp API
app.post("/new-user-relief", async (req, res) => {
  const { id, rnumber, status } = req.body;

  try {
    const [userCheck] = await db.query(
      "SELECT idpublic FROM public WHERE idpublic = ?",
      [id]
    );
    if (userCheck.length === 0) {
      return res.status(400).json({
        success: false,
        message: `User with Id ${id} does not Exist.`,
      });
    }

    const [campCheck] = await db.query(
      "SELECT rnumber FROM reliefcamp WHERE rnumber = ?",
      [rnumber]
    );
    if (campCheck.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Camp with Id ${rnumber} does not Exist.`,
      });
    }

    const [result] = await db.query(
      `INSERT INTO reliefcampusers(userid, campid, userstatus) VALUES(?, ?, ?)`,
      [id, rnumber, status]
    );

    return res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});


// Showing Residents in a particular Camp API
app.get("/camp-users-list", async (req, res) => {
  const { campId } = req.query;

  try {
    const [rows] = await db.query(
      `SELECT rc.rnumber, p.idpublic, p.username, p.usergender, p.userdob, p.usermail, p.userph,p.userhouse,p.userlocation
       FROM reliefcamp rc
       INNER JOIN reliefcampusers rcu ON rc.rnumber = rcu.campid
       INNER JOIN public p ON rcu.userid = p.idpublic
       WHERE rc.rnumber = ?
       ORDER BY p.username ASC`,
      [campId]
    );

    if (rows.length > 0) {
      res.json({
        success: true,
        camp: { id: rows[0].rnumber },
        residents: rows
      });
    } else {
      const [campCheck] = await db.query(
        "SELECT rnumber FROM reliefcamp WHERE rnumber = ?",
        [campId]
      );
      if (campCheck.length === 0) {
        res.json({ success: false, message: "Camp Not Found" });
      } else {
        res.json({ success: false, message: "No residents found in this camp" });
      }
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

app.post("/accept-donation", async (req, res) => {
  const {
    cid,
    commodity,
    donatingQuantity,
    donatingPersonName,
    phoneNumber,
    deliveryDate
  } = req.body;

  try {
    const [campCheck] = await db.query(
      "SELECT rnumber FROM reliefcamp WHERE rnumber = ?",
      [cid]
    );

    if (campCheck.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Camp with ID ${cid} does not exist`,
      });
    }

    const [result] = await db.query(
      "INSERT INTO donation (cid, object, amount, person, phperson, dedate) VALUES (?, ?, ?, ?, ?, ?)",
      [cid, commodity, donatingQuantity, donatingPersonName, phoneNumber, deliveryDate]
    );

    res.json({
      success: true,
      message: "Donation added successfully",
      donationId: result.insertId,
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error occurred",
      error: err.sqlMessage,
    });
  }
});

// Show Donation List - API
app.get("/list-donation", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM donation ORDER BY dedate DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Donations:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Show Donations for a specific camp
app.get("/live-donation/:campId", async (req, res) => {
  const { campId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT donationid, object, amount, cid, dedate FROM donation WHERE cid = ? ORDER BY dedate DESC",
      [campId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Donations:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Accept Donation API
app.post("/accept-donations", async (req, res) => {
  const { donationid, campId } = req.body;

  try {
    const [[donation]] = await db.query(
      "SELECT * FROM donation WHERE donationid = ? AND cid = ?",
      [donationid, campId]
    );

    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation not found" });
    }

    await db.query(
      "UPDATE resource SET amount = amount + ? WHERE campid = ? AND oname = ?",
      [donation.amount, campId, donation.object]
    );

    await db.query(
      "DELETE FROM donation WHERE donationid = ?",
      [donationid]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error Accepting Donation:", err);
    res.status(500).json({ success: false, message: "Database Error" });
  }
});

// Update Resource in Relief Camp API
app.post("/update-resources", async (req, res) => {
  const { rnumber, commodity, amount } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE resource SET amount = ? WHERE campid = ? AND oname = ?`,
      [amount, rnumber, commodity]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Camp Not Found" });
    }
  } catch (err) {
    console.error("Error Updating Status:", err);
    res.status(500).json({ success: false, message: "Database Error" });
  }
});

app.get("/list-resources/:campId", async (req, res) => {
  try {
    const { campId } = req.params;

    const commodities = [
      "Rice", "Wheat", "Dal (Lentils)", "Vegetable - Cabbage", "Vegetable - Carrot",
      "Vegetable - Potato", "Vegetable - Onion", "Vegetable - Tomato", "Milk", "Eggs",
      "Bread", "Water Bottles", "Blankets", "Clothes", "Soap", "Sanitary Pads", "Toothpaste"
    ];

    const [campData] = await db.query(
      "SELECT rname FROM reliefcamp WHERE rnumber = ?", [campId]
    );

    if (campData.length === 0) {
      return res.json({ error: "Camp not found" });
    }

    const campName = campData[0].rname;

    const [rows] = await db.query(
      `SELECT oname, amount FROM resource WHERE campid = ?`,
      [campId]
    );

    const stockMap = {};
    rows.forEach(row => {
      stockMap[row.oname] = row.amount;
    });

    const resources = commodities.map(item => {
      return { item, stock: stockMap[item] || 0 };
    });

    res.json({ campName, resources });

  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get current user's profile
app.get('/profile', async (req, res) => {
  const identifier = req.query.identifier;
  if (!identifier) {
    return res.json({ success: false, message: "No user specified." });
  }
  try {
    const [rows] = await db.query(
      "SELECT * FROM public WHERE usermail = ? OR username = ? LIMIT 1",
      [identifier, identifier]
    );
    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found." });
    }
    return res.json({ success: true, profile: rows[0] });
  } catch (err) {
    console.error("Error in /profile GET:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// Update current user's profile
app.put('/profile', async (req, res) => {
  let { username, usermail, userph, userhouse, userlocation, userdob, usergender } = req.body;

  if (userdob) {
    if (userdob.includes('T')) {
      userdob = userdob.split('T')[0];
    }
    else if (/^\d{2}-\d{2}-\d{4}$/.test(userdob)) {
      const [dd, mm, yyyy] = userdob.split('-');
      userdob = `${yyyy}-${mm}-${dd}`;
    }
  }

  if (!usermail && !username) {
    return res.json({ success: false, message: "No user specified." });
  }
  try {
    const [result] = await db.query(
      "UPDATE public SET username = ?, userph = ?, userhouse = ?, userlocation = ?, userdob = ?, usergender = ? WHERE usermail = ? OR username = ?",
      [username, userph, userhouse, userlocation, userdob, usergender, usermail, username]
    );
    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "User not found or nothing changed." });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /profile PUT:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
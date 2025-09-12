require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

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

// Live Updates API
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

// Status Update API
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

//List of Disasters
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
    await db.query(
      "UPDATE volunteer SET role = ?, disasterid = ? WHERE userid = ? ",
      [role, disasterid, id]
    );
    res.json({ success: true, message: "Volunteer Status Updated Successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// List of Volunteers with Public Details
app.get("/all-volunteers", async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT v.*, p.*, d.dlocation AS disaster_name, d.dtype AS disaster_type FROM volunteer v INNER JOIN public p ON v.userid = p.idpublic INNER JOIN disaster d ON v.disasterid = d.did ORDER BY d.dlocation ASC;
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
  const { id, status } = req.body;

  try {
    await db.query(
      "UPDATE victim SET status = ? WHERE userid = ?",
      [status, id]
    );

    if (["Safe", "Injured", "Hospitalized"].includes(status)) {
      await db.query(
        "UPDATE reliefcampusers SET userstatus = ? WHERE userid = ?",
        [status, id]
      );
    }

    res.json({ success: true, message: "Victim Status Updated Successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// List of Victims with Public Details
app.get("/all-victims", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT v.*, p.*, d.dlocation AS disaster_name, d.dtype AS disaster_type FROM victim v INNER JOIN public p ON v.userid = p.idpublic INNER JOIN disaster d ON v.disasterid = d.did ORDER BY d.dlocation ASC;`
    );

    res.json(rows);
  } catch (err) {
    console.error("Error Fetching Victims with Public:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

//Count of Volunteers by Role
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
ORDER BY d.did ASC;`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//New Camp Registration
app.post("/new-camp", async (req, res) => {
  const { campName, location, panchayathName, district, state, capacity, wardNumber, phoneNumber, rooms, washrooms, kitchen } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO reliefcamp (rname, rlocation, rpan, rdis, rstate, rpeople, rward, rph, rroom, rwash, rkit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [campName, location, panchayathName, district, state, capacity, wardNumber, phoneNumber, rooms, washrooms, kitchen]
    );
    res.json({ success: true, campId: result.insertId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// List of Relief Camps with men/women count
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

// Check Relief Camp Details API
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
      res.json({ success: false, message: "No residents found in this camp" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// New Person Registration API
app.post("/new-user-relief", async (req, res) => {
  const { id, rnumber, status } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO reliefcampusers(userid, campid, userstatus) 
             VALUES(?, ?, ?)`,
      [id, rnumber, status]
    );
    res.json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Relief Camp Status Update API
app.post("/status-relief", async (req, res) => {
  const { rcId, rcstatus } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE reliefcamp SET rstatus = ? WHERE rnumber = ?`,
      [rcstatus, rcId]
    );

    await db.query(
      `DELETE v FROM resources v JOIN reliefcamp d ON v.cid = d.rnumber WHERE d.rstatus = 'Inactive';`
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

// List of Residents in Each Camp
app.get("/camp-users/:campId", async (req, res) => {
  const { campId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT rc.rnumber, rc.rname, rc.rlocation, 
              p.idpublic, p.pname, p.gender, p.age, p.phone, p.address
       FROM reliefcamp rc
       INNER JOIN reliefcampusers rcu ON rc.rnumber = rcu.campid
       INNER JOIN public p ON rcu.userid = p.idpublic
       WHERE rc.rnumber = ?
       ORDER BY p.pname ASC`,
      [campId]
    );

    if (rows.length > 0) {
      res.json({ success: true, camp: rows[0].rname, users: rows });
    } else {
      res.json({ success: false, message: "No users found in this camp" });
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database Error" });
  }
});

// Resource Donation API
app.post("/donate-resource", async (req, res) => {
  const { campName, commodity, donatingPersonName, donatingQuantity, deliveryDate, phoneNumber } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO resources (cid, object, amount, person, phperson, dedate) VALUES (?, ?, ?, ?, ?, ?)",
      [campName, commodity, donatingQuantity, donatingPersonName, phoneNumber, deliveryDate]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false });
  }
});

// List of Resources in Each Camp
app.get("/list-resources", async (req, res) => {
  try {
    
    const commodities = [
      "Rice", "Wheat", "Dal", "Cabbage", "Carrot", "Potato", "Onion", "Tomato",
      "Milk", "Eggs", "Bread", "Water Bottles", "Blankets", "Clothes", "Soap",
      "Sanitary Pads", "Toothpaste"
    ];

    const [campsData] = await db.query(`SELECT rnumber, rname FROM reliefcamp ORDER BY rnumber ASC`);
    const camps = campsData.map(c => c.rname);

    const [rows] = await db.query(`
      SELECT r.object, r.amount, c.rname AS camp
      FROM resources r
      INNER JOIN reliefcamp c ON r.cid = c.rnumber
      ORDER BY c.rnumber ASC
    `);

    const stockMap = {};
    rows.forEach(row => {
      if (!stockMap[row.object]) stockMap[row.object] = {};
      stockMap[row.object][row.camp] = row.amount;
    });

    const resources = commodities.map(item => {
      const stock = camps.map(camp => stockMap[item]?.[camp] || 0);
      return { item, stock };
    });

    res.json({ camps, resources });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

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
    const { name, dob, mailId, phoneNumber, houseName, location, panchayathName, district, state, password } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO public (username, userdob, usermail, userph, userhouse, userlocation, userpanchayath, userdistrict, userstate, userpass) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, dob, mailId, phoneNumber, houseName, location, panchayathName, district, state, password]
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
            `SELECT * FROM public WHERE LOWER(${label}) LIKE LOWER(?)`,
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


app.listen(5000, () => {
    console.log("Server running on port 5000");
});

# 🚨 Disaster Management App

A comprehensive, full-stack Disaster Management and Relief platform designed to coordinate emergency responses, volunteer deployment, donation distribution, and shelter/resource tracking during natural or man-made disasters.

---

## 🌟 Features

This application comprises a multi-role workspace catering to **Admins**, **Volunteers**, **Victims**, and the **General Public**:

- **Real-time Alerting**: Admin-managed broadcast system to notify the public of active warnings and safety precautions.
- **Disaster Reporting & Tracking**: Victims and observers can report disasters with detailed locations, GPS coordinates (latitude/longitude), and types of disaster.
- **Volunteer Coordination**: Easy volunteer registration, profile updates, and active task assignment.
- **Relief Camp Logistics**: Complete tracking of relief camps, occupant listings, and camp details.
- **Resource Inventory Management**: Real-time updates on crucial resources (food, water, medicine, equipment) at various camp locations.
- **Donation Processing**: Portal for managing incoming donations and tracking allocation.
- **Role-based Authentication**: Secure portals for Admins and Public users using bcrypt hashing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (v19)
- **Routing**: React Router DOM (v7)
- **Styling**: Responsive Vanilla CSS

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Database Connector**: MySQL2 (using promise-based connection pools)
- **Security**: bcrypt for secure password hashing & CORS configuration

### Database
- **Engine**: MySQL

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MySQL Server](https://www.mysql.com/)

---

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/disaster-management-app.git
cd disaster-management-app
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Database Schema Configuration
Create a database named `drcp` (or as configured in your environment) in MySQL and run the database initialization queries. Below is the schema structure used by the backend APIs:

```sql
CREATE DATABASE drcp;
USE drcp;

-- Admins Table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Public Users Table
CREATE TABLE public (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  userpass VARCHAR(255) NOT NULL,
  usermail VARCHAR(255) UNIQUE NOT NULL,
  userph VARCHAR(20) NOT NULL
);

-- Disaster Reports Table
CREATE TABLE disaster (
  did INT AUTO_INCREMENT PRIMARY KEY,
  ddate DATE NOT NULL,
  dlocation VARCHAR(255) NOT NULL,
  dlatitude DECIMAL(10, 8) NOT NULL,
  dlongtitude DECIMAL(11, 8) NOT NULL,
  dtype VARCHAR(100) NOT NULL,
  ddistrict VARCHAR(100) NOT NULL
);

-- Emergency Alerts Table
CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  date DATETIME NOT NULL
);

-- Add other tables (volunteers, victims, donations, camps, resources) as per app logic.
```

#### 4. Configure Environment Variables
Create a `.env` file in the root directory (you can use `.env.example` as a template):
```bash
cp .env.example .env
```
Open `.env` and fill in your local configurations:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=drcp
```

---

### Running the Application

#### Run the Backend Server
Start the Node/Express backend (runs on port 5000 by default):
```bash
node server.js
```

#### Run the Frontend Client
In a new terminal window, start the React development server:
```bash
npm start
```
The React frontend will start on [http://localhost:3000](http://localhost:3000).

---

## 📁 Directory Structure
```text
disaster-management-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React Components (UI & Logic)
│   │   ├── AdminLogin.jsx  # Admin login page
│   │   ├── Disaster.jsx    # Disaster reporting page
│   │   ├── Donate.jsx      # Donation interface
│   │   ├── Home.jsx        # Landing dashboard
│   │   └── ...             # Other system interfaces
│   ├── App.js              # Application entry and routing
│   ├── index.js            # React DOM mounting
│   └── index.css           # Global design stylesheet
├── server.js               # Node.js/Express API Server
├── .env.example            # Environment configuration template
├── .gitignore              # Files excluded from git
├── package.json            # Scripts & dependencies definition
└── README.md               # Project documentation
```

---

## 🛡️ Safety & Contribution
If you encounter bugs, security vulnerabilities, or have suggestions for improvements, feel free to open an issue or submit a pull request!

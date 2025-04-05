```markdown
# 🛠️ Student Maintenance Request System (Admin Dashboard)

A full-stack web application for administrators to manage and download student maintenance requests. This project features a React-based frontend and a Node.js + Express backend connected to a MySQL database.

---

## 🔧 Features

- 📋 View all maintenance requests in a tabular format.
- 📥 Download filtered requests as a CSV report (by Reg No, Type of Work, or Time Period).
- 🖼️ View proof file links submitted by students.
- 🎯 Clean and simple admin interface.

---

## 🧑‍💻 Tech Stack

### Frontend:
- React (Vite)
- TailwindCSS

### Backend:
- Node.js
- Express.js
- MySQL
- `json2csv` for generating CSVs

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/maintenance-dashboard.git
cd maintenance-dashboard
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=maintenance
```

Start the backend server:
```bash
node app.js
```

The backend runs at: `http://localhost:3000`

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at: `http://localhost:5173`

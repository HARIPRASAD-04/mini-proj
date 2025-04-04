import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "/src/pages/Login";
import AdminDashboard from "/src/pages/AdminDashboard";
import StudentDashboard from "/src/pages/StudentDashboard";
import SubmitRequest from "/src/pages/SubmitRequest";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default page is now Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/submit-request" element={<SubmitRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
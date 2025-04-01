import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome, Student!</h1>

      <button
        onClick={() => navigate("/submit-request")}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Submit New Request
      </button>
    </div>
  );
}

export default StudentDashboard;

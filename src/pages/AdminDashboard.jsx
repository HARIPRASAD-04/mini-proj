import { useState } from "react";

function AdminDashboard() {
  const [requests, setRequests] = useState([
    {
      regNo: "22BCE1234",
      name: "John Doe",
      block: "A",
      roomNo: "101",
      typeOfWork: "Electrical",
      suggestionType: "Requisition",
      comments: "Light not working",
      proof: "proof.jpg",
    },
    {
      regNo: "22BCE5678",
      name: "Jane Smith",
      block: "B",
      roomNo: "202",
      typeOfWork: "Plumbing",
      suggestionType: "Improvement",
      comments: "Leaking tap",
      proof: "proof2.jpg",
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Request Table */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">All Requests</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Reg No</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Block</th>
              <th className="border p-2">Room No</th>
              <th className="border p-2">Type of Work</th>
              <th className="border p-2">Suggestion Type</th>
              <th className="border p-2">Comments</th>
              <th className="border p-2">Proof</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{req.regNo}</td>
                <td className="border p-2">{req.name}</td>
                <td className="border p-2">{req.block}</td>
                <td className="border p-2">{req.roomNo}</td>
                <td className="border p-2">{req.typeOfWork}</td>
                <td className="border p-2">{req.suggestionType}</td>
                <td className="border p-2">{req.comments}</td>
                <td className="border p-2">
                  <a href={`/${req.proof}`} className="text-blue-500 hover:underline">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Reports Section */}
      <div className="mt-6 flex justify-center relative">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Generate Reports ▼
        </button>

        {showDropdown && (
          <div className="absolute top-16 bg-white shadow-md rounded-md p-4 w-64">
            <ul className="space-y-2">
              <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Student-wise (Excel/PDF)</li>
              <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Monthly (Excel/PDF)</li>
              <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Weekly (Excel/PDF)</li>
              <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">Type of Work (Excel/PDF)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

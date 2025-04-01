import { useState } from "react";

function MyRequests() {
  // Dummy data for now (will connect to backend later)
  const [requests, setRequests] = useState([
    { id: 1, type: "Electrical", status: "Pending", date: "2024-03-25", comments: "Light not working" },
    { id: 2, type: "Plumbing", status: "Completed", date: "2024-03-20", comments: "Leaking tap" },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Requests</h1>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2 border">Request Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Comments</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req.id} className="text-center bg-gray-100 border">
                  <td className="p-2 border">{req.type}</td>
                  <td className={`p-2 border ${req.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                    {req.status}
                  </td>
                  <td className="p-2 border">{req.date}</td>
                  <td className="p-2 border">{req.comments}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyRequests;

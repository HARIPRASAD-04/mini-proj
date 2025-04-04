import { useEffect, useState } from "react";
import { fetchFilteredRequests, downloadCSVReport } from "../services/api";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    regNo: "",
    typeOfWork: "",
    period: "",
  });

  const { regNo, typeOfWork, period } = filters;

  // Fetch requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetchFilteredRequests({});
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };

    fetchRequests();
  }, []);

  // Handle CSV download
  const handleDownloadCSV = async () => {
    try {
      const response = await downloadCSVReport({
        reg_no: regNo,
        type_of_work: typeOfWork,
        period,
      });

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download failed", error);
    }
  };

  // Handle filter changes
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          className="border p-2 rounded w-48"
          placeholder="Filter by Reg No"
          value={regNo}
          onChange={(e) => updateFilter("regNo", e.target.value)}
        />
        <select
          className="border p-2 rounded w-48"
          value={typeOfWork}
          onChange={(e) => updateFilter("typeOfWork", e.target.value)}
        >
          <option value="">All Work Types</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Carpentry">Carpentry</option>
        </select>
        <select
          className="border p-2 rounded w-48"
          value={period}
          onChange={(e) => updateFilter("period", e.target.value)}
        >
          <option value="">All Time</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Requests</h2>
        {requests.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-center">
                {[
                  "Reg No",
                  "Name",
                  "Block",
                  "Room No",
                  "Type of Work",
                  "Suggestion Type",
                  "Comments",
                  "Proof",
                ].map((heading, idx) => (
                  <th key={idx} className="border p-2">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{req.reg_no}</td>
                  <td className="border p-2">{req.name}</td>
                  <td className="border p-2">{req.block}</td>
                  <td className="border p-2">{req.room_no}</td>
                  <td className="border p-2">{req.type_of_work}</td>
                  <td className="border p-2">{req.suggestion_type}</td>
                  <td className="border p-2">{req.comments}</td>
                  <td className="border p-2">
                    <a
                      href={`/${req.proof}`}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No requests found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

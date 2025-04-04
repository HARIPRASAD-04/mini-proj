import { useState } from "react";
import { submitRequest } from "../services/api"; // adjust path if needed

function SubmitRequest() {
  const [formData, setFormData] = useState({
    reg_no: "",
    name: "",
    block: "",
    room_no: "",
    type_of_work: "",
    suggestion_type: "",
    comments: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const res = await submitRequest(payload);
      alert(res.data.message || "Request submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting request.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Submit Maintenance Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="reg_no" placeholder="Registration No." value={formData.reg_no} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="room_no" placeholder="Room No." value={formData.room_no} onChange={handleChange} className="w-full p-2 border rounded" />

          <select name="type_of_work" value={formData.type_of_work} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Type of Work</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Internet">Internet</option>
            <option value="Laundry">Laundry</option>
            <option value="Other">Other</option>
          </select>

          <select name="suggestion_type" value={formData.suggestion_type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Suggestion Type</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Improvement">Improvement</option>
            <option value="Feedback">Feedback</option>
            <option value="Requisition">Requisition</option>
          </select>

          <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} className="w-full p-2 border rounded" />

          <input type="file" name="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitRequest;

import { useState } from "react";

function SubmitRequest() {
  const [formData, setFormData] = useState({
    regNo: "",
    name: "",
    block: "",
    roomNo: "",
    typeOfWork: "",
    suggestionType: "",
    comments: "",
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proof: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Backend connection will be added later)");
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Submit Maintenance Request</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="regNo" placeholder="Registration No." value={formData.regNo} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="roomNo" placeholder="Room No." value={formData.roomNo} onChange={handleChange} className="w-full p-2 border rounded" />

          <select name="typeOfWork" value={formData.typeOfWork} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Type of Work</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Internet">Internet</option>
            <option value="Laundry">Laundry</option>
            <option value="Other">Other</option>
          </select>

          <select name="suggestionType" value={formData.suggestionType} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Suggestion Type</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Improvement">Improvement</option>
            <option value="Feedback">Feedback</option>
            <option value="Requisition">Requisition</option>
          </select>

          <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} className="w-full p-2 border rounded"></textarea>

          <input type="file" name="proof" onChange={handleFileChange} className="w-full p-2 border rounded" />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitRequest;

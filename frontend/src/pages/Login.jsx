import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter, FaInstagram, FaBolt, FaBroom, FaWrench, FaWifi } from "react-icons/fa";
import { sendOtp, verifyOtp } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    try {
      await sendOtp(email);
      setError("");
      setShowOtpInput(true);
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    try {
      const res = await verifyOtp(email, otp);

      // Save user data in localStorage
      localStorage.setItem("reg_no", res.data.reg_no);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("role", res.data.role);

      const role = res.data.role;
      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/student-dashboard");
    } catch (err) {
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">VIT HOSTEL MAINTENANCE</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
        <div className="flex flex-col items-center">
          <FaBolt className="text-5xl mb-2" />
          <p>Electrical</p>
        </div>
        <div className="flex flex-col items-center">
          <FaBroom className="text-5xl mb-2" />
          <p>Cleaning</p>
        </div>
        <div className="flex flex-col items-center">
          <FaWrench className="text-5xl mb-2" />
          <p>Plumbing</p>
        </div>
        <div className="flex flex-col items-center">
          <FaWifi className="text-5xl mb-2" />
          <p>Internet</p>
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {showOtpInput && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
        )}

        {!showOtpInput ? (
          <button onClick={handleSendOtp} className="w-full bg-blue-500 text-white p-2 rounded">
            Send OTP
          </button>
        ) : (
          <button onClick={handleVerifyOtp} className="w-full bg-green-500 text-white p-2 rounded">
            Verify OTP
          </button>
        )}
      </div>

      <footer className="absolute bottom-4 flex space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-3xl hover:text-gray-300 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-3xl hover:text-gray-300 transition" />
        </a>
      </footer>
    </div>
  );
}

export default Login;

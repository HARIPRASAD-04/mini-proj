const db = require('../config/db');
const nodemailer = require('nodemailer');

// Hardcode SMTP details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sriraamcrilley918@gmail.com',
    pass: 'zbwnodxfkkmnqbap'   // Your app password from Google
  }
});

exports.login = (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date(Date.now() + 10 * 60000); // valid 10 mins

    db.query('UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?', [otp, expiry, email], (err) => {
      if (err) return res.status(500).json({ message: 'DB Error on OTP save' });

      const mailOptions = {
        from: 'sriraamcrilley918@gmail.com',
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).json({ message: 'Failed to send OTP', error: err });
        return res.json({ message: 'OTP sent to email' });
      });
    });
  });
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  db.query('SELECT reg_no, name, role, otp, otp_expiry FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    console.log('User fetched:', user);

    if (otp != user.otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (new Date() > user.otp_expiry) return res.status(400).json({ message: 'OTP expired' });

    // Confirm what fields exist
    const response = {
      message: 'OTP verified successfully',
      reg_no: user.reg_no || null,
      name: user.name || null,
      role: user.role || null
    };

    console.log('Response being sent:', response);
    return res.json(response);
  });
};

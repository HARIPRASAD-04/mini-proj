const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // make sure you have a db.js exporting mysql connection

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Test route (optional)
router.get('/test', (req, res) => {
  res.send('Request routes working!');
});

// Submit request route - store to MySQL
router.post('/submit', upload.single('file'), (req, res) => {
    try {
        const { reg_no, name, block, room_no, type_of_work, suggestion_type, comments } = req.body;
        const file = req.file;
        const proof_file_path = file ? file.path : null;

        const query = `
            INSERT INTO requests 
            (reg_no, name, block, room_no, type_of_work, suggestion_type, comments, proof_file_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [reg_no, name, block, room_no, type_of_work, suggestion_type, comments, proof_file_path];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: "Database error" });
            }
            res.status(200).json({ message: "Request submitted and saved in database successfully" });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

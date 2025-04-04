const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

// Helper function to build dynamic SQL query
function buildQuery(filters) {
    let baseQuery = 'SELECT * FROM requests WHERE 1=1';
    const values = [];

    if (filters.reg_no) {
        baseQuery += ' AND reg_no = ?';
        values.push(filters.reg_no);
    }

    if (filters.type_of_work) {
        baseQuery += ' AND type_of_work = ?';
        values.push(filters.type_of_work);
    }

    if (filters.period === 'weekly') {
        baseQuery += ' AND YEARWEEK(created_at) = YEARWEEK(NOW())';
    } else if (filters.period === 'monthly') {
        baseQuery += ' AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())';
    }

    return { baseQuery, values };
}

// GET API to fetch filtered results in JSON
// GET API to fetch all requests (no filters)
router.get('/fetch', (req, res) => {
    const query = 'SELECT * FROM requests ORDER BY created_at DESC';

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error', error: err });
        res.json(results);
    });
});


// API to download report as CSV
router.get('/download-csv', (req, res) => {
    const { reg_no, type_of_work, period } = req.query;
    const { baseQuery, values } = buildQuery({ reg_no, type_of_work, period });

    db.query(baseQuery, values, (err, results) => {
        if (err) return res.status(500).json({ message: 'DB error', error: err });

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(results);

        const fileName = `report-${Date.now()}.csv`;
        const filePath = path.join(__dirname, '../downloads', fileName);

        fs.writeFile(filePath, csv, (err) => {
            if (err) return res.status(500).json({ message: 'File write error' });

            res.download(filePath, fileName, () => {
                fs.unlinkSync(filePath); // Delete the file after download
            });
        });
    });
});

module.exports = router;

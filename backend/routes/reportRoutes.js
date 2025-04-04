const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

function buildQuery({ reg_no, type_of_work, period }) {
  let query = 'SELECT * FROM requests WHERE 1=1';
  const values = [];

  if (reg_no) {
    query += ' AND reg_no = ?';
    values.push(reg_no);
  }

  if (type_of_work) {
    query += ' AND type_of_work = ?';
    values.push(type_of_work);
  }

  if (period === 'weekly') {
    query += ' AND YEARWEEK(created_at) = YEARWEEK(NOW())';
  } else if (period === 'monthly') {
    query += ' AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())';
  }

  return { query, values };
}

router.get('/fetch', (req, res) => {
  const query = 'SELECT * FROM requests ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

router.get('/download-csv', (req, res) => {
  const { query, values } = buildQuery(req.query);

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: 'No data to export' });
    }

    try {
      const fields = Object.keys(results[0]);
      const parser = new Parser({ fields });
      const csv = parser.parse(results);

      const fileName = `report-${Date.now()}.csv`;
      const downloadDir = path.join(__dirname, '../downloads');

      // 💡 Ensure 'downloads' folder exists
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
      }

      const filePath = path.join(downloadDir, fileName);

      fs.writeFile(filePath, csv, (err) => {
        if (err) return res.status(500).json({ message: 'File write failed', error: err });

        res.download(filePath, fileName, (downloadErr) => {
          if (downloadErr) {
            console.error('Download error:', downloadErr);
          }
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error('Failed to delete temp file:', unlinkErr);
          });
        });
      });
    } catch (err) {
      console.error('CSV generation error:', err);
      res.status(500).json({ message: 'CSV generation failed', error: err });
    }
  });
});

module.exports = router;

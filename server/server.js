const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// �̵����
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // ����Ʈ���� ����

// DB ����
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// ����� �ҷ�����
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// ���� ����
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
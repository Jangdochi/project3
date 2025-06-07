const db = require('../models/userModel.js'); // pool ����� db
const { findUser } = require('../models/userModel');

const login = async (req, res) => {
    const { userId, userPwd } = req.body;
    const user = await findUser(userId, userPwd);

    if (user) {
        // role�� name ��ȸ
        let nameQuery = '';
        if (user.role === 'student') {
            nameQuery = 'SELECT name FROM student WHERE id = ?';
        } else if (user.role === 'professor') {
            nameQuery = 'SELECT name FROM professor WHERE id = ?';
        } else if (user.role === 'staff') {
            nameQuery = 'SELECT name FROM staff WHERE id = ?';
        }

        let name = '';
        if (nameQuery) {
            const [rows] = await db.execute(nameQuery, [user.id]);
            if (rows.length > 0) {
                name = rows[0].name;
            }
        }

        res.json({ success: true, role: user.role, username: name });
    } else {
        res.json({ success: false, message: '���̵� �Ǵ� ��й�ȣ�� Ʋ�Ƚ��ϴ�.' });
    }
};

module.exports = { login };
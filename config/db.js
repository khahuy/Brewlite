const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Đã kết nối thành công tới MongoDB Atlas (brewlite-cluster)!');
    } catch (error) {
        console.error('Lỗi kết nối database:', error.message);
        process.exit(1); // Dừng app nếu không kết nối được db
    }
};

module.exports = connectDB;

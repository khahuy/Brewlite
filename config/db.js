const dns = require('dns');
const mongoose = require('mongoose');
require('dotenv').config();

// Một số mạng/router chặn hoặc lỗi SRV lookup của Node → dùng DNS công cộng
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('Đã kết nối thành công tới MongoDB Atlas (brewlite-cluster)!');
    } catch (error) {
        console.error('Lỗi kết nối database:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

require('dotenv').config();

const StringCon = {
    connection: `mongodb://${process.env.MONG_USER}:${process.env.MONG_PASS}@cluster0.vqmbgrc.mongodb.net/`
};

module.exports = StringCon;
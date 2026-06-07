const User = require("../models/User");

const registerUser = async (req, res) => {
    res.json({
        msg: "Register route working",
    });
};

module.exports = {
    registerUser,
}
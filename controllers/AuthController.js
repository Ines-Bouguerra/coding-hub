const User = require("../models/User");

// controller actions
module.exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).send('error, user not created');
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;  // destructure req.body

    console.log(email, password);
    res.send('user login');
}
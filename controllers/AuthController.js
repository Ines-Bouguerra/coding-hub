const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }
    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}
module.exports.register = async (req, res) => {
    const { email, password } = req.body;  // destructure req.body
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json(user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;  // destructure req.body
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
    console.log(email, password);
    res.send('user login');
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    requestHandler.sendSuccess(res, 'User Logged Out Successfully')();
}
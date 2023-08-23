const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../midddleware/fetchuser");

const JWT_SECRET = 'testApp';


router.post('/createuser', async (req, res) => {
    let success = false;
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exist' });
    }


    const salt = bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);


    const newUser = new User({
        name: name,
        email: email,
        password: secPass,
    });


    const data = {
        user: {
            id: newUser.id,
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);


    await newUser.save();

    success = true;
    res.json({success, authToken});
})


router.post('/login', async (req, res) => {
    let success = false;
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "Please check your id or password" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(400).json({ error: "Please check your id or password" })
    }

    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });

})


router.post('/getuser', fetchuser, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);

});

module.exports = router

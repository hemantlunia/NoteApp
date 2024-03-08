const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = 'Hemantkumar@#$@boy';

// ROUTE 1. create a user using :POST "/api/auth/createuser".no login required
router.post('/createuser', [
    body('name', 'enter a valid name ').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: 'sorry a user with this email already exists' })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email 
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        success=true
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.message)
        // res.status(500).send("some error occured")
        res.status(500).json({success,error:"some error"})
    }
})

// ROUTE 2. Authenticate a user using : POST "/api/auth/login" . 
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can not be blanked').exists()
], async (req, res) => {
    let success = false
    //if there is error then return request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if(!user){
            success=false
            return res.status(400).json({success , error:"Please try to login with correct information"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false
            return res.status(400).json({success , error:"Please try to login with correct information"});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success , authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server :- some error")
    }
})

// ROUTE 3 :- GET LOGGEDIN USER DETAILS POST "/api/auth/getuser" login required

router.post('/getuser',fetchuser, async (req, res) => {
try {
    // userId = req.user.id;

    const user = await User.findById(req.user.id).select("-password");
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server :- some error")
    
}
})

module.exports = router


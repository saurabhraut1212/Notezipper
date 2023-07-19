import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { name, email, password, pic } = req.body;
    let user;
    try {
        user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User with that email id is already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newuser = await User.create({
            name,
            email,
            password: hashedPassword,
            pic
        })
        await newuser.save();
        if (!newuser) {
            res.status(400).json({ message: "User does not created" })
        }
        res.status(200).json({ message: "User created succesfully", user: newuser })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist with that email id" });
        }

        let isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ error });
    }
};



export const updateUserProfile = async (req, res) => {
    const id = req.user._id;
    const { name, email, pic, password } = req.body;

    try {
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (email) updatedFields.email = email;
        if (pic) updatedFields.pic = pic;
        if (password) updatedFields.password = password;

        const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        if (user) {
            let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ user, token });
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

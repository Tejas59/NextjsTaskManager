import bcrypt from "bcrypt";
import { UserModel } from "@/models/userModel";
import jwt from "jsonwebtoken";

export async function userRegistrationController(data: { name: string, email: string, password: string }) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        return { success: false, message: "Invalid data" };
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return { success: false, message: "User already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });

    return { success: true, token };
}

export async function userLoginController(data: { email: string, password: string }) {
    const { email, password } = data;

    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        return { success: false, message: "User does not exist" };
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
        return { success: false, message: "Incorrect password" };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });

    return {
        success: true,
        token,
        user: { id: user._id, email: user.email, name: user.name },
    };
}

export async function userLogoutController() {
    return { success: true, message: "Logged out" };
}

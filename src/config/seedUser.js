import argon2 from "argon2";
import { User } from "../models/index.js";

export async function seedUser() {

    const email = "admin@lectio.app";
    const password = "admin123";

    const existingUser = await User.findOne({
        where: { mail: email }
    });

    if (existingUser) {
        console.log("✔ Admin user already exists");
        return;
    }

    const hashedPassword = await argon2.hash(password);

    await User.create({
        name: "Admin",
        mail: email,
        password: hashedPassword
    });

    console.log("✔ Admin user created");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
}
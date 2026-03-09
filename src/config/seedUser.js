import argon2 from "argon2";
import { User } from "../models/index.js";

export async function seedUser() {

    const email = "test@test.com";

    const existingUser = await User.findOne({
        where: { mail: email }
    });

    if (existingUser) {
        console.log("✔ Test user already exists");
        return;
    }

    const hashedPassword = await argon2.hash("123456");

    await User.create({
        name: "TestUser",
        mail: email,
        password: hashedPassword
    });

    console.log("✔ Test user created");
}
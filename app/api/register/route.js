import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Define a MongoDB schema for your user collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create a mongoose model for the user collection
const User = mongoose.model("User", userSchema);

// Connect to your MongoDB database
mongoose.connect("mongodb+srv://nextjs-shop:nextjs-shop@cluster7.qalte53.mongodb.net/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  // Hash the provided password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    // Create a new user document and save it to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Return a JSON response with the created user data
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    // Return an error response
    return NextResponse.error();
  }
}

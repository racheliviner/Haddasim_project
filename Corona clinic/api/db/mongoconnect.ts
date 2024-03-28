import mongoose from "mongoose";;
import {config} from "../config/secret";

async function main() {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(
      `mongodb+srv://${config.userDb}:${config.passDb}@corona.opbikgm.mongodb.net/`
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main();

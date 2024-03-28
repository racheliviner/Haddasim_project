import dotenv from "dotenv";

dotenv.config();

export const config = {
  userDb: process.env.USER_DB,
  passDb: process.env.PASS_DB,
};

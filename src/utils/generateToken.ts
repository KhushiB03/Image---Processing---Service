import jwt from "jsonwebtoken";

const generateToken = (username: string) => {
  return jwt.sign(
    { username }, //payload
    process.env.JWT_SECRET as string, //secret key
    { expiresIn: "7d" }, //oprions
  );
};
export default generateToken;

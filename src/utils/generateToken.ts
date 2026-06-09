import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  return jwt.sign(
    { userId }, //payload
    process.env.JWT_SECRET as string, //secret key
    { expiresIn: "7d" }, //oprions
  );
};
export default generateToken;

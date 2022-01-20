import env from "dotenv";
env.config();

const config = {
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === "production" ? true : false,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  mongoUri: process.env.MONGO_URI
};

export default config;

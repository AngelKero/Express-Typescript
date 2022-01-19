import env from "dotenv";
env.config();

const config = {
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === "production" ? true : false
};

export default config;

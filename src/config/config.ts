import env from "dotenv";
env.config();

const config = {
  apiUrl: process.env.API_URL,
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === "production" ? true : false,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  recoverySecret: process.env.RECOVERY_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  mongoUri: process.env.MONGO_URI,
  smtpConfig: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

export default config;

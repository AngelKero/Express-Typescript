import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import { Options } from "nodemailer/lib/mailer";
import { google } from 'googleapis';
import config from "./../config/config";
import { OAuth2Client } from "google-auth-library";
import { GetAccessTokenResponse } from "google-auth-library/build/src/auth/oauth2client";

class MailerService {
  OAuth2: typeof OAuth2Client;
  oauth2Client: OAuth2Client;
  accessToken: Promise<GetAccessTokenResponse>;
  baseUrl: string;
  transporter: Transporter<SentMessageInfo>

  constructor() {
    this.baseUrl = config.baseUrl;
    this.OAuth2 = google.auth.OAuth2;
    this.oauth2Client = new this.OAuth2(
      config.googleApi.clientID,
      config.googleApi.clientSecret,
    );
    this.oauth2Client.setCredentials({
      refresh_token: config.googleApi.refreshToken
    });
    this.accessToken = this.oauth2Client.getAccessToken();
    this.setTransporter();
  }

  setTransporter() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.smtpConfig.user,
        clientId: config.googleApi.clientID,
        clientSecret: config.googleApi.clientSecret,
        refreshToken: config.googleApi.refreshToken
      }
    });
  }

  async sendMail(infoMail: Options) {
    const info = await this.transporter.sendMail(infoMail);
    return info;
  }
}

export default MailerService;

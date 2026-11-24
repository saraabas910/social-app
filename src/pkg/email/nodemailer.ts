
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

interface INodemailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
}

export class NodemailerProvider {
private client: Transporter;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(config: INodemailConfig) {
    this.client = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  async send(email: string, subject: string, html: string) {
    await this.client.sendMail({
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to: email,
      subject: subject,
      html: html,
    });
  }
}

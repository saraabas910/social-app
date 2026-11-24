
import { Client } from 'node-mailjet';

export interface IMailjetConfig {
  apiKey: string;
  apiSecret: string;
  fromEmail: string;
  fromName: string;
}

export class MailjetProvider {
  private client: Client;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(config: IMailjetConfig) {
    this.client = new Client({
      apiKey: config.apiKey,
      apiSecret: config.apiSecret,
    });

    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  async sendEmail(
    email: string,
    subject: string,
    html: string
  ) {
    try {
      const result = await this.client
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: this.fromEmail,
                Name: this.fromName,
              },
              To: [
                {
                  Email: email,
                },
              ],
              Subject: subject,
              HTMLPart: html,
            },
          ],
        });

      console.log('Email sent successfully:', result.body);

      return result.body;

    } catch (error: unknown) {
      console.error('Mailjet sending failed:', error);

      throw new Error('Failed to send verification email');
    }
  }
}

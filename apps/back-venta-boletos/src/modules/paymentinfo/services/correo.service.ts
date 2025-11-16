import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CorreoService {
  private transporter: nodemailer.transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
    });
  }

  async sendEmails(subject: string, plantilla: string, contexto: any, to: string) {
    
    const projectRoot = process.cwd();
    const templatePath = path.join(projectRoot, `apps/back-venta-boletos/src/modules/paymentinfo/templates/${plantilla}.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    const template = handlebars.compile(templateContent);
    const html = template(contexto);

    const mailOptions = {
      to,
      subject,
      html: html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
import 'dotenv/config';
import fs from "fs";
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.API_KEY,
});

async function sendEmail(email, fileName, filePath) {
    const sentFrom = new Sender(process.env.EMAIL_SENDER, "Article Kindle Converter");

    const recipients = [
        new Recipient(email, email.split('@')[0])
    ];

    const attachments = [
        new Attachment(
            fs.readFileSync(filePath, { encoding: 'base64' }),
            `${fileName}.epub`,
            'attachment'
        )
    ]

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setAttachments(attachments)
        .setSubject("convert")
        .setText("There is your converted article in epub format - I hope you enjoy it! by Jean");

    console.log(`Sending email to ${email} with attachment ${fileName}`)
    await mailerSend.email.send(emailParams);
}

export default sendEmail;
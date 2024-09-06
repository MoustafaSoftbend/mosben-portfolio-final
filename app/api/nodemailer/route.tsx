// pages/api/sendMail.ts

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
    const { to, subject, text, html } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });

    try {
      // Send mail with defined transport object
      await transporter.sendMail({
        from: process.env.SMTP_FROM, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });

      transporter.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      transporter.status(500).json({ message: "Failed to send email" });
    }

}
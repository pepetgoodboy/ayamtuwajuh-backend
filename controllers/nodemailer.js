import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Send Email Verification
const sendEmailVerification = async (email, token) => {
  const frontendUrl = `https://ayam-tuwajuh.vercel.app/verify-account/${token}`;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verifikasi Email",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><div style="max-width: 600px; margin: 0 auto; padding: 20px; ">
      <div style="background-color: #ff6600; padding: 20px; text-align: center;">
        <h3 style="color: white; font-size: 24px; font-weight: bold;">Ayam Tuwajuh.</h3>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h4>Hallo,</h4>
        <p>Terima kasih telah melakukan registrasi di Ayam Tuwajuh.</p>
        <p>Silahkan klik link berikut untuk melakukan verifikasi email:</p>
        <a style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: white; font-weight: bold; text-decoration: none; margin-top: 20px; border-radius: 4px;" href=${frontendUrl}>Verifikasi Email</a>
        <p style="margin-top: 20px;">Dengan Hormat,<br />Team Ayam Tuwajuh.</p>
      </div>
    </div>
    </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

const sendResetPassword = async (email, id) => {
  const frontendUrl = `https://ayam-tuwajuh.vercel.app/reset-password/${id}`;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><div style="max-width: 600px; margin: 0 auto; padding: 20px; ">
      <div style="background-color: #ff6600; padding: 20px; text-align: center;">
        <h3 style="color: white; font-size: 24px; font-weight: bold;">Ayam Tuwajuh.</h3>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h4>Hallo,</h4>
        <p>Terima kasih telah menggunakan website Ayam Tuwajuh.</p>
        <p>Silahkan klik link berikut untuk melakukan reset password:</p>
        <a style="display: inline-block; padding: 10px 20px; background-color: #ff6600; color: white; font-weight: bold; text-decoration: none; margin-top: 20px; border-radius: 4px;" href=${frontendUrl}>Reset Password</a>
        <p style="margin-top: 20px;">Dengan Hormat,<br />Team Ayam Tuwajuh.</p>
      </div>
    </div>
    </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export { sendEmailVerification, sendResetPassword };

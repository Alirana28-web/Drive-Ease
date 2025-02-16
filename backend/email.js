const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,  
  },
});

const sendConfirmationEmail = async (to, renterName, car, totalRent, totalHours) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Car Rental Confirmation",
    html: `
      <h2>Rental Confirmation</h2>
      <p>Dear ${renterName},</p>
      <p>Your rental request for <b>${car.name}</b> has been confirmed.</p>
      <p><b>Details:</b></p>
      <ul>
        <li>Hourly Price: Rs ${car.hourlyPrice}</li>
        <li>Total Hours: ${totalHours}</li>
        <li>Total Rent: Rs ${totalRent}</li>
      </ul>
      <p>Thank you for choosing our service.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendConfirmationEmail;

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export function sendBookingConfirmation(to, booking) {
  const { startAt, endAt, totalPrice } = booking;
  let start = new Date(startAt).toISOString().slice(0, 10);
  let end = new Date(endAt).toISOString().slice(0, 10);

  let id = booking._id;

  const mailDetails = {
    from: process.env.NODEMAILER_EMAIL,
    to: to,
    subject: "Booking Confirmation",
    html: `<p>Hi,<br><br> Your booking has been confirmed. <br> You have booked a room from ${start} to ${end} for Rs${totalPrice} and your booking ID is ${id}.<br><br>For more info please visit my bookings section on our website.</p>`,
  };

  sendMail(mailDetails);
}

export function sendDisputeSubmission( dispute) {
   const {email, subject}= dispute;
    const disputeMailDetails = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Dispute Submitted Successfully",
    html: `<p>Hi,<br><br> Your dispute with the subject "${subject}" has been submitted. <br> We will get back to you soon. <br><br>For more info please visit my bookings section on our website.</p>`,
  };

  sendMail(disputeMailDetails);
}


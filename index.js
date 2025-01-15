import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

const getHtmlContent = (
    address, agreeResponsibilities, agreeTerms, blockchainExperience, confirmInformation, createdAt, dob, email, firstName, lastName, nationality, paymentMethod, professionalBackground, technicalSkills, walletAddress, hash, price, tokenURI
) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #4caf50; text-align: center;">Thank You for Becoming a Validator!</h2>
        <p style="font-size: 16px; color: #333;">
          Dear ${firstName} ${lastName},<br><br>
          Thank you for registering as a validator. We appreciate your trust in us. Below are the details you provided:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date of Birth:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${dob}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nationality:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${nationality}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Address:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${address}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Wallet Address:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${walletAddress}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Payment Method:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${paymentMethod}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Blockchain Experience:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${blockchainExperience}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Professional Background:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${professionalBackground}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Technical Skills:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${technicalSkills}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Agree to Responsibilities:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${agreeResponsibilities ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Agree to Terms:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${agreeTerms ? 'Yes' : 'No'}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Confirm Information:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${confirmInformation ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Registration Date:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date(createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">price:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${(price)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">you bought:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${(tokenURI)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Transaction hash:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${(hash)}</td>      
            </tr>
          </tbody>
        </table>
        <p style="font-size: 14px; color: #555; margin-top: 20px;">
          If you have any questions, feel free to contact our support team.
        </p>
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
          This is an automated email. Please do not reply directly to this message.
        </p>
      </div>
    `;
};


// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        const { address, agreeResponsibilities, agreeTerms, blockchainExperience, confirmInformation, createdAt, dob, email, firstName, lastName, nationality, paymentMethod, professionalBackground, technicalSkills, walletAddress, hash, price, tokenURI, } = req.body;
        const subject = "NO REPLY VALIQUE"
        // Validate inputs
        if (!email || !subject) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const html = getHtmlContent(address, agreeResponsibilities, agreeTerms, blockchainExperience, confirmInformation, createdAt, dob, email, firstName, lastName, nationality, paymentMethod, professionalBackground, technicalSkills, walletAddress, hash, price, tokenURI)

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            html
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
        console.log("Message sent successfully")
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            message: 'Failed to send email',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
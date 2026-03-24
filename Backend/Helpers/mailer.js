import nodemailer from "nodemailer";

const sendEmail = async (email, subject, content) => {
    try {
        // 🔹 Step 1: Create Test Account (Ethereal)
        const testAccount = await nodemailer.createTestAccount();

        // 🔹 Step 2: Create Transporter
        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        // 🔹 Step 3: Mail Options
        const mailOptions = {
            from: `"Test App" <${testAccount.user}>`,
            to: email,
            subject: subject,
            html: content
        };

        // 🔹 Step 4: Send Email
        const info = await transporter.sendMail(mailOptions);

        console.log(content);

        // 🔹 Step 5: Preview URL (Very Important for Ethereal)
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log("❌ Error sending email:", error);
    }
};

export default sendEmail;

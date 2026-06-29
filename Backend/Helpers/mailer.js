import { Resend } from 'resend';
const sendEmail = (email, subject, content) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: `${email}`,
        subject: `${subject}`,
        html: `${content}`
    });
}
export default sendEmail;

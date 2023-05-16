const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        //host: process.env.SMTP_HOST,
        //port: process.env.SMTP_PORT,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const message = {
        from: `${process.env.EMAIL} `,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // const message = {
    //     from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    //     to: options.email,
    //     subject: options.subject,
    //     text: options.message
    // }

    await transporter.sendMail(message,(err,info)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(info.response);
        }
    })
}

module.exports = sendEmail;
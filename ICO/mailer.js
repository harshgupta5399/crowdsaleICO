const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service : "Mailgun",
    auth : {
        user : "postmaster@sandbox6b554997200b40a0b780944b38624795.mailgun.org",
        pass : "f9a4926f0cca1755686819c8a594979e-acb0b40c-176d92ae"
    },
    tls : {
        rejectUnauthorized : false
    }
});

module.exports = {
    sendEmail(from, to, subject, html){
    return new Promise((resolve, reject) => {
        transporter.sendMail({from, to, subject, html}, (err, info) => {
            if(err) reject(err);
            resolve(info);        
        });
    });
}
}
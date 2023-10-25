import nodemailer, { SendMailOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'skygana@gmail.com',
    pass: 'rbye eslm ojdb jopi',
  }
});

const message: SendMailOptions = {
  from: 'skygana@gmail.com',
  to: 'skygana@gmail.com',
  subject: 'Nodemailer 테스트',
  text: '노드메일러 테스트입니다.',
};

transporter.sendMail(message).then((e) => {
  console.log('complete');
});
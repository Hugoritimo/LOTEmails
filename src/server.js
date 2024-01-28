const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(express.static('src'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/send-emails', upload.single('csvFile'), async (req, res) => {
  try {
    // Extrair e-mails do arquivo CSV
    const csvData = req.file.buffer.toString();
    const emails = csvData.split('\n');

    // Configurar o transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vhugohss@gmail.com',
        pass: 'vick110113',
      },
    });

    // Enviar e-mails
    for (const email of emails) {
      if (email.trim() !== '') {
        const mailOptions = {
          from: 'hugoritimo@gmail.com',
          to: email.trim(),
          subject: 'Assunto do E-mail',
          text: 'Conteúdo do E-mail',
        };

        await transporter.sendMail(mailOptions);
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erro:', error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

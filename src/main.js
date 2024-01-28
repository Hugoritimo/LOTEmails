document.getElementById('sendEmailsButton').addEventListener('click', async () => {
  // Obter a lista de e-mails do usuário (poderia ser de um arquivo CSV, por exemplo)
  const emails = ['hugoritimo@gmail.com', 'vhugohss@gmail.com', 'pintihugo65@gmail.com'];

  // Enviar a lista de e-mails para o backend (Rust)
  await window.__TAURI__.invoke('send_emails', { emails });

  // Exemplo: Atualizar a interface do usuário
  document.getElementById('status').innerText = 'E-mails enviados com sucesso!';
});

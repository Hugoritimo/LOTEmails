// src-tauri/tauri.conf.js
module.exports = {
    build: {},
    ctx: {
    tauri: {
        embeddedServer: {
        active: true,
        port: 5000,
        },
        bundle: {
        identifier: "aplicativo-desktop-para-envio-de-arquivos",
        name: "envio-de-arquivos",
        version: "1.0.0",
        authors: ["Victor Hugo"],
        description: "Aplicativo de Envio de arquivos Desktop",
        },
      },
    },
  };
  
use std::collections::HashMap;
use tauri::{Manager, WindowBuilder, CustomMenuItem, Event, State, SystemTrayMenu};

#[tauri::command]
fn send_emails(app_handle: tauri::AppHandle, emails: Vec<String>) {
    // Implemente a lógica de envio de e-mails aqui
    // Esta é uma implementação de exemplo
    for email in emails {
        println!("Enviando e-mail para: {}", email);
        // Lógica de envio de e-mail aqui
    }

    // Exemplo: Atualizar a interface do usuário após o envio
    app_handle
        .emit_all(
            "updateStatus",
            Some(vec![serde_json::to_value("E-mails enviados com sucesso!").unwrap()]),
        )
        .unwrap();
}

fn main() {
    tauri::Builder::default()
        .on_page_load(|window, _| {
            // Criar uma nova janela
            let new_window = WindowBuilder::new()
                .title("Enviar E-mails em Lote")
                .inner_html(include_str!("index.html"))
                .build(&window);

            // Adicionar menu à bandeja do sistema
            window
                .system_tray(|tray| {
                    tray
                        .add_menu_item(
                            CustomMenuItem::new("Sair").on_click(|_app| {
                                std::process::exit(0);
                            }),
                        )
                        .add_menu_item(
                            CustomMenuItem::new("Enviar E-mails").on_click(|app| {
                                // Exemplo: Obter lista de e-mails do frontend
                                app.emit_to("mainWindow", "getEmails", None).unwrap();
                            }),
                        )
                })
                .build()
                .unwrap();
        })
        .invoke_handler(|_app, _webview, arg| {
            // Manipular comandos invocados pelo JavaScript aqui
            tauri::execute_promise(
                _app,
                _webview,
                arg,
                move |app, _, payload| {
                    // Manipular comandos invocados pelo JavaScript aqui
                    let arg_map: HashMap<String, Vec<String>> =
                        serde_json::from_str(&payload).unwrap();

                    if let Some(emails) = arg_map.get("emails") {
                        send_emails(app.handle(), emails.clone());
                    }

                    Ok(())
                },
            );

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

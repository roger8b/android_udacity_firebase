const functions = require('firebase-functions');

// Substitui palavras-chave por emoji na chave "text" de mensagens enviadas
// para /messages
exports.emojify =
    functions.database.ref('/messages/{pushId}/text')
        .onWrite((change,context) => {

            // Agora começaremos a transformação de emoji
            console.log("emojifying!");

            // Obtém o valor da chave 'text' da mensagem
            const originalText = change.after.val();
            const emojifiedText = emojifyText(originalText);
            // Retorna um Promise de JavaScript para atualizar o nó do banco de dados
            return change.after.ref.set(emojifiedText);
        });

// Retorna texto com palavras-chave substituídas por emoji
// substituindo com a expressão regular /.../ig faz uma busca
// case-insensitive (i flag) para todas as ocorrências (g flag) na string
function emojifyText(text) {
    var emojifiedText = text;
    emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
    emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
    return emojifiedText;
}
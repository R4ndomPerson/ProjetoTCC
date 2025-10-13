const contatosDiv = document.querySelector('.contatos');


function mostrarMensagensSalvas() {
    contatosDiv.innerHTML = '';
    let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
    mensagens.forEach(msg => {
        const novoContato = document.createElement('div');
        novoContato.className = 'testecontato';
        novoContato.innerHTML = `<strong>${msg.nome}:</strong> ${msg.mensagem}`;
        contatosDiv.appendChild(novoContato);
    });
}


mostrarMensagensSalvas();


window.addEventListener('storage', function(event) {
    if (event.key === 'mensagens') {
        mostrarMensagensSalvas();
    }
});

const btnDeletar = document.getElementById('btnDeletar');

btnDeletar.addEventListener('click', function() {
    // Remove do localStorage
    localStorage.removeItem('mensagens');
    // Remove do HTML
    contatosDiv.innerHTML = '';
});
const contatosDiv = document.querySelector('.contatos');
const btnNovaMensagem = document.getElementById('btnNovaMensagem');
const modalMensagem = document.getElementById('modalMensagem');
const btnEnviarMensagem = document.getElementById('btnEnviarMensagem');
const btnFecharModal = document.getElementById('btnFecharModal');
const inputNome = document.getElementById('nomeContato');
const inputTexto = document.getElementById('textoMensagem');



function adicionarContato(nome, mensagem) {
    const novoContato = document.createElement('div');
    novoContato.className = 'testecontato';
    novoContato.innerHTML = `<strong>${nome}:</strong> ${mensagem}`;
    contatosDiv.appendChild(novoContato);
}


btnNovaMensagem.addEventListener('click', function() {
    modalMensagem.style.display = 'block';
});


btnFecharModal.addEventListener('click', function() {
    modalMensagem.style.display = 'none';
    inputNome.value = '';
    inputTexto.value = '';
});


btnEnviarMensagem.addEventListener('click', function() {
    if (inputNome.value.trim() !== '' && inputTexto.value.trim() !== '') {

        const novo = {
            nome: inputNome.value,
            mensagem: inputTexto.value
        };

        let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
        mensagens.push(novo);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));

        adicionarContatoComMensagem(inputNome.value, inputTexto.value);

        modalMensagem.style.display = 'none';
        inputNome.value = '';
        inputTexto.value = '';
    }
});

window.addEventListener('storage', function(event) {
    if (event.key === 'mensagens') {

        contatosDiv.innerHTML = '';
       mostrarMensagensSalvas();
    }
});







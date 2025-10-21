// Exemplo sem filepath
async function pegarPerfil() {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch('http://localhost:3000/login.js', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.mensagem || `Erro ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        return { sucesso: false, mensagem: err.message };
    }
}

// Adicionado: captura de inputs e envio ao backend para verificar usuário
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('input[type="email"], input#email, input[name="email"]');
    const senhaInput = document.querySelector('input[type="password"], input#senha, input[name="senha"], input[name="password"]');
    const form = (emailInput && emailInput.closest('form')) || document.querySelector('form');
    const btn = document.querySelector('#btnEntrar, button[type="submit"], button.login, input[type="submit"]');

    const handleSubmit = async (ev) => {
        if (ev) ev.preventDefault();
        const email = emailInput?.value?.trim() || '';
        const senha = senhaInput?.value?.trim() || '';

        if (!email || !senha) {
            alert('Preencha email e senha.');
            return;
        }

        const resultado = await loginRequest(email, senha);
        if (resultado && resultado.token) {
            localStorage.setItem('token', resultado.token);
            alert('Login bem-sucedido.');
            // window.location.href = '/perfil.html'; // descomente/redirecione conforme necessário
        } else {
            const msg = resultado?.mensagem || resultado?.message || 'Usuário ou senha inválidos.';
            alert(msg);
        }
    };

    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else if (btn) {
        btn.addEventListener('click', handleSubmit);
    } else {
        console.warn('Nenhum form/btn/email/senha encontrado — verifique os seletores no HTML.');
    }
});

async function loginRequest(email, senha) {
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.mensagem || body.message || `Erro ${res.status}`);
        return body; // espera { token: '...', ... } ou { sucesso: true, ... }
    } catch (err) {
        return { sucesso: false, mensagem: err.message };
    }
}

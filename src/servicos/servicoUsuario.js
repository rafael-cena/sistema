const urlBase = 'https://backend-lp2.vercel.app/usuarios';

export async function gravarUsuario (usuario) {
    const resposta = await fetch(urlBase, {
        'method': "POST",
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario (usuario) {
    const resposta = await fetch(urlBase+"/"+usuario.id, {
        'method': "PATCH",
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function removerUsuario (usuario) {
    const resposta = await fetch(urlBase+"/"+usuario.id, {
        'method': "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario () {
    const resposta = await fetch(urlBase, { 
        'method': "GET",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function autLogin(login) {
    const resposta = await fetch(urlBase+"/verificarSenha", {
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(login)
    });
    const resultado = await resposta.json();    
    return resultado;
}
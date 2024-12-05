import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ESTADO from "./estados";
import { alterarUsuario, consultarUsuario, gravarUsuario, removerUsuario } from "../servicos/servicoUsuario.js";

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async () => {
    const resultado = await consultarUsuario();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso!",
                "listaDeUsuarios": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Usuarios do Backend!",
                "listaDeUsuarios": []
            }
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message,
            "listaDeUsuarios": []
        }
    }
});

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario) => {
    const resultado = await removerUsuario(usuario);
    try {
        if (resultado.status) {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "codigo": usuario.codigo
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem
            }
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const editarUsuario = createAsyncThunk('editarUsuario', async (usuario) => {
    const resultado = await alterarUsuario(usuario);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "usuario": usuario
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const registrarUsuario = createAsyncThunk('registrarUsuario', async (usuario) => {
    const resultado = await gravarUsuario(usuario);
    try {
        if (resultado.status) {
            usuario.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "usuario": usuario
            }
        }
        else
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }

    }
    catch (e) {
        return {
            "status": resultado.status,
            "mensagem": "Erro: " + e.message
        }
    }
})

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estadoU: ESTADO.OCIOSO,
        mensagemU: "",
        listaDeUsuarios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarUsuarios.pending, (state, action) => {
            state.estadoU = ESTADO.PENDENTE;
            state.mensagemU = "Processando requisição (buscando usuarios)"
        })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoU = ESTADO.OCIOSO;
                    state.mensagemU = action.payload?.mensagem;
                    state.listaDeUsuarios = action.payload?.listaDeUsuarios;
                }
                else {
                    state.estadoU = ESTADO.ERRO;
                    state.mensagemU = action.payload?.mensagem;
                    state.listaDeUsuarios = action.payload?.listaDeUsuarios
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estadoU = ESTADO.ERRO;
                state.mensagemU = action.payload?.mensagem;
                state.listaDeUsuarios = action.payload?.listaDeUsuarios;
            })
            .addCase(apagarUsuario.pending, (state, action) => {
                state.estadoU = ESTADO.PENDENTE;
                state.mensagemU = "Processando a requisição (excluindo usuario)";
            })
            .addCase(apagarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoU = ESTADO.OCIOSO;
                    state.listaDeUsuarios = state.listaDeUsuarios.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estadoU = ESTADO.ERRO;
                }
                state.mensagemU = action.payload?.mensagem;
            })
            .addCase(apagarUsuario.rejected, (state, action) => {
                state.estadoU = ESTADO.ERRO;
                state.mensagemU = action.payload?.mensagem;
            })
            .addCase(editarUsuario.pending, (state, action) => {
                state.estadoU = ESTADO.PENDENTE;
                state.mensagemU = "Processando a requisição (alterando usuario)";
            })
            .addCase(editarUsuario.fulfilled, (state, action) => {
                state.mensagemU = action.payload.mensagem;
                if (action.payload.status) {
                    state.estadoU = ESTADO.OCIOSO;
                    state.listaDeUsuarios.map((item) => item.codigo === action.payload.usuario.codigo ? action.payload.usuario : item);
                }
                else {
                    state.estadoU = ESTADO.ERRO;
                }
            })
            .addCase(editarUsuario.rejected, (state, action) => {
                state.estadoU = ESTADO.ERRO;
                state.mensagemU = action.payload?.mensagem;
            })
            .addCase(registrarUsuario.pending, (state, action) => {
                state.estadoU = ESTADO.PENDENTE;
                state.mensagemU = "Processando a requisição (cadastrando usuario)";
            })
            .addCase(registrarUsuario.fulfilled, (state, action) => {
                state.mensagemU = action.payload.mensagem;
                if (action.payload.status) {
                    state.estadoU = ESTADO.OCIOSO;
                    state.listaDeUsuarios.push(action.payload.usuario);
                }
                else {
                    state.estadoU = ESTADO.ERRO;
                }
            })
            .addCase(registrarUsuario.rejected, (state, action) => {
                state.estadoU = ESTADO.ERRO;
                state.mensagemU = action.payload?.mensagem;
            })
    }
});

export default usuarioReducer.reducer;
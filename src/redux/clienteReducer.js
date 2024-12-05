import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { gravarCliente, alterarCliente, removerCliente, consultarCliente } from "../servicos/servicoCliente";

export const buscarClientes = createAsyncThunk('buscarClientes', async () => {
    const resultado = await consultarCliente();
    try {
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Clientes recuperados com sucesso!",
                listaDeClientes: resultado
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao recuperar clientes do backend!",
                listaDeClientes: []
            }
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro " + e.message,
            listaDeClientes: []
        }
    }
})

export const apagarCliente = createAsyncThunk('apagarCliente', async (cliente) => {
    const resultado = await removerCliente(cliente);
    try {
        if (resultado.status) {
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                id: cliente.id
            }
        }
        else {
            return {
                status: resultado.status,
                mensagem: resultado.mensagem
            }
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro: " + e.message
        }
    }
});

export const editarCliente = createAsyncThunk('editarCliente', async (cliente) => {
    const resultado = await alterarCliente(cliente);
    try {
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            cliente: cliente
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro: " + e.message
        }
    }
});

export const registrarCliente = createAsyncThunk('registrarCliente', async (cliente) => {
    const resultado = await gravarCliente(cliente);
    try {
        if (resultado.status) {
            cliente.id = resultado.id;
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                cliente: cliente
            }
        }
        else
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
            }

    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro: " + e.message
        }
    }
});

const clienteReducer = createSlice({
    name: 'cliente',
    initialState: {
        estadoCli: ESTADO.OCIOSO,
        mensagemCli: "",
        listaDeclientes: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarClientes.pending, (state, action) => {
            state.estadoCli = ESTADO.PENDENTE;
            state.mensagemCli = "Processando requisicao";
        })
            .addCase(buscarClientes.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCli = ESTADO.OCIOSO;
                    state.mensagemCli = action.payload?.mensagem;
                    state.listaDeclientes = action.payload?.listaDeClientes;
                }
                else {
                    state.estadoCli = ESTADO.ERRO;
                    state.mensagemCli = action.payload?.mensagem;
                    state.listaDeclientes = action.payload?.listaDeClientes;
                }
            })
            .addCase(buscarClientes.rejected, (state, action) => {
                state.estadoCli = ESTADO.ERRO;
                state.mensagemCli = action.payload?.mensagem;
                state.listaDeclientes = action.payload?.listaDeClientes;
            })
            .addCase(apagarCliente.pending, (state, action) => {
                state.estadoCli = ESTADO.PENDENTE;
                state.mensagemCli = "Processando requisicao";
            })
            .addCase(apagarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCli = ESTADO.OCIOSO;
                    state.mensagemCli = action.payload?.mensagem;
                    state.listaDeclientes = state.listaDeclientes.filter((item) => item.id !== action.payload.id);
                }
                else {
                    state.estadoCli = ESTADO.ERRO;
                    state.mensagemCli = action.payload?.mensagem;
                }
            })
            .addCase(apagarCliente.rejected, (state, action) => {
                state.estadoCli = ESTADO.ERRO;
                state.mensagemCli = action.payload?.mensagem;
            })
            .addCase(editarCliente.pending, (state, action) => {
                state.estadoCli = ESTADO.PENDENTE;
                state.mensagemCli = "Processando requisicao";
            })
            .addCase(editarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCli = ESTADO.OCIOSO;
                    state.mensagemCli = action.payload?.mensagem;
                    state.listaDeclientes = state.listaDeclientes.map((item) => item.id === action.payload.cliente.id ? action.payload.cliente : item);
                }
                else {
                    state.estadoCli = ESTADO.ERRO;
                    state.mensagemCli = action.payload?.mensagem;
                }
            })
            .addCase(editarCliente.rejected, (state, action) => {
                state.estadoCli = ESTADO.ERRO;
                state.mensagemCli = action.payload?.mensagem;
            })
            .addCase(registrarCliente.pending, (state, action) => {
                state.estadoCli = ESTADO.PENDENTE;
                state.mensagemCli = "Processando requisicao";
            })
            .addCase(registrarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCli = ESTADO.OCIOSO;
                    state.mensagemCli = action.payload?.mensagem;
                    state.listaDeclientes.push(action.payload.cliente);
                }
                else {
                    state.estadoCli = ESTADO.ERRO;
                    state.mensagemCli = action.payload?.mensagem;
                }
            })
            .addCase(registrarCliente.rejected, (state, action) => {
                state.estadoCli = ESTADO.ERRO;
                state.mensagemCli = action.payload?.mensagem;
            })
    }
})

export default clienteReducer.reducer;
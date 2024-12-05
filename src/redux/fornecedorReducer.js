import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { consultarFornecedor, removerFornecedor, alterarFornecedor, gravarFornecedor } from "../servicos/servicoFornecedor";

export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async () => {
    const resultado = await consultarFornecedor();
    try {
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Fornecedores recuperados com sucesso!",
                listaDeFornecedores: resultado
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao recuperar fornecedores do backend!",
                listaDeFornecedores: []
            }
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro " + e.message,
            listaDeFornecedores: []
        }
    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async (fornecedor) => {
    const resultado = await removerFornecedor(fornecedor);
    try {
        if (resultado.status) {
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                id: fornecedor.id
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

export const editarFornecedor = createAsyncThunk('editarFornecedor', async (fornecedor) => {
    const resultado = await alterarFornecedor(fornecedor);
    try {
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            fornecedor: fornecedor
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro: " + e.message
        }
    }
});

export const registrarFornecedor = createAsyncThunk('registrarFornecedor', async (fornecedor) => {
    const resultado = await gravarFornecedor(fornecedor);
    try {
        if (resultado.status) {
            fornecedor.id = resultado.id;
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                fornecedor: fornecedor
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

const fornecedorReducer = createSlice({
    name: 'fornecedor',
    initialState: {
        estadoF: ESTADO.OCIOSO,
        mensagemF: "",
        listaDeFornecedores: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarFornecedores.pending, (state, action) => {
            state.estadoF = ESTADO.PENDENTE;
            state.mensagemF = "Processando requisicao";
        })
            .addCase(buscarFornecedores.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoF = ESTADO.OCIOSO;
                    state.mensagemF = action.payload?.mensagem;
                    state.listaDeFornecedores = action.payload?.listaDeFornecedores;
                }
                else {
                    state.estadoF = ESTADO.ERRO;
                    state.mensagemF = action.payload?.mensagem;
                    state.listaDeFornecedores = action.payload?.listaDeFornecedores;
                }
            })
            .addCase(buscarFornecedores.rejected, (state, action) => {
                state.estadoF = ESTADO.ERRO;
                state.mensagemF = action.payload?.mensagem;
                state.listaDeFornecedores = action.payload?.listaDeFornecedores;
            })
            .addCase(apagarFornecedor.pending, (state, action) => {
                state.estadoF = ESTADO.PENDENTE;
                state.mensagemF = "Processando requisicao";
            })
            .addCase(apagarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoF = ESTADO.OCIOSO;
                    state.mensagemF = action.payload?.mensagem;
                    state.listaDeFornecedores = state.listaDeFornecedores.filter((item) => item.id !== action.payload.id);
                }
                else {
                    state.estadoF = ESTADO.ERRO;
                    state.mensagemF = action.payload?.mensagem;
                }
            })
            .addCase(apagarFornecedor.rejected, (state, action) => {
                state.estadoF = ESTADO.ERRO;
                state.mensagemF = action.payload?.mensagem;
            })
            .addCase(editarFornecedor.pending, (state, action) => {
                state.estadoF = ESTADO.PENDENTE;
                state.mensagemF = "Processando requisicao";
            })
            .addCase(editarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoF = ESTADO.OCIOSO;
                    state.mensagemF = action.payload?.mensagem;
                    state.listaDeFornecedores = state.listaDeFornecedores.map((item) => item.id === action.payload.fornecedor.id ? action.payload.fornecedor : item);
                }
                else {
                    state.estadoF = ESTADO.ERRO;
                    state.mensagemF = action.payload?.mensagem;
                }
            })
            .addCase(editarFornecedor.rejected, (state, action) => {
                state.estadoF = ESTADO.ERRO;
                state.mensagemF = action.payload?.mensagem;
            })
            .addCase(registrarFornecedor.pending, (state, action) => {
                state.estadoF = ESTADO.PENDENTE;
                state.mensagemF = "Processando requisicao";
            })
            .addCase(registrarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoF = ESTADO.OCIOSO;
                    state.mensagemF = action.payload?.mensagem;
                    state.listaDeFornecedores.push(action.payload.fornecedor);
                }
                else {
                    state.estadoF = ESTADO.ERRO;
                    state.mensagemF = action.payload?.mensagem;
                }
            })
            .addCase(registrarFornecedor.rejected, (state, action) => {
                state.estadoF = ESTADO.ERRO;
                state.mensagemF = action.payload?.mensagem;
            })
    }
})

export default fornecedorReducer.reducer;
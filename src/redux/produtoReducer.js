import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { alterarProduto, consultarProduto, gravarProduto, removerProduto } from "../servicos/servicoProduto";

import ESTADO from "./estados";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async () => {
    const resultado = await consultarProduto();
    try {
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Produtos recuperados com sucesso!",
                "listaDeProdutos": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os produtos do Backend!",
                "listaDeProdutos": []
            }
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message,
            "listaDeProdutos": []
        }
    }
});

export const apagarProduto = createAsyncThunk('apagarProduto', async (produto) => {
    const resultado = await removerProduto(produto);
    try {
        if (resultado.status) {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "codigo": produto.codigo
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

export const editarProduto = createAsyncThunk('editarProduto', async (produto) => {
    const resultado = await alterarProduto(produto);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "produto": produto
        }
    }
    catch (e) {
        return {
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

export const registrarProduto = createAsyncThunk('registrarProduto', async (produto) => {
    const resultado = await gravarProduto(produto);
    try {
        if (resultado.status) {
            produto.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "produto": produto
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
            "status": false,
            "mensagem": "Erro: " + e.message
        }
    }
})

const produtoReducer = createSlice({
    name: 'produto',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeProdutos: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarProdutos.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (buscando Produtos)"
        })
            .addCase(buscarProdutos.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload?.mensagem;
                    state.listaDeProdutos = action.payload?.listaDeProdutos;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload?.mensagem;
                    state.listaDeProdutos = action.payload?.listaDeProdutos
                }
            })
            .addCase(buscarProdutos.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
                state.listaDeProdutos = action.payload?.listaDeProdutos;
            })
            .addCase(apagarProduto.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (excluindo produto)";
            })
            .addCase(apagarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaDeProdutos = state.listaDeProdutos.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(apagarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(editarProduto.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (alterando produto)";
            })
            .addCase(editarProduto.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaDeProdutos.map((item) => item.codigo === action.payload.produto.codigo ? action.payload.produto : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(editarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(registrarProduto.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição (cadastrando produto)";
            })
            .addCase(registrarProduto.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaDeProdutos.push(action.payload.produto);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(registrarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
    }
});

export default produtoReducer.reducer;
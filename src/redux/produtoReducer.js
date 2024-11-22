import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { consultarProduto, serviceExcluirProduto } from "../servicos/servicoProduto";

export const buscarProdutos = createAsyncThunk('buscarProdutos', async () => {
    //lista de produtos
    const resultado = await consultarProduto();
    try {
        //se for um array/lista a consulta funcionou
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
    //dar previsibilidade ao conteudo do payload
    //lista de produtos
    const resultado = await serviceExcluirProduto(produto);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem
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
                state.mensagem = action.payload?.mensagem;
            })
            .addCase(apagarProduto.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload?.mensagem;
                //altera a lista de produtos?
            })
            .addCase(apagarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload?.mensagem;
            })
    }
});

export default produtoReducer.reducer;
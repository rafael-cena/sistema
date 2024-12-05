import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { alterarCategoria, consultarCategoria, gravarCategoria, removerCategoria } from "../servicos/servicoCategoria";

export const buscarCategorias = createAsyncThunk('buscarCategorias', async () => {
    const resultado = await consultarCategoria();
    try {
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Categorias recuperadas com sucesso!",
                listaDeCategorias: resultado
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao recuperar categorias do backend!",
                listaDeCategorias: []
            }
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro " + e.message,
            listaDeCategorias: []
        }
    }
});

export const apagarCategoria = createAsyncThunk('apagarCategoria', async (categoria) => {
    const resultado = await removerCategoria(categoria);
    try {
        if (resultado.status) {
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                codigo: categoria.codigo
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

export const editarCategoria = createAsyncThunk('editarCategoria', async (categoria) => {
    const resultado = await alterarCategoria(categoria);
    try {
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            categoria: categoria
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro: " + e.message
        }
    }
});

export const registrarCategoria = createAsyncThunk('registrarCategoria', async (categoria) => {
    const resultado = await gravarCategoria(categoria);
    try {
        if (resultado.status) {
            categoria.codigo = resultado.codigo;
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                categoria: categoria
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

const categoriaReducer = createSlice({
    name: 'categoria',
    initialState: {
        estadoCat: ESTADO.OCIOSO,
        mensagemCat: "",
        listaDeCategorias: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarCategorias.pending, (state, action) => {
            state.estadoCat = ESTADO.PENDENTE;
            state.mensagemCat = "Processando requisicao";
        })
            .addCase(buscarCategorias.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCat = ESTADO.OCIOSO;
                    state.mensagemCat = action.payload?.mensagem;
                    state.listaDeCategorias = action.payload?.listaDeCategorias;
                }
                else {
                    state.estadoCat = ESTADO.ERRO;
                    state.mensagemCat = action.payload?.mensagem;
                    state.listaDeCategorias = action.payload?.listaDeCategorias;
                }
            })
            .addCase(buscarCategorias.rejected, (state, action) => {
                state.estadoCat = ESTADO.ERRO;
                state.mensagemCat = action.payload?.mensagem;
                state.listaDeCategorias = action.payload?.listaDeCategorias;
            })
            .addCase(apagarCategoria.pending, (state, action) => {
                state.estadoCat = ESTADO.PENDENTE;
                state.mensagemCat = "Processando requisicao";
            })
            .addCase(apagarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCat = ESTADO.OCIOSO;
                    state.mensagemCat = action.payload?.mensagem;
                    state.listaDeCategorias = state.listaDeCategorias.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estadoCat = ESTADO.ERRO;
                    state.mensagemCat = action.payload?.mensagem;
                }
            })
            .addCase(apagarCategoria.rejected, (state, action) => {
                state.estadoCat = ESTADO.ERRO;
                state.mensagemCat = action.payload?.mensagem;
            })
            .addCase(editarCategoria.pending, (state, action) => {
                state.estadoCat = ESTADO.PENDENTE;
                state.mensagemCat = "Processando requisicao";
            })
            .addCase(editarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCat = ESTADO.OCIOSO;
                    state.mensagemCat = action.payload?.mensagem;
                    state.listaDeCategorias = state.listaDeCategorias.map((item) => item.codigo === action.payload.categoria.codigo ? action.payload.categoria : item);
                }
                else {
                    state.estadoCat = ESTADO.ERRO;
                    state.mensagemCat = action.payload?.mensagem;
                }
            })
            .addCase(editarCategoria.rejected, (state, action) => {
                state.estadoCat = ESTADO.ERRO;
                state.mensagemCat = action.payload?.mensagem;
            })
            .addCase(registrarCategoria.pending, (state, action) => {
                state.estadoCat = ESTADO.PENDENTE;
                state.mensagemCat = "Processando requisicao";
            })
            .addCase(registrarCategoria.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoCat = ESTADO.OCIOSO;
                    state.mensagemCat = action.payload?.mensagem;
                    state.listaDeCategorias.push(action.payload.categoria);
                }
                else {
                    state.estadoCat = ESTADO.ERRO;
                    state.mensagemCat = action.payload?.mensagem;
                }
            })
            .addCase(registrarCategoria.rejected, (state, action) => {
                state.estadoCat = ESTADO.ERRO;
                state.mensagemCat = action.payload?.mensagem;
            })
    }
})

export default categoriaReducer.reducer;
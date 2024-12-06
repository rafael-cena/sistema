import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "./estados";
import { gravarPrivilegio, alterarPrivilegio, removerPrivilegio, consultarPrivilegio } from "../servicos/servicoPrivilegio";

export const buscarPrivilegios = createAsyncThunk('buscarPrivilegios', async () => {
    const resultado = await consultarPrivilegio();
    try {
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Privilegios recuperados com sucesso!",
                listaDePrivilegios: resultado
            }
        }
        else {
            return {
                status: false,
                mensagem: "Erro ao recuperar privilegios do backend!",
                listaDePrivilegios: []
            }
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro " + e.message,
            listaDePrivilegios: []
        }
    }
});

export const apagarPrivilegio = createAsyncThunk('apagarPrivilegio', async (privilegio) => {
    const resultado = await removerPrivilegio(privilegio);
    try {
        if (resultado.status) {
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                codigo: privilegio.codigo
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

export const editarPrivilegio = createAsyncThunk('editarPrivilegio', async (privilegio) => {
    const resultado = await alterarPrivilegio(privilegio);
    try {
        return {
            status: resultado.status,
            mensagem: resultado.mensagem,
            privilegio: privilegio
        }
    }
    catch (e) {
        return {
            status: false,
            mensagem: "Erro: " + e.message
        }
    }
});

export const registrarPrivilegio = createAsyncThunk('registrarPrivilegio', async (privilegio) => {
    const resultado = await gravarPrivilegio(privilegio);
    try {
        if (resultado.status) {
            privilegio.codigo = resultado.codigo;
            return {
                status: resultado.status,
                mensagem: resultado.mensagem,
                privilegio: privilegio
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

const privilegioReducer = createSlice({
    name: 'privilegio',
    initialState: {
        estadoP: ESTADO.OCIOSO,
        mensagemP: "",
        listaDePrivilegios: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarPrivilegios.pending, (state, action) => {
            state.estadoP = ESTADO.PENDENTE;
            state.mensagemP = "Processando requisicao";
        })
            .addCase(buscarPrivilegios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoP = ESTADO.OCIOSO;
                    state.mensagemP = action.payload?.mensagem;
                    state.listaDePrivilegios = action.payload?.listaDePrivilegios;
                }
                else {
                    state.estadoP = ESTADO.ERRO;
                    state.mensagemP = action.payload?.mensagem;
                    state.listaDePrivilegios = action.payload?.listaDePrivilegios;
                }
            })
            .addCase(buscarPrivilegios.rejected, (state, action) => {
                state.estadoP = ESTADO.ERRO;
                state.mensagemP = action.payload?.mensagem;
                state.listaDePrivilegios = action.payload?.listaDePrivilegios;
            })
            .addCase(apagarPrivilegio.pending, (state, action) => {
                state.estadoP = ESTADO.PENDENTE;
                state.mensagemP = "Processando requisicao";
            })
            .addCase(apagarPrivilegio.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoP = ESTADO.OCIOSO;
                    state.mensagemP = action.payload?.mensagem;
                    state.listaDePrivilegios = state.listaDePrivilegios.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estadoP = ESTADO.ERRO;
                    state.mensagemP = action.payload?.mensagem;
                }
            })
            .addCase(apagarPrivilegio.rejected, (state, action) => {
                state.estadoP = ESTADO.ERRO;
                state.mensagemP = action.payload?.mensagem;
            })
            .addCase(editarPrivilegio.pending, (state, action) => {
                state.estadoP = ESTADO.PENDENTE;
                state.mensagemP = "Processando requisicao";
            })
            .addCase(editarPrivilegio.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoP = ESTADO.OCIOSO;
                    state.mensagemP = action.payload?.mensagem;
                    state.listaDePrivilegios = state.listaDePrivilegios.map((item) => item.codigo === action.payload.privilegio.codigo ? action.payload.privilegio : item);
                }
                else {
                    state.estadoP = ESTADO.ERRO;
                    state.mensagemP = action.payload?.mensagem;
                }
            })
            .addCase(editarPrivilegio.rejected, (state, action) => {
                state.estadoP = ESTADO.ERRO;
                state.mensagemP = action.payload?.mensagem;
            })
            .addCase(registrarPrivilegio.pending, (state, action) => {
                state.estadoP = ESTADO.PENDENTE;
                state.mensagemP = "Processando requisicao";
            })
            .addCase(registrarPrivilegio.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estadoP = ESTADO.OCIOSO;
                    state.mensagemP = action.payload?.mensagem;
                    state.listaDePrivilegios.push(action.payload.privilegio);
                }
                else {
                    state.estadoP = ESTADO.ERRO;
                    state.mensagemP = action.payload?.mensagem;
                }
            })
            .addCase(registrarPrivilegio.rejected, (state, action) => {
                state.estadoP = ESTADO.ERRO;
                state.mensagemP = action.payload?.mensagem;
            })
    }
})

export default privilegioReducer.reducer;
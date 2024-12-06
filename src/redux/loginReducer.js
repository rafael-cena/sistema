import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { autLogin } from "../servicos/servicoUsuario";
import ESTADO from "./estados";

export const authLogin = createAsyncThunk('authLogin', async (login) => {
    const resultado = await autLogin(login);
    try {
        if (resultado.login)
            return {
                "status": resultado.status,
                "login": resultado.login,
                "mensagem": resultado.mensagem,
                "usuario": login.username
            }
        else
            return {
                "status": resultado.status,
                "login": false,
                "mensagem": resultado.mensagem
            }
    }
    catch (e) {
        return {
            "status": resultado.status,
            "login": false,
            "mensagem": "Erro: " + e.message
        }
    }
});

const loginReducer = createSlice({
    name: 'login',
    initialState: {
        estadoL: ESTADO.OCIOSO,
        status: false,
        usuarioL: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state, action) => {
            state.estadoL = ESTADO.PENDENTE;
        })
        .addCase(authLogin.fulfilled, (state, action) => {
            if (action.payload.status) {
                if (action.payload.login) {
                    state.status = true;                    
                    state.usuarioL = action.payload.usuario;
                    state.estadoL = ESTADO.OCIOSO;
                }
                else {
                    state.estadoL = ESTADO.ERRO;
                }
            }
            else {
                state.estadoL = ESTADO.ERRO;
            }
        })
        .addCase(authLogin.rejected, (state, action) => {
            state.estadoL = ESTADO.ERRO;
        })
    }
})

export default loginReducer.reducer;
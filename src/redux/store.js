import { configureStore } from '@reduxjs/toolkit';
import produtoReducer from './produtoReducer';
import usuarioReducer from './usuarioReducer';
import loginReducer from './loginReducer';
import privilegioReducer from './privilegioReducer';
import categoriaReducer from './categoriaReducer';
import clienteReducer from './clienteReducer';
import fornecedorReducer from './fornecedorReducer';

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'usuario': usuarioReducer,
        'login': loginReducer,
        'privilegio': privilegioReducer,
        'categoria': categoriaReducer,
        'cliente': clienteReducer,
        'fornecedor': fornecedorReducer
    },
});

export default store;
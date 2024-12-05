import { configureStore } from '@reduxjs/toolkit';
import produtoReducer from './produtoReducer';
import usuarioReducer from './usuarioReducer';
import loginReducer from './loginReducer';
import privilegioReducer from './privilegioReducer';

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'usuario': usuarioReducer,
        'login': loginReducer,
        'privilegio': privilegioReducer
    },
});

export default store;
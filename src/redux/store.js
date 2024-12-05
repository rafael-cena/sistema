import { configureStore } from '@reduxjs/toolkit';
import produtoReducer from './produtoReducer';
import usuarioReducer from './usuarioReducer';
import loginReducer from './loginReducer';

const store = configureStore({
    reducer: {
        'produto': produtoReducer,
        'usuario': usuarioReducer,
        'login': loginReducer
    },
});

export default store;
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/filters'
import errorsReducer from './errors/errors'
import modalReducer from './modal/modal';
import userReducer from './user/user'

export const store = configureStore({
    reducer: {
        // Добавляйте другие редюсеры здесь
        productFilters: filtersReducer,
        errors: errorsReducer,
        modal: modalReducer,
        user: userReducer
    },
});

// Типизация для работы с useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
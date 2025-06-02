import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorData {
    id: string;
    code: number;
    message: string;
    path: string;
    timestamp: number;
}

interface ErrorState {
    errors: ErrorData[];
}

const initialState: ErrorState = {
    errors: [],
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        addError: (state, action: PayloadAction<{
            code: number;
            message: string;
            path: string;
        }>) => {
            const newError: ErrorData = {
                id: Date.now().toString(),
                code: action.payload.code,
                message: action.payload.message,
                path: action.payload.path,
                timestamp: Date.now(),
            };
            state.errors.push(newError);
        },
        removeError: (state, action: PayloadAction<string>) => {
            state.errors = state.errors.filter(error => error.id !== action.payload);
        },
        clearErrors: (state) => {
            state.errors = [];
        },
    },
});

export const { addError, removeError, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;
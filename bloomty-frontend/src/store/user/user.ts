import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { AuthResponse, User, UserState } from './types';
import { UserRequests } from '../../axios/userRequests';
import { addError } from '../errors/errors';
import { AppDispatch } from '../store';
import { IUser } from '../../types/User';

export interface AuthResponse {
    token: string;
    user: IUser;
}

export interface UserState {
    isAuth: boolean;
    isLoaded: boolean;
    token: string | null;
    user: IUser | null;
}

const initialState: UserState = {
    isAuth: false,
    isLoaded: false,
    token: null,
    user: null,
};

// Вспомогательная функция для обработки ошибок
const handleError = (error: any, dispatch: AppDispatch) => {
    const errorData = error.response?.data || {};
    dispatch(addError({
        code: errorData.statusCode || '500',
        message: errorData.message || 'Произошла ошибка в приложении',
        path: errorData.path || window.location.pathname
    }));
    return error;
};

// Асинхронные экшены
export const loginUser = createAsyncThunk<
    AuthResponse,
    { email: string; password: string },
    { dispatch: AppDispatch }
>(
    'user/login',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await UserRequests.loginUser(credentials);
            localStorage.setItem('auth-token', response.data.token);
            return response.data;
        } catch (error: any) {
            handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

export const checkAuth = createAsyncThunk<
    { user: IUser; token: string },
    void,
    { dispatch: AppDispatch }
>(
    'user/checkAuth',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error('Токен не найден');
            }

            const { data } = await UserRequests.getMe();
            return { user: data, token };
        } catch (error: any) {
            localStorage.removeItem('auth-token');
            // handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

// === Wishlist Actions ===

/**
 * Добавляет товар в wishlist.
 */
export const addToWishlist = createAsyncThunk<
    IUser, // что возвращается — полный объект пользователя с обновлённым wishlist
    string, // принимаем id товара
    { dispatch: AppDispatch }
>(
    'user/addToWishlist',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await UserRequests.addToWhishlist(productId);
            return response.data;
        } catch (error: any) {
            handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

/**
 * Удаляет товар из wishlist.
 */
export const removeFromWishlist = createAsyncThunk<
    IUser,
    string,
    { dispatch: AppDispatch }
>(
    'user/removeFromWishlist',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await UserRequests.removeFromWhishlist(productId);
            return response.data;
        } catch (error: any) {
            handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

// === Cart Actions ===
export const addToCart = createAsyncThunk<
    IUser,
    string,
    { dispatch: AppDispatch }
>(
    'user/addToCart',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await UserRequests.addToCart(productId);
            return response.data;
        } catch (error: any) {
            handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

export const removeFromCart = createAsyncThunk<
    IUser,
    string,
    { dispatch: AppDispatch }
>(
    'user/removeFromCart',
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            const response = await UserRequests.removeFromCart(productId);
            return response.data;
        } catch (error: any) {
            handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

export const resetCart = createAsyncThunk<
    IUser,
    void,
    { dispatch: AppDispatch; state: { user: UserState } }
>(
    'user/resetCart',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const state = getState();
            const cart = state.user.user?.cart;

            if (!cart || cart.length === 0) {
                return state.user.user!;
            }

            // Выполняем все запросы на удаление
            await Promise.all(
                cart.map(product => dispatch(removeFromCart(product.id)).unwrap())
            );

            // После удаления запрашиваем обновленного пользователя
            const response = await UserRequests.getMe(); // или можно вернуть обновленного из последнего removeFromCart
            return response.data;
        } catch (error: any) {
            handleError(error, dispatch);
            return rejectWithValue(error.response?.data || {});
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('auth-token');
            state.isAuth = false;
            state.isLoaded = true;
            state.token = null;
            state.user = null;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuth = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Логин
            .addCase(loginUser.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isAuth = true;
                state.isLoaded = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuth = false;
                state.isLoaded = true;
                state.token = null;
                state.user = null;
            })

            // Проверка авторизации
            .addCase(checkAuth.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ user: IUser; token: string }>) => {
                state.isAuth = true;
                state.isLoaded = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuth = false;
                state.isLoaded = true;
                state.token = null;
                state.user = null;
            })
            // --- ADD TO WISHLIST ---
            .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(addToWishlist.rejected, () => {
                // Ошибки уже обработаны через handleError
            })
            // --- REMOVE FROM WISHLIST ---
            .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(removeFromWishlist.rejected, () => {
                // Ошибки уже обработаны через handleError
            })
            // --- CART ---
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(resetCart.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            });
    },
});

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    price: string | null;
    type: string | null;
    category: string | null;
    color: string | null;
    sort: string | null;
}

const initialState: FiltersState = {
    price: null,
    type: null,
    category: null,
    color: null,
    sort: 'all',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // Универсальный экшен для изменения одного или нескольких фильтров
        setFilter: (state, action: PayloadAction<Partial<FiltersState>>) => {
            return { ...state, ...action.payload };
        },
        // Экшен для сброса всех фильтров в null
        resetFilters: () => initialState,
    },
});

// Экспорт экшенов
export const { setFilter, resetFilters } = filtersSlice.actions;

// Экспорт редюсера
export default filtersSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Для того чтобы добьавить кастомный пропс, добавляем его в
// ModalProps с вопросом(если нужен не всем модалкам)
// Потом идем в файл с модалкой (например loginModal.tsx и там дописываем в interface LoginModalProps тоже с знаком вопроса, как необязательное поле)
// И все пропс долетел

export type ModalProps = {
    addProps?: string; // Тестовый доп пропс для проверки
    product_id?: string;
};

export type ModalState = {
    modals: Record<string, { isOpen: boolean; modalProps: ModalProps }>;
};

const initialState: ModalState = {
    modals: {},
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{ modalId: string; modalProps: ModalProps }>
        ) => {
            const { modalId, modalProps } = action.payload;
            state.modals[modalId] = { isOpen: true, modalProps };
        },
        closeModal: (state, action: PayloadAction<{ modalId: string }>) => {
            const { modalId } = action.payload;
            delete state.modals[modalId];
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
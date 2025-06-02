import { useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import './loginModal.css';
import { useState } from "react";
import { useAppDispatch } from "../../store/storeHooks";
import { loginUser } from "../../store/user/user";
import { closeModal } from "../../store/modal/modal";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    addProps?: string; // Тестовый доп пропс для проверки
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, addProps }) => {

    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    });

    const dispatch = useAppDispatch();

    const history = useHistory();

    const goToRegisterPage = () => {
        onClose();
        history.push('/register');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const loginUserAction = () => {
        dispatch(loginUser(formData))
            .then(() => dispatch(closeModal({ modalId: 'loginModal' })));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="ВХОД В ЛИЧНЫЙ КАБИНЕТ">
            <div className="login-page-pop-up-container">
                <div className="field login-page-pop-up-form-field">
                    <input type="text" placeholder="E-mail"
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="field login-page-pop-up-form-field">
                    <input type="password" placeholder="Пароль"
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="login-page-pop-up-form-reset-password">Забыли пароль?</div>
                <div className="button-filled login-page-pop-up-form-button" onClick={loginUserAction}>Войти</div>
                <div className="login-page-pop-up-form-register" onClick={goToRegisterPage}>Зарегистрироваться</div>
            </div>
        </Modal>
    );
};

export default LoginModal;
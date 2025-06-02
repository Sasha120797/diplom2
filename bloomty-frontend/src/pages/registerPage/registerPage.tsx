import { useState } from 'react';
import './registerPage.css';
import { UserRequests } from '../../axios/userRequests';
import { useAppDispatch } from '../../store/storeHooks';
import { addError } from '../../store/errors/errors';
import { openModal } from '../../store/modal/modal';
import {useHistory} from "react-router-dom";

export interface RegisterFormData {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}

const RegisterPage = () => {

    const [formData, setFormData] = useState<RegisterFormData>({
        fullname: '',
        email: '',
        phone: '',
        password: ''
    });

    const history = useHistory();

    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        UserRequests.registerUser(formData)
            .then(() => {
                dispatch(openModal({ modalId: "loginModal", modalProps: {} }));
            })
            .catch(err => {
                dispatch(addError({
                    code: err.response.data.statusCode || "500",
                    message: err.response.data.message || "Произошла ошибка в приложении",
                    path: err.response.data.path || ""
                }));
            })
    };

    return (
        <div className="register-page-container">
            <div className="register-page-header">
                <div className="inner-container register-page-header-inner">
                    <div className="register-page-header-navigation">
                        Главная / Личный кабинет / <span>Регистрация</span>
                    </div>
                    <div className="register-page-header-title">Регистрация</div>
                    <div className="register-page-header-description">
                        Добро пожаловать в наш магазин! Мы рады видеть вас здесь. У нас вы
                        найдете широкий ассортимент товаров, которые помогут сделать вашу жизнь
                        более удобной и яркой. Приятных покупок и отличного настроения!
                    </div>
                </div>
            </div>
            <div className="inner-container register-page-header-form">
                <div className="register-page-header-form-title">Регистрация:</div>
                <div className="field register-page-header-form-input">
                    <input type="text" placeholder="ФИО"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="field register-page-header-form-input">
                    <input type="text" placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="field register-page-header-form-input">
                    <input type="text" placeholder="Телефон"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="field register-page-header-form-input">
                    <input type="password" placeholder="Пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <div className="line" />
                </div>
                <div className="register-page-header-form-description">
                    Нажимая на кнопку «Зарегистрироваться», вы даете согласие на обработку
                    персональных данных и соглашаетесь c <p onClick={()=>history.push('/politica-confidicialnosti')}>политикой конфиденциальности</p>.
                </div>
                <div className="button-filled register-page-header-form-button" onClick={handleSubmit}>
                    Зарегистрироваться
                </div>
            </div>
        </div>

    )
}

export default RegisterPage;
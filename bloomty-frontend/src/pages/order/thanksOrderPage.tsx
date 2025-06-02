import React, { useEffect } from 'react';
import './thanksOrderPage.css';
import { useHistory } from 'react-router-dom';

const ThanksOrderPage: React.FC<{ dirPath: string }> = ({ dirPath }) => {

    const history = useHistory();

    useEffect(() => {
        if (dirPath !== '/payment') {
            history.push('/order')
        }
    }, [])

    return (
        <div className="thanks-order-container">
            <div className="thanks-order-header">
                <div className="inner-container thanks-order-header-inner">
                    <div className="thanks-order-header-title">Спасибо за ваш заказ!</div>
                    <div className="thanks-order-header-sub-title">
                        Мы получили Ваш заказ и отправили письмо с подтверждением на Вашу почту.
                    </div>
                </div>
            </div>
            <div className="inner-container thanks-order-feedback">
                <div className="thanks-order-feedback-description">
                    Узнавайте первыми о скидках, новинках и актуальных акциях — подписывайтесь
                    на нашу новостную рассылку.
                </div>
                <div className="thanks-order-feedback-form">
                    <div className="thanks-order-feedback-inputs">
                        <div className="field thanks-order-feedback-input">
                            <input type="text" placeholder="Ваше имя" />
                            <div className="line" />
                        </div>
                        <div className="field thanks-order-feedback-input">
                            <input type="text" placeholder="Ваша электронная почта" />
                            <div className="line" />
                        </div>
                        <div className="button-border thanks-order-feedback-button">
                            Подписаться
                        </div>
                    </div>
                    <div className="thanks-order-feedback-rules">
                        Нажимая на кнопку «Подписаться», вы даете согласие на обработку
                        персональных данных и соглашаетесь c <p onClick={()=>history.push('/politica-confidicialnosti')}>политикой конфиденциальности</p>.
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ThanksOrderPage;
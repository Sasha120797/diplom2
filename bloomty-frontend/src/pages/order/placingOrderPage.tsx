import React from 'react';
import './placingOrderPage.css';
import { useHistory } from 'react-router-dom';

const PlacingOrderPage: React.FC<{
    formData: { email: string, name: string, surName: string, phone: string, region: string, city: string, street: string, house: string, commentary: string },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    setDirPath: (val: string) => void
}> = ({ formData, handleInputChange, setDirPath }) => {

    const history = useHistory();

    const goToPayment = () => {
        setDirPath('/placing');
        history.push('/order/payment')
    }

    return (<div className="placing-order-page-container">
        <div className="placing-order-page-contacts">
            <div className="inner-container placing-order-page-contacts-inner">
                <div className="placing-order-page-contacts-navigation">
                    Главная / Корзина / <span>Оформление заказа</span>
                </div>
                <div className="placing-order-page-contacts-title">Оформление Заказа</div>
                <div className="placing-order-page-contacts-form">
                    <div className="placing-order-page-contacts-form-title">
                        Контактная информация:
                    </div>
                    <div className="placing-order-page-contacts-form-inputs">
                        <div className="placing-order-page-contacts-form-input-str">
                            <div className="placing-order-page-contacts-form-input field">
                                <input type="text" placeholder="Имя" name='name' onChange={handleInputChange} value={formData.name} />
                                <div className="line" />
                            </div>
                            <div className="placing-order-page-contacts-form-input field">
                                <input type="text" placeholder="Фамилия" name='surName' onChange={handleInputChange} value={formData.surName} />
                                <div className="line" />
                            </div>
                        </div>
                        <div className="placing-order-page-contacts-form-input-str">
                            <div className="field placing-order-page-contacts-form-input">
                                <input type="text" placeholder="Телефон" name='phone' onChange={handleInputChange} value={formData.phone} />
                                <div className="line" />
                            </div>
                            <div className="field placing-order-page-contacts-form-input">
                                <input type="text" placeholder="E-mail" name='email' onChange={handleInputChange} value={formData.email} />
                                <div className="line" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="inner-container placing-order-page-address">
            <div className="placing-order-page-address-title">Адрес:</div>
            <div className="placing-order-page-address-form">
                <div className="placing-order-page-address-form-input-str">
                    <div className="field placing-order-page-address-form-input">
                        <input type="text" placeholder="Регион РФ" name='region' onChange={handleInputChange} value={formData.region} />
                        <div className="line" />
                    </div>
                    <div className="field placing-order-page-address-form-input">
                        <input type="text" placeholder="Город" name='city' onChange={handleInputChange} value={formData.city} />
                        <div className="line" />
                    </div>
                </div>
                <div className="placing-order-page-address-form-input-str">
                    <div className="field placing-order-page-address-form-input">
                        <input type="text" placeholder="Улица" name='street' onChange={handleInputChange} value={formData.street} />
                        <div className="line" />
                    </div>
                    <div className="field placing-order-page-address-form-input">
                        <input type="text" placeholder="Дом Корпус Кв" name='house' onChange={handleInputChange} value={formData.house} />
                        <div className="line" />
                    </div>
                </div>
            </div>
        </div>
        <div className="inner-container placing-order-page-comments">
            <div className="placing-order-page-comments-title">
                Комментарии к заказу:
            </div>
            <div className="placing-order-page-comments-form">
                <textarea
                    accessKey=""
                    rows={4}
                    cols={50}
                    placeholder="Оставьте свой комментарий здесь. Напишите все, что может быть важно для вас. Мы обязательно учтем это"
                    defaultValue={""}
                    name='commentary' onChange={handleInputChange} value={formData.commentary}
                />
            </div>
        </div>
        <div className="inner-container placing-order-page-delivery">
            <div className="placing-order-page-delivery-title">
                Выберите способ доставки:
            </div>
            <div className="placing-order-page-delivery-form">
                <div className="placing-order-page-delivery-form-input">
                    <input
                        type="radio"
                        id="delivery_self"
                        name="delivery_type"
                        defaultValue="delivery_self"
                    />
                    <label htmlFor="delivery_self">Самовывоз</label>
                </div>
                <div className="placing-order-page-delivery-form-input">
                    <input
                        type="radio"
                        id="delivery_comp"
                        name="delivery_type"
                        defaultValue="delivery_comp"
                    />
                    <label htmlFor="delivery_comp">Доставка курьерской службой</label>
                </div>
            </div>
        </div>
        <div className="inner-container placing-order-page-buttons">
            <div className="button-border placing-order-page-button">
                Вернуться в корзину
            </div>
            <div className="button-filled placing-order-page-button" onClick={goToPayment}>
                Перейти к оплате
            </div>
        </div>
    </div>
    )
}

export default PlacingOrderPage;
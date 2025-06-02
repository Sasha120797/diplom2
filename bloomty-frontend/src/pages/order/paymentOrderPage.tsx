import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import './paymentOrderPage.css'

const PaymentOrderPage: React.FC<{
    dirPath: string,
    cartTotalPrice: number,
    cartTotalPriceWithoutSale: number
    createOrder: () => void
}> = ({ dirPath, cartTotalPrice, cartTotalPriceWithoutSale, createOrder }) => {

    const history = useHistory();

    useEffect(() => {
        if (dirPath !== '/placing') {
            history.push('/order')
        }
    }, [])

    return (
        <div className="payment-order-page-container">
            <div className="payment-order-page-total-amount">
                <div className="inner-container payment-order-page-total-amount-inner">
                    <div className="payment-order-page-total-amount-navigation">
                        Главная / Корзина / Оформление заказа / <span>Оплата заказа</span>
                    </div>
                    <div className="payment-order-page-total-amount-title">ОПЛАТА ЗАКАЗА</div>
                    <div className="payment-order-page-total-amount-price">
                        <div className="payment-order-page-total-amount-price-title">
                            Товары на сумму:
                        </div>
                        <div className="payment-order-page-total-amount-price-number">
                            {cartTotalPriceWithoutSale} руб.
                        </div>
                    </div>
                    <div className="payment-order-page-total-amount-promocode-title">
                        Есть промокод?
                    </div>
                    <div className="payment-order-page-total-amount-promocode-input">
                        <div className="field">
                            <input type="text" placeholder="Введите промокод здесь" />
                            <div className="line" />
                        </div>
                    </div>
                    <div className="payment-order-page-total-amount-price payment-order-page-total-amount-price-discount">
                        <div className="payment-order-page-total-amount-price-title">
                            Итого с учетом всех скидок:
                        </div>
                        <div className="payment-order-page-total-amount-price-number">
                            {cartTotalPrice} руб.
                        </div>
                    </div>
                </div>
            </div>
            <div className="inner-container payment-order-page-total-payment-type">
                <div className="payment-order-page-total-payment-type-title">
                    Выберите способ оплаты:
                </div>
                <div className="payment-order-page-total-payment-type-sub-title">
                    Передача всех банковских данных осуществляется с использованием
                    криптографического протокола SSL. Коплате с помощью банковских карт VISA и
                    Mastercard принимаются только операции 3D secure.
                </div>
                <div className="payment-order-page-paymanet-type-form">
                    <div className="payment-order-page-payment-form-input">
                        <input
                            type="radio"
                            id="bank_self"
                            name="payment_type"
                            defaultValue="bank_self"
                        />
                        <label htmlFor="bank_self">Банковской картой при получении</label>
                    </div>
                    <div className="payment-order-page-payment-form-input">
                        <input
                            type="radio"
                            id="cache_delivery"
                            name="payment_type"
                            defaultValue="cache_delivery"
                        />
                        <label htmlFor="cache_delivery">Наличными при получении</label>
                    </div>
                    {/* <div className="payment-order-page-payment-form-input">
                        <input
                            type="radio"
                            id="bank_online"
                            name="payment_type"
                            defaultValue="bank_online"
                        />
                        <label htmlFor="bank_online">Банковской картой на сайте</label>
                    </div>
                    <div className="payment-order-page-payment-form-card-container">
                        <div className="payment-order-page-payment-form-card">
                            <div className="payment-order-page-payment-form-card-str">
                                <div className="field payment-order-page-payment-form-card-input-number">
                                    <input type="text" placeholder="Номер карты" />
                                    <div className="line" />
                                </div>
                                <div className="field payment-order-page-payment-form-card-input-expire">
                                    <input type="text" placeholder="Срок действия (месяц/год)" />
                                    <div className="line" />
                                </div>
                            </div>
                            <div className="payment-order-page-payment-form-card-str">
                                <div className="field payment-order-page-payment-form-card-input-user">
                                    <input type="text" placeholder="Владелец карты" />
                                    <div className="line" />
                                </div>
                                <div className="field payment-order-page-payment-form-card-input-cvv">
                                    <input type="text" placeholder="CVV / CVC" />
                                    <div className="line" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="button-filled payment-order-page-payment-button" onClick={createOrder}>
                        Оформить заказ
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentOrderPage;
import { useHistory } from 'react-router-dom';
import './howOrderPage.css'

const HowOrderPage = () => {

    const history = useHistory();

    return (
        <div className="makeOrder-page-container">
            <div className="makeOrder-page-header">
                <div className="inner-container makeOrder-page-header-inner">
                    <div className="makeOrder-page-header-navigation">
                        Главная / <span>Как сделать заказ</span>
                    </div>
                    <div className="makeOrder-page-header-title">СДЕЛАЙТЕ ЗАКАЗ ЗА 4 ШАГА</div>
                </div>
            </div>
            <div className="inner-container makeOrder-page-content">
                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    1. Выберите свои любимые вещи.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Подберите изделия по цвету, размеру и количеству — и добавьте их в избранное.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    2. Оформите заявку или свяжитесь с менеджером.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Сделайте заказ на сайте и ожидайте звонка от нашей команды. Если вы работаете с личным менеджером, просто напишите ему и укажите свой логин или email.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    3. Мы подтверждаем детали.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Менеджер оперативно свяжется с вами, уточнит параметры и отправит коммерческое предложение.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    4. Оплата и быстрая доставка.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    После подтверждения мы согласуем условия оплаты и организуем доставку точно в срок.
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-description">
                    Не знаете, к кому обратиться? Звоните нам напрямую: +7 (928) 161 00 25 или пишите на почту bloomty@gmail.com — поможем с первого обращения!
                </div>
                <div className="button-border makeOrder-page-button" onClick={() => history.push('/catalog')}>Смотреть каталог</div>
            </div>
        </div>
    )
}

export default HowOrderPage;
import { setFilter } from '../../store/filters/filters';
import { useAppDispatch } from '../../store/storeHooks';
import './footer.css'
import { useHistory } from 'react-router-dom';

const Footer = () => {

    const history = useHistory();

    const dispatch = useAppDispatch();

    const openCatalogPageWithFilterProduct = (type: string) => {
        dispatch(setFilter({ type: type }));
        history.push('/catalog');
    }

    return (
        <div className="footer-container">
            <div className="footer-inner-container">
                <div className="footer-block">
                    <div className="footer-title">
                        Информация
                    </div>
                    <div className="footer-link" onClick={() => history.push('/promotions')}>
                        Акции
                    </div>
                    <div className="footer-link" onClick={() => history.push('/about-us')}>
                        О нас
                    </div>
                    <div className="footer-link" onClick={() => history.push('/how-order')}>
                        Как сделать заказ
                    </div>
                    <div className="footer-link" onClick={() => history.push('/how-order')}>
                        Доставка и оплата
                    </div>
                </div>
                <div className="footer-block">
                    <div className="footer-title">
                        Каталог
                    </div>
                    <div className="footer-link" onClick={() => openCatalogPageWithFilterProduct('Платья')}>
                        Платья
                    </div>
                    <div className="footer-link" onClick={() => openCatalogPageWithFilterProduct('Брюки')}>
                        Брюки
                    </div>
                    <div className="footer-link" onClick={() => openCatalogPageWithFilterProduct('Рубашки')}>
                        Рубашки
                    </div>
                    <div className="footer-link" onClick={() => openCatalogPageWithFilterProduct('Юбки')}>
                        Юбки
                    </div>
                </div>
                <div className="footer-block">
                    <div className="footer-title">
                        Свяжитесь с нами
                    </div>
                    <div className="footer-link">
                        Наш телефон: <p><a href='tel:79788441303'>+7 (928) 161 00 25</a></p>
                    </div>
                    <div className="footer-link">
                        Наша почта: <p><a href='mailto:bloomty@gmail.com'>client@lemisfabr.ru</a></p>
                    </div>
                    <div className="footer-title footer-sub-title">
                        Мы в соцсетях:
                    </div>
                    <div className="footer-link">
                        <a href='https://vk.com/sash_ylkaa' target='_blank'>Telegram</a>
                    </div>
                    <div className="footer-link">
                        <a href='https://vk.com/sash_ylkaa' target='_blank'>Вконтакте</a>
                    </div>
                </div>
                <div className="footer-block">
                    <div className="footer-title">
                        Приходите <p>к нам в гости</p>
                    </div>
                    <div className="footer-link">
                        <a href='https://yandex.ru/maps/-/CHrefGzp' target='_blank'>
                            Наш адрес: г Ростов-на-Дону, ул Космонавтов 2/2, будни с 9:00 до 18:00
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
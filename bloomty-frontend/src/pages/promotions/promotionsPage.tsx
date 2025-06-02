import { useHistory } from 'react-router-dom';
import './promotionsPage.css';
import { useAppDispatch } from '../../store/storeHooks';
import { setFilter } from '../../store/filters/filters';
import Photo1 from './images/125577.jpg';
import SmallProm1 from './images/small-prom-1.png';
import SmallProm2 from './images/small-prom-2.jpg';

const PromotionsPage = () => {

    const history = useHistory();
    const dispatch = useAppDispatch();

    const openCatalogPageWithFilterProduct = (type: string | null) => {
        dispatch(setFilter({ type: type }));
        history.push('/catalog');
    }

    return (
        <div className="promotion-page-container inner-container">
            <div className="promotion-page-poster" />
            <div className="promotion-page-title">Акции</div>
            <div className="promotion-page-sub-title">
                Для постоянных покупателей мы разработали гибкую систему скидок, а
                персональный подход к каждому покупателю обеспечит взаимовыгодное
                сотрудничество с нашей компанией. Мы надеемся, что каждый наш клиент станет
                постоянным, и уверены, что останется довольным.
            </div>
            <div className="promotion-page-big-promotion">
                <div className="promotion-page-big-promotion-img">
                    <img src={Photo1} alt="" />
                </div>
                <div className="promotion-page-big-promotion-title">
                    Базовая футболка в подарок при покупке от 10000р*
                </div>
                <div className="promotion-page-big-promotion-info">
                    *Сроки проведения акции ограничены
                </div>
                <div className="button-filled promotion-page-big-promotion-button" onClick={() => history.push('/catalog')}>
                    Смотреть каталог
                </div>
            </div>
            <div className="promotion-page-small-promotion-container">
                <div className="promotion-page-small-promotion">
                    <div className="promotion-page-small-promotion-img">
                        <img src={SmallProm1} alt="" />
                    </div>
                    <div className="promotion-page-small-promotion-title">
                        Черная пятница 06.06.2025. Успей купить платье по выгодной цене!
                    </div>
                    <div className="button-filled promotion-page-small-promotion-button" onClick={() => openCatalogPageWithFilterProduct(null)}>
                        Смотреть каталог
                    </div>
                </div>
                <div className="promotion-page-small-promotion">
                    <div className="promotion-page-small-promotion-img">
                        <img src={SmallProm2} alt="" />
                    </div>
                    <div className="promotion-page-small-promotion-title">
                        Лето 2025. До -50%! Успей обновить вещи по выгодной цене!
                    </div>
                    <div className="button-filled promotion-page-small-promotion-button" onClick={() => openCatalogPageWithFilterProduct('Кольца')}>
                        Выбрать
                    </div>
                </div>
            </div>
        </div >

    )
}

export default PromotionsPage;
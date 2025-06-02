import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../store/storeHooks";
import './whishlistPage.css'
import ProductCard from "../../components/productCard/productCard";

const WhishlistPage = () => {

    const { user } = useAppSelector(state => state.user)

    const history = useHistory();

    return (
        user && user?.wishlist.length > 0 ?
            <div className="favouritesPage-container">
                <div className="favouritesPage-header">
                    <div className="inner-container favouritesPage-inner-header">
                        <div className="favouritesPage-header-navigation">
                            Главная / <span>Избранное</span>
                        </div>
                        <div className="favouritesPage-header-title">ИЗБРАННОЕ</div>
                        <div className="favouritesPage-header-sub-title">
                            Здесь отображаются понравившиеся Вам товары.
                        </div>
                    </div>
                </div>
                <div className="inner-container favouritesPage-products">
                    {user.wishlist.map(product => <ProductCard product={product} />)}
                </div>
            </div>
            :

            <div className="favouritesPage-container">
                <div className="favouritesPage-header favouritesPage-header-empty">
                    <div className="inner-container favouritesPage-inner-header">
                        <div className="favouritesPage-header-navigation">
                            Главная / <span>Избранное</span>
                        </div>
                        <div className="favouritesPage-header-title">ИЗБРАННОЕ</div>
                        <div className="favouritesPage-header-sub-title favouritesPage-header-sub-title-empty">
                            Здесь будут отображаться понравившиеся Вам товары. Пока Вы ничего не
                            добавили в Избранное. Вернитесь в каталог, чтобы выбрать по категориям.
                        </div>
                    </div>
                </div>
                <div className="inner-container favouritesPage-empty-products">
                    <div className="button-border favouritesPage-empty-products-button" onClick={() => history.push('/catalog')}>
                        Выбрать одежду
                    </div>
                    <div className="favouritesPage-empty-products-text">
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

export default WhishlistPage;
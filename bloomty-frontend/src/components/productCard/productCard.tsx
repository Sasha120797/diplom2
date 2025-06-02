import './productCard.css'
// import TestCard from './images/cart2.png';
import { IProduct } from '../../types/Product';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { useMemo } from 'react';
import { addToWishlist, removeFromWishlist } from '../../store/user/user';
import { addToCart } from './../../store/user/user';
import { openModal } from '../../store/modal/modal';
import { STATIC_URL } from '../../config/urls';

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {

    const { isAuth, user } = useAppSelector(state => state.user)

    const history = useHistory();
    const dispatch = useAppDispatch();

    const isInWishlist = useMemo(() => {
        return isAuth && user?.wishlist.some(item => item.id === product.id);
    }, [isAuth, user?.wishlist, product.id]);

    const isInCart = useMemo(() => {
        return isAuth && user?.cart.some(item => item.id === product.id);
    }, [isAuth, user?.cart, product.id]);


    const handleAddToWishlist = () => {
        dispatch(addToWishlist(product.id));
    };

    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(product.id));
    };

    const toggleWishlist = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (isAuth) {
            if (isInWishlist) {
                handleRemoveFromWishlist();
            } else {
                handleAddToWishlist();
            }
        } else {
            dispatch(
                openModal({
                    modalId: 'loginModal',
                    modalProps: {
                        addProps: "123" // Тестовый доп пропс для проверки (Работает)
                    },
                })
            );
        }
    }

    const handleAddToCart = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (isAuth) {
            dispatch(addToCart(product.id))
        } else {
            dispatch(
                openModal({
                    modalId: 'loginModal',
                    modalProps: {
                        addProps: "123" // Тестовый доп пропс для проверки (Работает)
                    },
                })
            );
        }
    }

    return (
        <div className="product-card-container" onClick={() => history.push(`/product/${product.id}`)}>
            <div className="product-card-statuses">
                <div className={["product-card-status-sale", product.onSale ? null : "product-card-status-sale--hide"].join(' ')}>
                    Sale
                </div>
                <div className={["product-card-status-top", product.isFeatured ? null : "product-card-status-top--hide"].join(' ')}>
                    Хит
                </div>
            </div>
            <div className="product-card-image">
                <img src={`${STATIC_URL}/${product.images[0]}`} alt="" />
            </div>
            <div className="product-card-article">
                {/* TODO Вот сюда действие на избранное */}
                <svg
                    onClick={toggleWishlist}
                    className={["product-card-article-favourite-btn", isInWishlist ? "product-card-article-favourite-btn--active" : null].join(' ')} width="16" height="16" viewBox="0 0 28 26"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.4489 3.98995L26.4491 3.9905C27.9384 7.12973 27.3828 10.7376 24.4926 14.829L24.4913 14.8309C22.2038 18.0902 18.9045 21.3627 14.0741 25.2237L14.0729 25.2247C14.0506 25.2425 14.0264 25.25 14.0042 25.25C13.982 25.25 13.9577 25.2425 13.9355 25.2247L13.9344 25.2238C9.09774 21.3558 5.80441 18.0548 3.51486 14.8277C0.616702 10.7368 0.0613417 7.12937 1.55049 3.9905L1.55075 3.98995C2.5664 1.84455 5.55899 0.00819112 9.13985 1.06437C10.85 1.573 12.3467 2.66486 13.3824 4.16683L13.9998 5.06232L14.6173 4.16683C15.653 2.66465 17.15 1.5727 18.8605 1.06416L18.8624 1.06357C22.4298 -0.00772398 25.4318 1.84157 26.4489 3.98995Z"
                        stroke="#212121" stroke-width="1.5" />
                </svg>

                <div className="product-card-article-content">
                    Артикул: {product.sku}
                </div>
            </div>
            <div className="product-card-title">
                {product.name}
            </div>
            <div className="product-card-current-cost">
                {product.onSale ? product.salePrice : product.basePrice} руб.
            </div>
            <div className={["product-card-base-cost", !product.onSale ? "product-card-base-cost--hide" : null].join(' ')}>
                {product.basePrice} руб.
            </div>
            <div className="button-filled product-card-button" onClick={handleAddToCart}>
                {isInCart ? "Уже в корзине" : "Добавить в корзину"}
            </div>
        </div>
    )
}

export default ProductCard;

{/* <div class="product-card-container">
    <div class="product-card-statuses">
        <div class="product-card-status-sale">
            Sale
        </div>
        <div class="product-card-status-top">
            Хит
        </div>
    </div>
    <div class="product-card-image">
        <img src="./assets/images/cart/cart4.png" alt="">
    </div>
    <div class="product-card-article">
        <svg class="product-card-article-favourite-btn" width="16" height="16" viewBox="0 0 28 26"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M26.4489 3.98995L26.4491 3.9905C27.9384 7.12973 27.3828 10.7376 24.4926 14.829L24.4913 14.8309C22.2038 18.0902 18.9045 21.3627 14.0741 25.2237L14.0729 25.2247C14.0506 25.2425 14.0264 25.25 14.0042 25.25C13.982 25.25 13.9577 25.2425 13.9355 25.2247L13.9344 25.2238C9.09774 21.3558 5.80441 18.0548 3.51486 14.8277C0.616702 10.7368 0.0613417 7.12937 1.55049 3.9905L1.55075 3.98995C2.5664 1.84455 5.55899 0.00819112 9.13985 1.06437C10.85 1.573 12.3467 2.66486 13.3824 4.16683L13.9998 5.06232L14.6173 4.16683C15.653 2.66465 17.15 1.5727 18.8605 1.06416L18.8624 1.06357C22.4298 -0.00772398 25.4318 1.84157 26.4489 3.98995Z"
                stroke="#212121" stroke-width="1.5" />
        </svg>

        <div class="product-card-article-content">
            Артикул: 2378904
        </div>
    </div>
    <div class="product-card-title">
        Кольцо золотое классическое
    </div>
    <div class="product-card-current-cost">
        2 280 руб.
    </div>
    <div class="product-card-base-cost product-card-base-cost--hide">
        3 600 руб.
    </div>
    <div class="button-filled product-card-button">
        Добавить в корзину
    </div>
</div> */}
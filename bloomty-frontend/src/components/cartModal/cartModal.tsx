import { useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import './cartModal.css';
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import { addToWishlist, loginUser, removeFromCart, removeFromWishlist } from "../../store/user/user";
import { closeModal } from "../../store/modal/modal";
import { IProduct } from "../../types/Product";
import { STATIC_URL } from '../../config/urls';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CartProductProps {
    product: IProduct;
}

const CartProduct: React.FC<CartProductProps> = ({ product }) => {

    const dispatch = useAppDispatch();
    const { isAuth, user } = useAppSelector(state => state.user)

    const isInWishlist = useMemo(() => {
        return isAuth && user?.wishlist.some(item => item.id === product.id);
    }, [isAuth, user?.wishlist, product.id]);


    const handleAddToWishlist = () => {
        dispatch(addToWishlist(product.id));
    };

    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(product.id));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id))
    }

    const toggleWishlist = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (isInWishlist) {
            handleRemoveFromWishlist();
        } else {
            handleAddToWishlist();
        }
    }

    return (
        <div className="cart-product">
            <div className="cart-product-info">
                <img
                    src={`${STATIC_URL}/${product.images[0]}`}
                    className="cart-product-img"
                    alt=""
                />
                <div className="cart-product-desc">
                    <div className="cart-product-title">
                        {product.name}
                    </div>
                    <div className="cart-product-size">Артикул: {product.sku}</div>
                </div>
            </div>
            <div className="cart-product-actions">
                <div className="cart-product-cost">
                    <div className="cart-product-cost-current">{product.onSale ? product.salePrice + " руб." : product.basePrice + " руб."}</div>
                    <div className={["cart-product-cost-base", !product.onSale ? "cart-product-cost-base--hidden" : null].join(' ')}>{product.basePrice} руб.</div>
                </div>
                <div className="cart-product-buttons">
                    <svg
                        onClick={toggleWishlist}
                        className={["cart-product-button", isInWishlist ? "cart-product-button--fav" : null].join(' ')}
                        width={20}
                        height={20}
                        viewBox="0 0 28 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M26.4489 3.98995L26.4491 3.9905C27.9384 7.12973 27.3828 10.7376 24.4926 14.829L24.4913 14.8309C22.2038 18.0902 18.9045 21.3627 14.0741 25.2237L14.0729 25.2247C14.0506 25.2425 14.0264 25.25 14.0042 25.25C13.982 25.25 13.9577 25.2425 13.9355 25.2247L13.9344 25.2238C9.09774 21.3558 5.80441 18.0548 3.51486 14.8277C0.616702 10.7368 0.0613417 7.12937 1.55049 3.9905L1.55075 3.98995C2.5664 1.84455 5.55899 0.00819112 9.13985 1.06437C10.85 1.573 12.3467 2.66486 13.3824 4.16683L13.9998 5.06232L14.6173 4.16683C15.653 2.66465 17.15 1.5727 18.8605 1.06416L18.8624 1.06357C22.4298 -0.00772398 25.4318 1.84157 26.4489 3.98995Z"
                            stroke="#B0B0B0"
                            strokeWidth={2}
                        />
                    </svg>
                    <svg
                        className="cart-product-button"
                        width={20}
                        height={20}
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleRemoveFromCart}
                    >
                        <path d="M1 1L15.737 15.737" stroke="#B0B0B0" strokeWidth="1.5" />
                        <path
                            d="M1.2627 16L15.9997 1.26304"
                            stroke="#B0B0B0"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {

    const { isAuth, user } = useAppSelector(state => state.user)

    const history = useHistory();
    const dispatch = useAppDispatch();

    const cartTotal = useMemo(() => {
        if (!user?.cart || user.cart.length === 0) return 0;

        return user.cart.reduce((total, product) => {
            const price = product.onSale && product.salePrice ? product.salePrice : product.basePrice;
            return total + price;
        }, 0);
    }, [user?.cart]);

    const goToCatalog = () => {
        dispatch(closeModal({ modalId: 'cartModal' }));
        history.push('/catalog')
    }

    const makeOrder = () => {
        dispatch(closeModal({ modalId: 'cartModal' }));
        history.push('/order')
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={user && user?.cart.length > 0 ? `В КОРЗИНЕ ${user?.cart.length} ТОВАРОВ` : "ВАША КОРЗИНА ПУСТА"}>
            {user && user?.cart.length > 0 ?
                <div className="cart-container">
                    {
                        user.cart.map(product => <CartProduct product={product} key={product.id} />)
                    }
                    <div className="cart-place-order">
                        <div className="cart-total-cost">
                            <div className="cart-total-cost-title">
                                Товары<span> на сумму</span>:
                            </div>
                            <div className="cart-total-cost-final">{cartTotal} руб.</div>
                        </div>
                        <div className="cart-order-btn" onClick={makeOrder}>
                            Перейти к оформлению<span>&nbsp;заказа</span>
                        </div>
                    </div>
                </div>
                :
                <div className="cart-container">
                    <div className="cart-blank-message">
                        Корзина ждет, что ее наполнят. Желаем приятных покупок!
                    </div>
                    <div className="cart-place-order">
                        <div className="cart-order-btn" onClick={goToCatalog}>Выбрать товары</div>
                    </div>
                </div>
            }
        </Modal>
    );
};

export default CartModal;
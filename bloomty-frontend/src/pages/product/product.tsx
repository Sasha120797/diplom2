import { useHistory, useParams } from 'react-router-dom';
import './product.css'
import DescBtn from './images/description-btn.svg';
import GiveAHint from './images/give-a-hint.svg';
import { IProduct } from '../../types/Product';
import { useEffect, useMemo, useState } from 'react';
import { ProductRequests } from '../../axios/productRequests';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { addError } from '../../store/errors/errors';
import { addToCart, addToWishlist, removeFromWishlist } from '../../store/user/user';
import { copyToClipboard } from '../../utils';
import { openModal } from '../../store/modal/modal';
import { STATIC_URL, FRONTEND_URL } from '../../config/urls';

const ProductPage = () => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [loadedProduct, setLoadedProduct] = useState<null | IProduct>(null);
    const [showDesc, setShowDesc] = useState(false);
    const { isAuth, user } = useAppSelector(state => state.user)

    useEffect(() => {
        ProductRequests.getProduct(id)
            .then(res => {
                setLoadedProduct(res.data)
            })
            .catch(err => {
                dispatch(addError({
                    code: err.response.data.statusCode || "500",
                    message: err.response.data.message || "Произошла ошибка в приложении",
                    path: err.response.data.path || ""
                }));
                history.replace('/catalog');
            })
    }, [id])

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoChangeActive, setIsAutoChangeActive] = useState(true);

    // Автоматическая смена изображений
    useEffect(() => {
        if (loadedProduct) {
            let interval: NodeJS.Timeout;

            if (isAutoChangeActive) {
                interval = setInterval(() => {
                    setCurrentImageIndex(prev => (prev + 1) % loadedProduct.images.length);
                }, 10000);
            }

            return () => clearInterval(interval);
        }
    }, [isAutoChangeActive, loadedProduct]);

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsAutoChangeActive(false);

        // Возобновляем автоматическую смену через 30 секунд после ручного выбора
        setTimeout(() => setIsAutoChangeActive(true), 30000);
    };

    const toggleShowDesc = () => showDesc ? setShowDesc(false) : setShowDesc(true);

    const isInWishlist = useMemo(() => {
        return isAuth && user?.wishlist.some(item => item.id === id);
    }, [isAuth, user?.wishlist, id]);

    const isInCart = useMemo(() => {
        return isAuth && user?.cart.some(item => item.id === id);
    }, [isAuth, user?.cart, id]);

    const handleAddToWishlist = () => {
        dispatch(addToWishlist(id));
    };

    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(id));
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
            dispatch(addToCart(id))
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
    const openGiveAHintModal = () => {
        dispatch(openModal({ modalId: "giveAHintModal", modalProps: { product_id: id } }))
    }

    return (
        loadedProduct ?
            <div className="product-page-container">
                <div className="inner-container product-page-info">
                    <div className="product-page-navigation">
                        Главная / Каталог / {loadedProduct.category} / <span>{loadedProduct.name}</span>
                    </div>
                    <div className="product-page-description">
                        <div className="product-page-photo">
                            <div className="product-page-photos-small">
                                <img src={`${STATIC_URL}/${loadedProduct.images[0]}`} alt="" className="product-page-photo-small" onClick={() => handleThumbnailClick(0)} />
                                <img src={`${STATIC_URL}/${loadedProduct.images[1]}`} alt="" className="product-page-photo-small" onClick={() => handleThumbnailClick(1)} />
                                <img src={`${STATIC_URL}/${loadedProduct.images[2]}`} alt="" className="product-page-photo-small" onClick={() => handleThumbnailClick(2)} />
                                <img src={`${STATIC_URL}/${loadedProduct.images[3]}`} alt="" className="product-page-photo-small" onClick={() => handleThumbnailClick(3)} />
                                <img src={`${STATIC_URL}/${loadedProduct.images[4]}`} alt="" className="product-page-photo-small" onClick={() => handleThumbnailClick(4)} />
                            </div>
                            <div className="product-page-current-photo">
                                <img src={`${STATIC_URL}/${loadedProduct.images[currentImageIndex]}`} alt="" style={{ transition: 'opacity 0.3s ease' }} />
                            </div>
                        </div>
                        <div className="product-page-info">
                            <div className="product-page-info-title">
                                {loadedProduct.name}
                            </div>
                            <div className="product-page-info-article">
                                Артикул {loadedProduct.sku}
                            </div>
                            <div className="product-page-info-article">
                                Ткань: {loadedProduct.color}
                            </div>
                            <div className="product-page-info-cost">
                                {loadedProduct.onSale ? loadedProduct.salePrice : loadedProduct.basePrice} руб.
                                <div className="product-page-info-cost-give-a-hint-button" onClick={openGiveAHintModal}>
                                    <img src={GiveAHint} alt="" />
                                    Намекнуть
                                </div>
                            </div>
                            {
                                loadedProduct.onSale ?
                                    <div className="product-page-info-base-cost">
                                        {loadedProduct.basePrice} руб.
                                    </div>
                                    : null
                            }
                            <div className={["product-page-info-description", showDesc ? "product-page-info-description--open" : null].join(' ')} onClick={toggleShowDesc}>
                                Описание
                                <img src={DescBtn} alt="" />
                            </div>
                            {showDesc ?
                                <div className="product-page-info-description-text product-page-info-description">
                                    {loadedProduct.description}
                                </div>
                                : null}
                            <div className="product-page-info-buttons">
                                <div className="button-filled product-page-info-button-add-to-cart"
                                    onClick={handleAddToCart}
                                >{isInCart ? "Уже в корзине" : "Добавить в корзину"}</div>
                                <svg
                                    onClick={toggleWishlist}
                                    className={["product-page-info-button-add-to-favourite", isInWishlist ? "product-page-info-button-add-to-favourite--active" : null].join(' ')}
                                    width="30" height="28" viewBox="0 0 30 28"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.4489 3.98995L26.4491 3.9905C27.9384 7.12973 27.3828 10.7376 24.4926 14.829L24.4913 14.8309C22.2038 18.0902 18.9045 21.3627 14.0741 25.2237L14.0729 25.2247C14.0506 25.2425 14.0264 25.25 14.0042 25.25C13.982 25.25 13.9577 25.2425 13.9355 25.2247L13.9344 25.2238C9.09774 21.3558 5.80441 18.0548 3.51486 14.8277C0.616702 10.7368 0.0613417 7.12937 1.55049 3.9905L1.55075 3.98995C2.5664 1.84455 5.55899 0.00819112 9.13985 1.06437C10.85 1.573 12.3467 2.66486 13.3824 4.16683L13.9998 5.06232L14.6173 4.16683C15.653 2.66465 17.15 1.5727 18.8605 1.06416L18.8624 1.06357C22.4298 -0.00772398 25.4318 1.84157 26.4489 3.98995Z"
                                        stroke="#212121" stroke-width="2" />
                                </svg>
                                <svg className="product-page-info-button-share" onClick={() => { copyToClipboard(`${FRONTEND_URL}/product/${id}`) }} width="31" height="31" viewBox="0 0 31 31" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_253_1261)">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M23.2953 7.35712L8.71566 14.6479L7.84766 12.9139L22.4273 5.625L23.2953 7.35712ZM22.4273 25.3759L7.84766 18.087L8.71759 16.3529L23.2973 23.6438L22.4293 25.3759H22.4273Z"
                                            fill="#212121" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M26.1562 9.6875C27.4409 9.6875 28.6729 9.17718 29.5813 8.2688C30.4897 7.36042 31 6.12839 31 4.84375C31 3.55911 30.4897 2.32708 29.5813 1.4187C28.6729 0.510322 27.4409 0 26.1562 0C24.8716 0 23.6396 0.510322 22.7312 1.4187C21.8228 2.32708 21.3125 3.55911 21.3125 4.84375C21.3125 6.12839 21.8228 7.36042 22.7312 8.2688C23.6396 9.17718 24.8716 9.6875 26.1562 9.6875ZM26.1562 31C27.4409 31 28.6729 30.4897 29.5813 29.5813C30.4897 28.6729 31 27.4409 31 26.1562C31 24.8716 30.4897 23.6396 29.5813 22.7312C28.6729 21.8228 27.4409 21.3125 26.1562 21.3125C24.8716 21.3125 23.6396 21.8228 22.7312 22.7312C21.8228 23.6396 21.3125 24.8716 21.3125 26.1562C21.3125 27.4409 21.8228 28.6729 22.7312 29.5813C23.6396 30.4897 24.8716 31 26.1562 31ZM4.84375 20.3438C6.12839 20.3438 7.36042 19.8334 8.2688 18.925C9.17718 18.0167 9.6875 16.7846 9.6875 15.5C9.6875 14.2154 9.17718 12.9833 8.2688 12.075C7.36042 11.1666 6.12839 10.6562 4.84375 10.6562C3.55911 10.6562 2.32708 11.1666 1.4187 12.075C0.510322 12.9833 0 14.2154 0 15.5C0 16.7846 0.510322 18.0167 1.4187 18.925C2.32708 19.8334 3.55911 20.3438 4.84375 20.3438Z"
                                            fill="#212121" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_253_1261">
                                            <rect width="31" height="31" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <div>Загрузка</div>
    );
}

export default ProductPage;
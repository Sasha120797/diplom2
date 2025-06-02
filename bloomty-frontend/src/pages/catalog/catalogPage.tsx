import { useEffect, useState } from 'react';
import './catalogPage.css';
import CatalogBanner from './images/catalog-banner-new.png'
import ProductCard from '../../components/productCard/productCard';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { addError } from '../../store/errors/errors';
import { ProductRequests } from '../../axios/productRequests';
import { setFilter } from '../../store/filters/filters';
import { FILTER_GROUPS } from './filterGroups';
import { IProduct } from '../../types/Product';

const CatalogPage = () => {

    const dispatch = useAppDispatch();
    const { category, color, price, sort, type } = useAppSelector(state => state.productFilters)
    const filters = useAppSelector(state => state.productFilters);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [currentMobileFilterOpen, setCurrentMobileFilterOpen] = useState<null | string>(null);
    const [loadedProducts, setLoadedProducts] = useState<IProduct[]>([]);

    const toggleMobileFilterMenu = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        isMobileFilterOpen ? setIsMobileFilterOpen(false) : setIsMobileFilterOpen(true);
    }

    const stopProp = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    const handleSortChange = (sort: string) => {
        dispatch(setFilter({ sort }));
    };

    useEffect(() => {
        ProductRequests.getProducts({ category, color, price, sort, type })
            .then(res => {
                setLoadedProducts(res.data);
            })
            .catch(err => {
                dispatch(addError({
                    code: err.response.data.statusCode || "500",
                    message: err.response.data.message || "Произошла ошибка в приложении",
                    path: err.response.data.path || ""
                }));
            })
    }, [category, color, price, sort, type])

    const handleFilterChange = (filterName: string, value: string) => {
        dispatch(setFilter({ [filterName]: value }));
    };

    const toggleSubmenu = (filterName: string) => {
        setCurrentMobileFilterOpen(current => current === filterName ? null : filterName);
    };

    return (
        <div className="catalog-container">
            <div className="inner-container catalog-header">
                <div className="catalog-banner">
                    <img src={CatalogBanner} alt="" />
                </div>
                <div className="catalog-navigation">
                    Главная <span> / Каталог</span>
                </div>
                <div className="catalog-title">
                    Каталог
                </div>
                <div className="catalog-description">
                    <p>Швейная фабрика «Лемис» рада представить вам свою коллекцию одежды, созданной с заботой о деталях и любовью к стилю.</p>

                    <p>   В нашем ассортименте — элегантные и практичные модели для повседневной носки и особых случаев.</p>

                    <p>Каждая вещь разрабатывается с учетом современных тенденций и требований к комфорту,
                        чтобы подчеркнуть вашу индивидуальность и обеспечить безупречный внешний вид в любой ситуации.</p>


                    <p> Доверяйте своей одежде — она расскажет о вас лучше слов.</p>

                </div>
            </div>
            <div className="inner-container catalog-row-sort-desktop">
                <div className="catalog-row-sort-desktop-title">
                    Сортировать по:
                </div>
                <div className="catalog-row-sort-desktop-buttons">
                    <div className={["catalog-row-sort-desktop-button", sort == 'all' ? "catalog-row-sort-desktop-button--active" : null].join(' ')}
                        onClick={() => handleSortChange('all')}>Показать все</div>
                    <div className={["catalog-row-sort-desktop-button", sort == 'popularity' ? "catalog-row-sort-desktop-button--active" : null].join(' ')}
                        onClick={() => handleSortChange('popularity')}>По популярности</div>
                    <div className={["catalog-row-sort-desktop-button", sort == 'costUp' ? "catalog-row-sort-desktop-button--active" : null].join(' ')}
                        onClick={() => handleSortChange('costUp')}>По возрастанию цены</div>
                    <div className={["catalog-row-sort-desktop-button", sort == 'costDown' ? "catalog-row-sort-desktop-button--active" : null].join(' ')}
                        onClick={() => handleSortChange('costDown')}>По убыванию цены</div>
                </div>
            </div>
            <div className="inner-container catalog-row-sort-mobile">
                <div className="button-filled catalog-row-sort-mobile-left-btn">
                    Показать все
                </div>
                <div className="catalog-row-sort-mobile-right-btn" id="open-mobile-filter-menu" onClick={toggleMobileFilterMenu}>
                    Фильтры
                    <div className={["mobileMenuFilters-container", isMobileFilterOpen ? " mobileMenuFilters-container--open" : null].join(' ')} id="mobile-filters-menu" onClick={stopProp} >
                        <div className="headerMobileFilters-container">
                            <div className="headerMobile-left">
                                <svg id="close-mobile-filter-menu" className="headerMobile-button" width="20" height="20"
                                    onClick={toggleMobileFilterMenu}
                                    viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L15.737 15.737" stroke="white" stroke-width="2" />
                                    <path d="M1.2627 16L15.9997 1.26304" stroke="white" stroke-width="2" />
                                </svg>
                                <svg className="headerMobile-button" width="20" height="20" viewBox="0 0 26 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_119_466)">
                                        <path
                                            d="M10.4 20.8C4.64 20.8 0 16.16 0 10.4C0 4.64 4.64 0 10.4 0C16.16 0 20.8 4.64 20.8 10.4C20.8 16.16 16.16 20.8 10.4 20.8ZM10.4 1.6C5.52 1.6 1.6 5.52 1.6 10.4C1.6 15.28 5.52 19.2 10.4 19.2C15.28 19.2 19.2 15.28 19.2 10.4C19.2 5.52 15.28 1.6 10.4 1.6Z"
                                            fill="white" />
                                        <path
                                            d="M18.8119 17.6797L26.0001 24.8678L24.8682 25.9997L17.6801 18.8115L18.8119 17.6797Z"
                                            fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_119_466">
                                            <rect width="26" height="26" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="headerMobile-right">
                                <svg className="headerMobile-button" width="20" height="20" viewBox="0 0 26 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 1.625C13.6602 1.625 14.3415 1.75618 15.0439 2.01855C15.7464 2.28092 16.36 2.611 16.8848 3.00879C17.4095 3.40658 17.8411 3.84668 18.1797 4.3291C18.5182 4.81152 18.6875 5.26432 18.6875 5.6875V9.75C18.6875 10.7148 18.4844 11.7897 18.0781 12.9746C17.6719 14.1595 17.071 15.0566 16.2754 15.666C16.14 15.7845 16.0215 15.9242 15.9199 16.085C15.8184 16.2458 15.7464 16.415 15.7041 16.5928C15.6618 16.7705 15.6491 16.9525 15.666 17.1387C15.7507 17.748 16.0638 18.1797 16.6055 18.4336L23.6895 21.7852L23.7402 21.7979L23.8418 21.8359L23.9688 21.9121L24.1084 22.0264L24.2354 22.1914L24.3242 22.4453L24.3496 22.7754V24.3496L1.625 24.375V22.7246C1.625 22.3014 1.85352 21.9883 2.31055 21.7852L9.44531 18.4082C9.98698 18.1543 10.2959 17.7269 10.3721 17.126C10.4482 16.5251 10.2493 16.0384 9.77539 15.666C8.99675 15.0397 8.3916 14.1299 7.95996 12.9365C7.52832 11.7432 7.3125 10.681 7.3125 9.75V5.6875C7.3125 5.12891 7.5918 4.53223 8.15039 3.89746C8.70898 3.2627 9.43685 2.72526 10.334 2.28516C11.2311 1.84505 12.1198 1.625 13 1.625ZM13 0C11.832 0 10.6768 0.283529 9.53418 0.850586C8.3916 1.41764 7.46484 2.14551 6.75391 3.03418C6.04297 3.92285 5.6875 4.80729 5.6875 5.6875V9.75C5.6875 10.8503 5.94564 12.1156 6.46191 13.5459C6.97819 14.9762 7.74414 16.1061 8.75977 16.9355L1.625 20.3125C1.57422 20.3294 1.51497 20.3548 1.44727 20.3887C1.37956 20.4225 1.2526 20.4987 1.06641 20.6172C0.880208 20.7357 0.715169 20.8542 0.571289 20.9727C0.427409 21.0911 0.296224 21.2393 0.177734 21.417C0.0592448 21.5947 0 21.7598 0 21.9121V24.375C0 24.8151 0.156576 25.1917 0.469727 25.5049C0.782878 25.818 1.16797 25.9746 1.625 25.9746H24.375C24.8151 25.9746 25.1917 25.818 25.5049 25.5049C25.818 25.1917 25.9746 24.8151 25.9746 24.375V21.9121C25.9746 21.7428 25.9196 21.5693 25.8096 21.3916C25.6995 21.2139 25.5641 21.0615 25.4033 20.9346C25.2425 20.8076 25.0859 20.6934 24.9336 20.5918C24.7812 20.4902 24.6458 20.4141 24.5273 20.3633L24.375 20.3125L17.291 16.9355C18.3066 16.14 19.0641 15.0397 19.5635 13.6348C20.0628 12.2298 20.3125 10.9349 20.3125 9.75V5.6875C20.3125 5.02734 20.0967 4.35449 19.665 3.66895C19.2334 2.9834 18.679 2.36979 18.002 1.82812C17.3249 1.28646 16.5378 0.846354 15.6406 0.507812C14.7435 0.169271 13.8633 0 13 0Z"
                                        fill="white" />
                                </svg>
                                <svg className="headerMobile-button" width="20" height="20" viewBox="0 0 28 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.4489 3.98995L26.4491 3.9905C27.9384 7.12973 27.3828 10.7376 24.4926 14.829L24.4913 14.8309C22.2038 18.0902 18.9045 21.3627 14.0741 25.2237L14.0729 25.2247C14.0506 25.2425 14.0264 25.25 14.0042 25.25C13.982 25.25 13.9577 25.2425 13.9355 25.2247L13.9344 25.2238C9.09774 21.3558 5.80441 18.0548 3.51486 14.8277C0.616702 10.7368 0.0613417 7.12937 1.55049 3.9905L1.55075 3.98995C2.5664 1.84455 5.55899 0.00819112 9.13985 1.06437C10.85 1.573 12.3467 2.66486 13.3824 4.16683L13.9998 5.06232L14.6173 4.16683C15.653 2.66465 17.15 1.5727 18.8605 1.06416L18.8624 1.06357C22.4298 -0.00772398 25.4318 1.84157 26.4489 3.98995Z"
                                        stroke="white" stroke-width="1.5" />
                                </svg>
                                <svg className="headerMobile-button" width="20" height="20" viewBox="0 0 26 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.0625 8.09703V5.6964C19.0625 4.94834 18.9154 4.2076 18.6296 3.51648C18.3437 2.82536 17.9248 2.1974 17.3967 1.66844C16.8685 1.13948 16.2416 0.719883 15.5515 0.433613C14.8615 0.147342 14.1219 0 13.375 0C12.6281 0 11.8885 0.147342 11.1985 0.433613C10.5084 0.719883 9.88146 1.13948 9.35333 1.66844C8.8252 2.1974 8.40626 2.82536 8.12044 3.51648C7.83461 4.2076 7.6875 4.94834 7.6875 5.6964V11.3928C7.6875 11.6086 7.7731 11.8156 7.92548 11.9682C8.07785 12.1208 8.28451 12.2066 8.5 12.2066C8.71549 12.2066 8.92215 12.1208 9.07452 11.9682C9.2269 11.8156 9.3125 11.6086 9.3125 11.3928V9.72457L17.4375 9.72458V8.09704L9.3125 8.09703V5.6964C9.3125 4.61727 9.74051 3.58234 10.5024 2.81928C11.2642 2.05623 12.2976 1.62754 13.375 1.62754C14.4524 1.62754 15.4858 2.05623 16.2476 2.81928C17.0095 3.58234 17.4375 4.61727 17.4375 5.6964V11.3521C17.4375 11.5679 17.5231 11.7749 17.6755 11.9275C17.8278 12.0801 18.0345 12.1659 18.25 12.1659C18.4655 12.1659 18.6722 12.0801 18.8245 11.9275C18.9769 11.7749 19.0625 11.5679 19.0625 11.3521V9.72457H23.125V24.3725H3.625V9.72457L7.6875 9.72458V8.09704L2 8.09703V24.4457C2 24.8579 2.1635 25.2533 2.45453 25.5448C2.74557 25.8362 3.14029 26 3.55187 26H23.1981C23.6097 26 24.0044 25.8362 24.2955 25.5448C24.5865 25.2533 24.75 24.8579 24.75 24.4457V8.09703H19.0625Z"
                                        fill="white" />
                                </svg>
                            </div>
                        </div>
                        <ul className="mobileMenu-list">
                            {FILTER_GROUPS.map(group => (
                                <li
                                    key={`mobile-${group.name}`}
                                    className={[
                                        'mobileMenu-list--has-submenu mobileMenu-link',
                                        currentMobileFilterOpen === group.name ? 'mobileSubmenu-open' : ''
                                    ].filter(Boolean).join(' ')}
                                >
                                    <div
                                        className="mobileMenu-submenu-toggle"
                                        onClick={() => toggleSubmenu(group.name)}
                                    >
                                        {group.title}
                                    </div>
                                    <ul className="mobileMenu-submenu">
                                        {group.options.map(option => (
                                            <li key={`mobile-${option.value}`} className="catalog-column-sort-mobile-card-button">
                                                <input
                                                    type="radio"
                                                    id={`mobile-${option.value}`}
                                                    name={`mobile-${group.name}`}
                                                    value={option.value}
                                                    checked={filters[group.name as keyof typeof filters] === option.value}
                                                    onChange={() => handleFilterChange(group.name, option.value)}
                                                />
                                                <label htmlFor={`mobile-${option.value}`}>
                                                    {option.label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="inner-container catalog-main-part">
                <div className="catalog-column-sort-desktop">
                    {FILTER_GROUPS.map(group => (
                        <div key={`desktop-${group.name}`} className="catalog-column-sort-desktop-card">
                            <div className="catalog-column-sort-desktop-card-title">
                                {group.title}
                            </div>
                            <div className="catalog-column-sort-desktop-card-buttons">
                                {group.options.map(option => (
                                    <div key={`desktop-${option.value}`} className="catalog-column-sort-desktop-card-button">
                                        <input
                                            type="radio"
                                            id={`desktop-${option.value}`}
                                            name={`desktop-${group.name}`}
                                            value={option.value}
                                            checked={filters[group.name as keyof typeof filters] === option.value}
                                            onChange={() => handleFilterChange(group.name, option.value)}
                                        />
                                        <label htmlFor={`desktop-${option.value}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="catalog-products">
                    {loadedProducts.map(product => <ProductCard product={product} key={product.id} />)}
                </div>
            </div>
        </div>
    )
}

export default CatalogPage;
import Image30 from './images/image30.png';
import Image30M from './images/image-30-m.png';
import Image30S from './images/image-30-s.png';
import Image18 from './images/image18.png';
import Image16 from './images/image-16.png';
// import Image53 from './images/image-53.png';
import Image53 from './images/image-product-girl-1.png';
// import Image29 from './images/image-29.png';
import Image29 from './images/portrait-business-woman_158595-986.jpg';
import ImageNews from './images/image-newslatter-new.png'
import './mainPage.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store/storeHooks';
import { setFilter } from '../../store/filters/filters';

const MainPage = () => {

    const history = useHistory();
    const dispatch = useAppDispatch();

    const openCatalogPageWithFilterProduct = (type: string | null) => {
        dispatch(setFilter({ type: type }));
        history.push('/catalog');
    }

    return (
        <div className="main-page-container">
            <div className="main-page-backgrounds">
                <div className="main-page-block1-bgc"></div>
                <div className="main-page-block2-bgc"></div>
                <div className="main-page-block3-bgc"></div>
                <div className="main-page-block4-bgc"></div>
                <div className="main-page-block5-bgc"></div>
                <div className="main-page-block6-bgc"></div>
                <div className="main-page-block7-bgc"></div>
            </div>
            <div className="main-page-content">
                <div className="main-page-block1-introduction">
                    <div className="main-page-introduction-pic1">
                        <img src={Image30} alt="" className="main-page-introduction-pic1-l" />
                        <img src={Image30M} alt="" className="main-page-introduction-pic1-m" />
                        <img src={Image30S} alt="" className="main-page-introduction-pic1-s" />
                    </div>
                    <div className="main-page-introduction-info">
                        <div className="main-page-introduction-title">
                            Ваш образ —  <span>наша вечная забота и традиция</span>
                        </div>
                        <div className="main-page-introduction-sub-title">
                            Наша миссия — быть частью вашего стиля, дарить радость и вдохновение.
                        </div>
                        <div className="button-filled main-page-introduction-button" onClick={() => openCatalogPageWithFilterProduct(null)}>
                            Смотреть каталог
                        </div>
                    </div>
                    <div className="main-page-introduction-pic2">
                        <img src={Image18} alt="" />
                    </div>
                </div>
                <div className="main-page-block2-promotions inner-container">
                    <div className="main-page-block2-title">
                        АКТУАЛЬНЫЕ АКЦИИ
                    </div>
                    <div className="main-page-block2-description">
                        Ознакомьтесь с актуальными акциями и специальными предложениями. Здесь каждый найдет для себя что-то
                        стоящее.
                    </div>
                </div>
                <div className="main-page-block3-current-promotion inner-container">
                    <div className="main-page-block3-current-promotion-content">
                        <div className="main-page-block3-current-promotion-content-title">
                            Базовая футболка в подарок при покупке от 10000р *
                        </div>
                        <div className="button-filled main-page-block3-current-promotion-content-button" onClick={() => history.push('/catalog')}>
                            Смотреть каталог
                        </div>
                        <div className="main-page-block3-current-promotion-content-additional-conditions">
                            * Сроки проведения акции ограничены
                        </div>
                    </div>
                </div>
                <div className="main-page-block4-about-us inner-container">
                    <div className="main-page-block4-about-us-photo">
                        <img src={Image16} alt="" />
                    </div>
                    <div className="main-page-block4-about-us-info">
                        <div className="main-page-block4-about-us-info-title">О Компании</div>
                        <div className="main-page-block4-about-us-info-paragraph">
                            Основная цель "Лемис" — подчеркнуть вашу индивидуальность и создать гардероб, который будет радовать вас каждый день. Мы стремимся, чтобы наша одежда стала неотъемлемой частью вашего образа, сопровождая вас в самых важных и ярких моментах жизни. Каждое изделие создаётся с заботой о деталях, чтобы оно не только выглядело безупречно, но и служило вам долгие годы.
                        </div>
                        <div className="main-page-block4-about-us-info-paragraph">
                            Мы не делаем ставку на массовое производство, ведь для нас важен каждый клиент и его уникальный стиль. Именно поэтому мы уверены в качестве нашей продукции и предоставляем гарантию на каждую вещь. "Лемис" — это одежда, которая вдохновляет, дарит комфорт и подчёркивает вашу уверенность в себе.
                        </div>
                        <div className="button-border main-page-block4-about-us-info-button" onClick={() => history.push('/about-us')}>
                            Подробнее
                        </div>
                    </div>
                </div>
                <div className="main-page-block5-popular-category inner-container">
                    <div className="main-page-block5-popular-category-title">
                        Популярные Категории
                    </div>
                    <div className="main-page-block5-popular-category-cards">
                        <div className="main-page-block5-popular-category-card">
                            <div className="main-page-block5-popular-category-card-image">
                                <img src={Image53} alt="" />
                                <div className="main-page-block5-popular-category-card-image-category">
                                    Платья
                                </div>
                            </div>
                            <div className="main-page-block5-popular-category-card-description">
                                <span>Платья нашего производства создаются с особой тщательностью, что гарантирует их безупречное качество и долговечность. Мы используем прочные натуральные ткани, а каждая деталь обрабатывается вручную для идеальной посадки и комфортной носки. Выберите своё идеальное платье в нашем каталоге.</span>
                            </div>
                            <div className="button-filled main-page-block5-popular-category-card-button" onClick={() => openCatalogPageWithFilterProduct('Серьги')}>
                                Выбрать платья
                            </div>
                        </div>
                        <div className="main-page-block5-popular-category-card">
                            <div className="main-page-block5-popular-category-card-image">
                                <img src={Image29} alt="" />
                                <div className="main-page-block5-popular-category-card-image-category">
                                    Юбки
                                </div>
                            </div>
                            <div className="main-page-block5-popular-category-card-description">
                                <span>Юбки нашего производства обладают множеством преимуществ. Мы используем прочные натуральные ткани. Каждая модель сшита вручную с вниманием к деталям — от обработки краёв до идеально ровной строчки. Выберите свою идеальную юбку в каталоге и убедитесь сами: качество всегда заметно.</span>

                            </div>
                            <div className="button-filled main-page-block5-popular-category-card-button" onClick={() => openCatalogPageWithFilterProduct('Кольца')}>
                                Выбрать юбки
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-page-block6-newsletter inner-container">
                    <div className="main-page-block6-newsletter-title">
                        Подпишитесь на нашу рассылку
                    </div>
                    <div className="main-page-block6-newsletter-form">
                        <div className="main-page-block6-newsletter-form-inputs">
                            <div className="main-page-block6-newsletter-form-inputs-title">
                                Узнавайте первыми о скидках, новинках и актуальных акциях <span> - подписывайтесь на нашу
                                    новостную рассылку</span>.
                            </div>
                            <div className="main-page-block6-newsletter-form-inputs-content">
                                <div className="field main-page-block6-newsletter-form-inputs-content-input">
                                    <input type="text" placeholder="Ваше имя" />
                                    <div className="line"></div>
                                </div>
                                <div className="field main-page-block6-newsletter-form-inputs-content-input">
                                    <input type="text" placeholder="Ваша электронная почта" />
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="main-page-block6-newsletter-form-inputs-sub-title">
                                Нажимая на кнопку «Подписаться», вы даете согласие на обработку персональных данных и
                                соглашаетесь c <p onClick={()=>history.push('/politica-confidicialnosti')}>политикой конфиденциальности</p>.
                            </div>
                            <div className="button-filled main-page-block6-newsletter-form-inputs-btn">
                                Подписаться
                            </div>
                        </div>
                        <div className="main-page-block6-newsletter-form-image">
                            <img src={ImageNews} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;
import './aboutPage.css';
import logoPng from './images/logo.png';

const AboutPage = () => {
    return (
        <div className="aboutUs-page-container">
            <div className="aboutUs-page-header">
                <div className="inner-container abotUs-page-header-inner">
                    <div className="aboutUs-page-header-navigation">
                        Главная / <span>О нас</span>
                    </div>
                    <div className="aboutUs-page-header-title">О НАС</div>
                    <div className="aboutUs-page-header-sub-title">
                        Наша миссия — подчеркнуть вашу индивидуальность.
                    </div>
                    <div className="aboutUs-page-header-paragraph">
                        История фабрики одежды «Лемис» началась в 2015 году с идеи создавать качественную одежду,
                        которая подчеркивает уникальность каждого клиента. Мы начали с небольшой мастерской и
                        коллекции из нескольких моделей, но уже тогда стремились к безупречному исполнению.
                    </div>
                </div>
            </div>
            <div className="inner-container aboutUs-page-content">
                <div className="aboutUs-page-content-block aboutUs-page-content-image">
                    <img src={logoPng} alt="" />
                </div>
                <div className="aboutUs-page-content-block aboutUs-page-content-paragraph">
                    Уже через год мы запустили онлайн-магазин и начали поставлять нашу одежду по всей стране.
                    Мы следим за трендами, слушаем клиентов и совершенствуем технологии. Сегодня «Лемис» — это
                    сочетание традиций ручного пошива и современного подхода к дизайну.
                </div>
                <div className="aboutUs-page-content-block aboutUs-page-content-paragraph">
                    Мы убеждены, что одежда — это не просто вещь, а отражение личности. Поэтому каждую модель
                    шьём с особым вниманием к деталям: от выбора ткани до аккуратной отделки. Для нас важен каждый
                    клиент, и мы создаём одежду, которая подчеркнёт ваш стиль и будет служить годами.
                </div>
                <div className="aboutUs-page-content-block aboutUs-page-content-paragraph">
                    Мы гордимся тем, что «Лемис» становится частью гардероба уверенных в себе людей. Наша
                    миссия — дарить комфорт, качество и вдохновение через каждую созданную вещь.
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
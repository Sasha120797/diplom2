import { useHistory } from 'react-router-dom';
import '../howOrder/howOrderPage.css'

const PrivacyPolicyPage = () => {

    const history = useHistory();

    return (
        <div className="makeOrder-page-container">
            <div className="makeOrder-page-header">
                <div className="inner-container makeOrder-page-header-inner">
                    <div className="makeOrder-page-header-navigation">
                        Главная / <span>Политика конфиденциальности</span>
                    </div>
                    <div className="makeOrder-page-header-title">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</div>
                </div>
            </div>
            <div className="inner-container makeOrder-page-content">
                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    1. Общие положения
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Настоящая Политика конфиденциальности регулирует порядок сбора, хранения, обработки и передачи персональных данных пользователей сайта. Сайт и его администрация придерживается строгих стандартов конфиденциальности и гарантирует защиту ваших личных данных в соответствии с Федеральным законом Российской Федерации №152-ФЗ «О персональных данных».
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    2. Цели обработки персональных данных
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Персональные данные пользователей собираются и обрабатываются с целью:
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                        <li>Регистрации и авторизации на сайте;</li>
                        <li>Обработки заказов и предоставления услуг;</li>
                        <li>Обеспечения обратной связи с клиентами;</li>
                        <li>Направления рекламных материалов с согласия пользователя;</li>
                        <li>Выполнения требований законодательства РФ.</li>
                    </ul>
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    3. Состав собираемых персональных данных
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Мы можем собирать следующую информацию:
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                        <li>Фамилия, имя, отчество;</li>
                        <li>Email-адрес и номер телефона;</li>
                        <li>Почтовый адрес доставки;</li>
                        <li>Данные о покупках и предпочтениях;</li>
                        <li>IP-адрес и данные cookie для обеспечения работы сайта.</li>
                    </ul>
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    4. Порядок обработки данных
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Все данные обрабатываются на законных основаниях, в том числе с вашего согласия или в рамках исполнения договора. Обработка осуществляется путем сбора, систематизации, хранения, уточнения, использования и передачи данных (в случае необходимости) нашим партнерам и службам доставки.
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    5. Гарантии безопасности
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Администрация сайта принимает все необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Доступ к данным имеют только сотрудники, которым это необходимо для выполнения своих обязанностей.
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    6. Ваши права
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Вы имеете право:
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                        <li>Получить информацию о том, какие ваши данные обрабатываются;</li>
                        <li>Требовать исправления или удаления персональных данных;</li>
                        <li>Отозвать согласие на обработку данных;</li>
                        <li>Обратиться с жалобой в Роспотребнадзор или суд в случае выявления нарушений.</li>
                    </ul>
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-title">
                    7. Контакты
                </div>
                <div className="makeOrder-page-content-block makeOrder-page-content-sub-title">
                    Если у вас возникли вопросы по обработке персональных данных, вы можете связаться с нами:
                    <br />
                    Телефон: +7 (928) 161 00 25
                    <br />
                    Email: bloomty@gmail.com
                </div>

                <div className="makeOrder-page-content-block makeOrder-page-content-description">
                    Используя данный сайт, вы подтверждаете свое согласие с политикой конфиденциальности и условиями обработки персональных данных.
                </div>

                <div className="button-border makeOrder-page-button" onClick={() => history.push('/')}>
                    Вернуться на главную
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
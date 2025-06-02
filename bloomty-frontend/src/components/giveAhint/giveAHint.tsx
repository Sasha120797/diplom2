import { useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import './giveAHint.css';
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/storeHooks";
import { loginUser } from "../../store/user/user";
import { closeModal } from "../../store/modal/modal";
import { ProductRequests } from "../../axios/productRequests";
import { IProduct } from "../../types/Product";
import { addError } from "../../store/errors/errors";
import { STATIC_URL } from '../../config/urls';

interface GiveAHintProps {
    isOpen: boolean;
    onClose: () => void;
    product_id?: string;
}

const GiveAHintModal: React.FC<GiveAHintProps> = ({ isOpen, onClose, product_id }) => {

    const [formData, setFormData] = useState<{ email: string, name: string, from_name: string, from_email: string }>({
        email: '',
        name: '',
        from_name: '',
        from_email: ''
    });

    const [loadedProduct, setLoadedProduct] = useState<null | IProduct>(null);

    const history = useHistory();

    const dispatch = useAppDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (product_id) {
            ProductRequests.getProduct(product_id)
                .then(res => {
                    setLoadedProduct(res.data)
                })
                .catch(err => {
                    dispatch(addError({
                        code: err.response.data.statusCode || "500",
                        message: err.response.data.message || "Произошла ошибка в приложении",
                        path: err.response.data.path || ""
                    }));
                })
        } else {
            ProductRequests.getRandomProduct()
                .then(res => {
                    setLoadedProduct(res.data)
                })
                .catch(err => {
                    dispatch(addError({
                        code: err.response.data.statusCode || "500",
                        message: err.response.data.message || "Произошла ошибка в приложении",
                        path: err.response.data.path || ""
                    }));
                })
        }
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="НАМЕКНУТЬ">
            <div className="give-a-hint-container">
                <div className="give-a-hint-message">
                    <div className="give-a-hint-message-img">
                        <img src={`${STATIC_URL}/${loadedProduct?.images[0]}`} alt="" />
                    </div>
                    <div className="give-a-hint-message-title">
                        Здравствуйте, ________________! Мы узнали о том, что _______________
                        мечтает о таком подарке и решили вам об этом намекнуть.
                    </div>
                </div>
                <div className="give-a-hint-form">
                    <div className="give-a-hint-form-to">
                        <div className="give-a-hint-form-title">Кому</div>
                        <div className="field give-a-hint-form-field">
                            <input type="text" placeholder="Имя" name='name' onChange={handleInputChange} value={formData.name} />
                            <div className="line" />
                        </div>
                        <div className="field give-a-hint-form-field">
                            <input type="text" placeholder="E-mail" name='email' onChange={handleInputChange} value={formData.email} />
                            <div className="line" />
                        </div>
                    </div>
                    <div className="give-a-hint-form-from">
                        <div className="give-a-hint-form-title">От кого</div>
                        <div className="field give-a-hint-form-field">
                            <input type="text" placeholder="Имя" name='from_name' onChange={handleInputChange} value={formData.from_name} />
                            <div className="line" />
                        </div>
                        <div className="field give-a-hint-form-field">
                            <input type="text" placeholder="E-mail" name='from_email' onChange={handleInputChange} value={formData.from_email} />
                            <div className="line" />
                        </div>
                    </div>
                </div>
                <div className="give-a-hint-accept">
                    Нажимая на кнопку «Намекнуть», вы даете согласие на обработку персональных
                    данных и соглашаетесь c <p onClick={()=>history.push('/politica-confidicialnosti')}>политикой конфиденциальности</p>.
                </div>
                <div className="button-filled give-a-hint-btn">Намекнуть</div>
            </div>
        </Modal>
    );
};

export default GiveAHintModal;
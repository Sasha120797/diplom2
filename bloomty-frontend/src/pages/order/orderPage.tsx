import { useState, useMemo, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom"
import PlacingOrderPage from "./placingOrderPage"
import PaymentOrderPage from "./paymentOrderPage";
import { useAppSelector, useAppDispatch } from '../../store/storeHooks'
import { OrderRequests } from "../../axios/orderRequests";
import { addError } from '../../store/errors/errors';
import { resetCart } from "../../store/user/user";
import ThanksOrderPage from "./thanksOrderPage";

const OrderPage = () => {

    const [formData, setFormData] = useState<{ email: string, name: string, surName: string, phone: string, region: string, city: string, street: string, house: string, commentary: string }>({
        name: '',
        surName: '',
        phone: '',
        email: '',
        region: '',
        city: '',
        street: '',
        house: '',
        commentary: ''
    });

    const { isAuth, user } = useAppSelector(state => state.user)

    const history = useHistory();
    const dispatch = useAppDispatch();

    const cartTotalPrice = useMemo(() => {
        if (!user?.cart || user.cart.length === 0) return 0;

        return user.cart.reduce((total, product) => {
            const price = product.onSale && product.salePrice ? product.salePrice : product.basePrice;
            return total + price;
        }, 0);
    }, [user?.cart]);

    const cartTotalPriceWithoutSale = useMemo(() => {
        if (!user?.cart || user.cart.length === 0) return 0;

        return user.cart.reduce((total, product) => {
            return total + product.basePrice;
        }, 0);
    }, [user?.cart]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (user && user.cart.length == 0) {
            history.push('/catalog');
        }
    }, [])

    const [dirPath, setDirPath] = useState('/');

    const createOrder = () => {
        OrderRequests.createOrder({
            address: `${formData.region} ${formData.city} ${formData.street} ${formData.house}`,
            comment: formData.commentary,
            productIds: user && user.cart.map(product => product.id) || []
        })
            .then(() => {
                dispatch(resetCart());
                setDirPath('/payment');
                history.push('/order/thanks');
            })
            .catch(err => {
                dispatch(addError({
                    code: err.response.data.statusCode || "500",
                    message: err.response.data.message || "Произошла ошибка в приложении",
                    path: err.response.data.path || ""
                }));
                history.push('/order')
            })
    }

    return (
        <Switch>
            <Route path={'/order'} exact>
                <PlacingOrderPage formData={formData} handleInputChange={handleInputChange} setDirPath={setDirPath} />
            </Route>
            <Route path={'/order/payment'} exact>
                <PaymentOrderPage dirPath={dirPath} cartTotalPrice={cartTotalPrice} cartTotalPriceWithoutSale={cartTotalPriceWithoutSale} createOrder={createOrder} />
            </Route>
            <Route path={'/order/thanks'} exact>
                <ThanksOrderPage dirPath={dirPath} />
            </Route>
        </Switch>
    )
}

export default OrderPage;

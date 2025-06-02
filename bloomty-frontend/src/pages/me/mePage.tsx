import { useMemo } from 'react';
import { useFetchOrders } from '../../hooks';
import { useAppSelector } from '../../store/storeHooks';
import './mePage.css';

const statusesToRussianDict: Record<OrderStatus, string> = {
    delivered: "Доставлен",
    created: "Создан",
    shipped: "Отправлен"
}

type OrderStatus = 'created' | 'delivered' | 'shipped' | string;

const statusToCss: Record<OrderStatus, string> = {
    created: "processing",
    delivered: "delivered",
    shipped: "shipped"
} as const;

const MePage = () => {

    const { user } = useAppSelector(state => state.user);

    const memoizedOrderIds = useMemo(() => user?.orders.map(order => order.id) || [], [user]);

    const { orders } = useFetchOrders(memoizedOrderIds);

    return (
        <div className="user-page-container">
            <div className="user-page-header">
                <div className="inner-container user-page-header-inner">
                    <div className="user-page-header-navigation">
                        Главная / <span>Пользователь</span>
                    </div>
                    <div className="user-page-header-title">{user?.fullname}</div>
                    <div className="user-page-info">
                        <p>E-mail: {user?.email}</p>
                        <p>Телефон: {user?.phone}</p>
                    </div>
                </div>
            </div>
            <div className="inner-container user-page-orders">
                <h2 className="user-order-table-title">Мои заказы</h2>
                <table className="user-order-table">
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Товары</th>
                            <th>Статус</th>
                            <th>Комментарий</th>
                            <th>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr key={order.id}>
                                    <td data-label="Номер">
                                        <span className="user-order-table-number">
                                            {order.id}
                                        </span>
                                    </td>
                                    <td data-label="Товары" className="user-order-table-products">
                                        {order.products.map(product => (<p key={product.id}>{product.name}</p>))}
                                    </td>
                                    <td data-label="Статус">
                                        <span className={`user-order-table-status user-order-table-status-${statusToCss[order.status]}`}>
                                            {statusesToRussianDict[order.status]}
                                        </span>
                                    </td>
                                    <td data-label="Комментарий" className="user-order-table-comment">
                                        {order.comment || "-"}
                                    </td>
                                    <td data-label="Дата" className="user-order-table-date">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default MePage;

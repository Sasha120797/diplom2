import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Typography,
    message
} from 'antd';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

// Возможные статусы
const statusOptions = [
    { value: 'created', label: 'Создан' },
    { value: 'shipped', label: 'Отправлен' },
    { value: 'delivered', label: 'Доставлен' },
];

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [form] = Form.useForm();

    // Получаем заказы
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:3000/order/getadmin');
                setOrders(res.data);
                setLoading(false);
            } catch (error) {
                message.error('Ошибка загрузки заказов');
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Открытие модального окна
    const showModal = (record) => {
        setCurrentOrder(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Сохранение изменений
    const handleSave = async (values) => {
        try {
            await axios.post('http://localhost:3000/order/updateadmin', values);
            message.success('Заказ успешно обновлён');

            // Обновляем список
            const updatedOrders = orders.map((order) =>
                order.id === values.id ? { ...order, ...values } : order
            );
            setOrders(updatedOrders);

            setIsModalOpen(false);
        } catch (error) {
            message.error('Не удалось сохранить изменения');
        }
    };

    // Колонки таблицы
    const columns = [
        {
            title: 'ID заказа',
            dataIndex: 'id',
            key: 'id',
            ellipsis: true,
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Пользователь',
            dataIndex: ['user', 'fullname'],
            key: 'user',
            render: (_, record) => (
                <div>
                    <strong>{record.user.fullname}</strong>
                    <br />
                    <small>{record.user.email}</small>
                </div>
            ),
        },
        {
            title: 'Адрес доставки',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return {
                    created: 'Создан',
                    shipped: 'Отправлен',
                    delivered: 'Доставлен',
                }[status];
            },
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            ellipsis: true,
        },
        {
            title: 'Товары',
            dataIndex: 'products',
            key: 'products',
            render: (products) =>
                products.map((prod) => (
                    <div key={prod.id}>
                        <strong>{prod.name}</strong> ({prod.sku})
                    </div>
                )),
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (_, record) => (
                <Button type="link" onClick={() => showModal(record)}>
                    Редактировать
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={orders}
                columns={columns}
                loading={loading}
                rowKey="id"
            />

            {/* Модалка редактирования */}
            <Modal
                title="Редактировать заказ"
                visible={isModalOpen}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Сохранить"
                cancelText="Отмена"
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Адрес доставки" name="address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Комментарий" name="comment">
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Статус" name="status" rules={[{ required: false }]}>
                        <Select defaultValue="created">
                            {statusOptions.map((opt) => (
                                <Option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Отзыв" name="review">
                        <TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default OrderTable;
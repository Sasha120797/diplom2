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
import { ORDERS_URL } from '../config/urls';

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
                const res = await axios.get(`${ORDERS_URL}/getadmin`);
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
            await axios.post(`${ORDERS_URL}/updateadmin`, values);
            message.success('Заказ успешно обновлён');
            setIsModalOpen(false);
            // Обновляем список заказов
            const res = await axios.get(`${ORDERS_URL}/getadmin`);
            setOrders(res.data);
        } catch (error) {
            message.error('Ошибка при обновлении заказа');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const option = statusOptions.find(opt => opt.value === status);
                return option ? option.label : status;
            }
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            render: (text) => text || '-'
        },
        {
            title: 'Отзыв',
            dataIndex: 'review',
            key: 'review',
            render: (text) => text || '-'
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    Редактировать
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                loading={loading}
            />

            <Modal
                title="Редактировать заказ"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSave}
                    layout="vertical"
                >
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default OrderTable;
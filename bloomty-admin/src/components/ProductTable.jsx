import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { getProducts, deleteProduct } from '../api';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            message.error('Ошибка при загрузке товаров');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            message.success('Товар удален');
            fetchProducts();
        } catch (error) {
            message.error('Ошибка при удалении товара');
        }
    };

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Артикул',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Базовая цена',
            dataIndex: 'basePrice',
            key: 'basePrice',
            render: (price) => `${price} ₽`,
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: 200,
        },
        {
            title: 'Материал',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'На скидке',
            dataIndex: 'onSale',
            key: 'onSale',
            render: (onSale) => (onSale ? 'Да' : 'Нет'),
        },
        {
            title: 'Хит продаж',
            dataIndex: 'isFeatured',
            key: 'isFeatured',
            render: (isFeatured) => (isFeatured ? 'Да' : 'Нет'),
        },
        {
            title: 'Скидочная цена',
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (price) => (price ? `${price} ₽` : '-'),
        },
        {
            title: 'Изображения',
            dataIndex: 'images',
            key: 'images',
            render: (images) =>
                images?.length > 0 ? (
                    <div style={{}}>
                        <div style={{
                            display: 'flex', gap: 4,
                        }}>
                            {images.slice(0, 3).map((img, i) => (
                                <img key={i} src={`http://localhost:3000/static/${img}`} alt="product" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                            ))}
                        </div>
                        {images.length > 3 && <span>+{images.length - 3}</span>}
                    </div >
                ) : (
                    'Нет фото'
                ),
        },
        {
            title: 'Просмотры',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedProduct(record);
                            setIsEditModalVisible(true);
                        }}
                        style={{ marginRight: 8 }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </>
            ),
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setIsAddModalVisible(true)}>
                    Добавить товар
                </Button>
            </div>

            <Table dataSource={products} columns={columns} loading={loading} rowKey="id" />

            <AddProductModal
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onAddSuccess={fetchProducts}
            />

            {selectedProduct && (
                <EditProductModal
                    visible={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    product={selectedProduct}
                    onUpdateSuccess={fetchProducts}
                />
            )}
        </>
    );
};

export default ProductTable;
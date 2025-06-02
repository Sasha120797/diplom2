import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Switch, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateProduct } from '../api';
import { message } from 'antd';

const { Option } = Select;

const EditProductModal = ({ visible, onClose, product, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onSale = Form.useWatch('onSale', form);

  useEffect(() => {
    if (visible && product) {
      form.setFieldsValue({
        name: product.name,
        sku: product.sku,
        basePrice: product.basePrice,
        category: product.category,
        description: product.description,
        color: product.color,
        onSale: product.onSale,
        isFeatured: product.isFeatured,
        salePrice: product.salePrice,
      });
    }
  }, [visible, product, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();

      // Добавляем id и остальные данные
      formData.append('id', product.id);
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      // Добавляем новые изображения, если они есть
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('pictures', file.originFileObj);
        }
      });

      setLoading(true);
      await updateProduct(product.id, formData);
      message.success('Товар успешно обновлён');
      form.resetFields();
      setFileList([]);
      onUpdateSuccess();
      onClose();
    } catch (error) {
      message.error('Ошибка при обновлении товара');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidType = file.type.startsWith('image/');
      if (!isValidType) {
        message.error('Можно загружать только изображения');
        return false;
      }
      return false;
    },
    onChange: ({ fileList }) => {
      const safeFileList = Array.isArray(fileList) ? fileList : [];
      setFileList(safeFileList.slice(0, 5));
    },
    fileList: Array.isArray(fileList) ? fileList : [],
    multiple: true,
    listType: 'picture',
    showUploadList: true,
    accept: 'image/*',
  };

  return (
    <Modal
      title="Редактировать товар"
      open={visible}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        onClose();
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Артикул" name="sku" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Базовая цена"
          name="basePrice"
          rules={[{ required: true, type: 'number', min: 1, message: 'Введите число больше 0' }]}
          normalize={(value) => Number(value)}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Категория" name="category" rules={[{ required: true }]}>
          <Select placeholder="Выберите категорию">
            <Option value="Платья">Платья</Option>
            <Option value="Юбки">Юбки</Option>
            <Option value="Брюки">Брюки</Option>
            <Option value="Рубашки">Рубашки</Option>
            <Option value="Футболки">Футболки</Option>
            <Option value="Свитера">Свитера</Option>
            <Option value="Верхняя одежда">Верхняя одежда</Option>
            <Option value="Другое">Другое</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Описание" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Цвет" name="color" rules={[{ required: true }]}>
          <Select placeholder="Выберите материал">
            <Option value="Велюр">Велюр</Option>
            <Option value="Хлопок">Хлопок</Option>
            <Option value="Лен">Лен</Option>
            <Option value="Шелк">Шелк</Option>
            <Option value="Синтетика">Синтетика</Option>
          </Select>
        </Form.Item>

        <Form.Item label="На скидке" name="onSale" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Хит продаж" name="isFeatured" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label="Скидочная цена"
          name="salePrice"
          rules={[{ type: 'number', min: 1, message: 'Введите число больше 0' }]}
          normalize={(value) => Number(value)}
        >
          <Input type="number" disabled={!onSale} />
        </Form.Item>

        <Form.Item label="Загрузить новые фото (до 5)">
          <Upload {...uploadProps} maxCount={5}>
            <Button icon={<UploadOutlined />}>Выбрать фото</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
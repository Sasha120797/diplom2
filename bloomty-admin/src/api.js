// api.js

import axios from 'axios';
import { PRODUCTS_URL } from './config/urls';

export const getProducts = async () => {
  const res = await axios.get(PRODUCTS_URL);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await axios.post(`${PRODUCTS_URL}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateProduct = async (id, data) => {
  // Проверяем, это FormData или нет
  const isFormData = data instanceof FormData;

  const res = await axios.post(
    `${PRODUCTS_URL}/update`,
    isFormData ? data : { id, ...data },
    isFormData
      ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      : {}
  );

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.get(`${PRODUCTS_URL}/delete/${id}`);
  return res.data;
};
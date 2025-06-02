// api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/product';

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await axios.post(`${API_URL}/create`, formData, {
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
    `${API_URL}/update`,
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
  const res = await axios.get(`${API_URL}/delete/${id}`);
  return res.data;
};
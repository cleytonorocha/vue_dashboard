import axios from 'axios';

const API_URL = "http://localhost:8080" + "/products";

export const getAllProducts = () => {
    return axios.get(API_URL)
        .then(response => response.data)
        .catch(error => {
            console.error('There was an error fetching the products!', error);
            throw error;
        });
};

export const getProductById = (productId) => {
    return axios.get(`${API_URL}/${productId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`There was an error fetching the product with ID ${productId}!`, error);
            throw error;
        });
};

export const createProduct = (productData) => {
    return axios.post(API_URL, productData)
        .then(response => response.data)
        .catch(error => {
            console.error('There was an error creating the product!', error);
            throw error;
        });
};

export const updateProduct = (productId, productData) => {
    return axios.put(`${API_URL}/${productId}`, productData)
        .then(response => response.data)
        .catch(error => {
            console.error(`There was an error updating the product with ID ${productId}!`, error);
            throw error;
        });
};

export const deleteProduct = (productId) => {
    return axios.delete(`${API_URL}/${productId}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`There was an error deleting the product with ID ${productId}!`, error);
            throw error;
        });
};

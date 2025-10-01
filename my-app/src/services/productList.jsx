import { deleteAPI, get, patch } from "../utils/request";

export const getProductList = async () => {
    const result = await get("products");
    return result;
}

export const getCreateProduct = async (data) => {
    const result = await post("products", data);
    return result;
}

export const getDeleteProduct = async (id) => {
    const result = await deleteAPI(`products/${id}`);
    return result;
}

export const getEditProduct = async (id, data) => {
    const result = await patch(`products/${id}`, data);
    return result;
}
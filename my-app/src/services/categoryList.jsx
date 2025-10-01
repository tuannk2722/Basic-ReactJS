import { get } from "../utils/request";

export const getCategoryList = async () => {
    const result = get("products");
    return result;
}
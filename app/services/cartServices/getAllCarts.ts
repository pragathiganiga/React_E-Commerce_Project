import { APIServices } from "../APIServices";
import { APIConstants } from "../APIConstants";

export const getAllCarts = async () => {
  return await APIServices.get(APIConstants.CARTS);
};

export const getProductDetails = async (productId: number) => {
  return await APIServices.get(`${APIConstants.PRODUCT_DETAILS}${productId}`);
};

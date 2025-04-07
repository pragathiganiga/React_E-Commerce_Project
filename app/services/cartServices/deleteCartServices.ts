import { APIServices } from "../APIServices";
import { APIConstants } from "../APIConstants";

export const deleteCartItem = async (cartId: number) => {
  return await APIServices.delete(APIConstants.DELETE_CART(cartId));
};

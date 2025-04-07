import { APIServices } from '../APIServices';
import { APIConstants } from '../APIConstants';

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const cartData = {
    userId,
    date: new Date().toISOString(),
    products: [{ productId, quantity }]
  };

  return await APIServices.post(APIConstants.CARTS, cartData);
};

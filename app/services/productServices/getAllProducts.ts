// services/productServices/getAllProducts.ts
import { APIServices } from '../APIServices';
import { APIConstants } from '../APIConstants';

export const getAllProducts = async () => {
  try {
    const data = await APIServices.get(APIConstants.PRODUCT_DETAILS);
    return data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

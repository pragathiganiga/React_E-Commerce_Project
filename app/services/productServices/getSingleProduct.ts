import { APIServices } from '../APIServices';
import { APIConstants } from '../APIConstants';

export const getSingleProduct = async (id: number) => {
  return await APIServices.get(`${APIConstants.PRODUCT_DETAILS}${id}`);
};

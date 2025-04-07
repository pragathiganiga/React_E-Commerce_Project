export const APIConstants = {
  PRODUCT_LIST: '/products', // Fetch all products
  PRODUCT_DETAILS: '/products/', // Fetch single product
  CARTS: '/carts', // Fetch all carts
  ADD_TO_CART: '/carts', // Add a new cart
  DELETE_CART: (id: number) => `/carts/${id}` // Delete a cart by ID
};

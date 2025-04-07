import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';

export const APIServices = {
  // GET Request
  get: async (endpoint: string): Promise<any> => {
    try {
      const url = `${baseURL}${endpoint}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`GET request failed: ${endpoint}`, error);
      return null;
    }
  },

  // POST Request
  post: async (endpoint: string, data: any): Promise<any> => {
    try {
      const url = `${baseURL}${endpoint}`;
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error(`POST request failed: ${endpoint}`, error);
      return null;
    }
  },

  // DELETE Request
  delete: async (endpoint: string): Promise<any> => {
    try {
      const url = `${baseURL}${endpoint}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      console.error(`DELETE request failed: ${endpoint}`, error);
      return null;
    }
  }
};

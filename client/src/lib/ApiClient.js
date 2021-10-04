import axios from "axios";

const apiClient = {
  async fetchProducts(callback) {
    try {
      const products = (await axios.get("/api/products")).data;
      callback(products);
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiClient;

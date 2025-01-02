import IndexedDbConnection from /* webpackChunkName: "IndexedDbConnection" */ "./IndexedDbConnection";

class IndexedDbRepository {
  _constructor() {
    this.connection = new IndexedDbConnection(
      "http://localhost:8080",
      "products",
      1,
      "admin",
      "admin"
    );
  }

  async saveProduct(product) {

    this.connection.disconnect();
  }
  async getProductById(id) {
    let transaction = this.connection.transaction("products", "readonly");
    let objectStore = transaction.objectStore("products");
    return new Promise((resolve, reject) => {
      let request = objectStore.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
        this.connection.disconnect();
      };
    });
  }

  async getAllProducts() {
    let transaction = this.connection.transaction("products", "readonly");
    let objectStore = transaction.objectStore("products");
    return new Promise((resolve, reject) => {
      let request = objectStore.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
        this.connection.disconnect();
      };
    });
  }

  async deleteProductById(id) {
    let connection = await this.connection.connect();
    let transaction = connection.transaction("products", "readwrite");
    let objectStore = transaction.objectStore("products");
    return new Promise((resolve, reject) => {
      let request = objectStore.delete(id);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  async updateProduct(product) {
    let connection = await this.connection.connect();
    let transaction = connection.transaction("products", "readwrite");
    let objectStore = transaction.objectStore("products");
    return new Promise((resolve, reject) => {
      let request = objectStore.put(product);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
        this.connection.disconnect();
      };
    });
  }
}

export default IndexedDbRepository;

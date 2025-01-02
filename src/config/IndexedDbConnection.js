class IndexedDbConnection {
  constructor(URL, dbName, dbVersion, dbUser, dbPassword) {
    this.connection = null;
    this.URL = URL;
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.dbUser = dbUser;
    this.dbPassword = dbPassword;
    this.objectStore = null;
  }

  async connect() {
    // Connect to the database
    // Return a connection object
    this.getInstance();
  }

  async getInstance() {
    // Connect to the database
    // Return a connection object
    if (this.connection) {
      return this.connection;
    }
    let db = window.indexedDB.open(this.dbName, this.dbVersion);
    db.onsuccess = (event) => {
      this.connection = event.target.result;
      this.objectStore = this.connection
        // Force the object to have an id property
        .createObjectStore("products", { keyPath: "id", autoIncrement: true })
        // Create an index for the name property
        .createIndex("nameIndex", "name", { unique: false });
    };
    db.onerror = (event) => {
      console.error("Database error: " + event.target.errorCode);
      this.disconnect();
    };

    // db.onupgradeneeded = (event) => {
    //   let db = event.target.result;
    //   let objectStore = db.createObjectStore("users", { keyPath: "id" });
    //   objectStore.createIndex("name", "name", { unique: false });
    //   objectStore.createIndex("email", "email", { unique: true });
    // };
  }
  async disconnect() {
    // Disconnect from the database
    this.connection = null;
  }
}
export default IndexedDbConnection;

<template>
  <div id="data" class="container-fluid p-4">
    <el-table
      :data="
        products.filter(
          (product) =>
            !search || product.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      style="width: 100%; font-size: 16px"
      max-height="250"
      height="500"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        min-width="200"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="Category"
        min-width="150"
      ></el-table-column>
      <el-table-column prop="stock" label="Stock" width="100"></el-table-column>
      <el-table-column
        prop="rating"
        label="Rating"
        width="100"
      ></el-table-column>
      <el-table-column prop="price" label="Price" width="150"></el-table-column>

      <el-table-column align="right" width="200">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"
            clearable
          />
        </template>

        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="editProduct(scope.row)"
          >
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteProduct(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
export default {
  name: "DataComponent",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Produto 1",
          category: "Electronics",
          stock: 25,
          rating: 4.5,
          price: 100,
        },
        {
          id: 2,
          name: "Produto 2",
          category: "Clothing",
          stock: 15,
          rating: 4.0,
          price: 200,
        },
        {
          id: 3,
          name: "Produto 3",
          category: "Books",
          stock: 50,
          rating: 5.0,
          price: 300,
        },
      ],
      search: "",
    };
  },
  methods: {
    editProduct(product) {
      console.log("Edit product:", product);
      // Lógica para editar o produto
    },
    deleteProduct(product) {
      console.log("Delete product:", product);
      // Lógica para excluir o produto
      this.products = this.products.filter((p) => p.id !== product.id);
    },
  },
};
</script>
  
  <style scoped>
.container-fluid {
  padding: 20px;
  background-color: #f9f9f9;
}
.el-button {
  margin: 0 5px;
}
.el-table {
  border: 1px solid #ddd;
}
</style>
  
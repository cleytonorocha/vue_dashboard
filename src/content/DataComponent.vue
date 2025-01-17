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
            @click="confirmDelete(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Warning"
      :visible.sync="excludeDialog"
      width="30%"
      center
    >
      <span>Are you sure you want to delete this product?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="excludeDialog = false">Cancel</el-button>
        <el-button
          type="danger"
          @click="deleteProduct"
        >
          Confirm
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProducts, deleteProduct as deleteProductService } from "@/service/ProductService";

export default {
  name: "DataComponent",
  data() {
    return {
      products: [],
      search: "",
      excludeDialog: false,
      productToDelete: null, 
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const data = await getAllProducts();
        this.products = data.content;
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },
    editProduct(product) {
      console.log("Edit product:", product);
    },
    confirmDelete(product) {
      this.productToDelete = product; 
      this.excludeDialog = true;
    },
    deleteProduct() {
      if (this.productToDelete) {
        this.products = this.products.filter(
          (product) => product.id !== this.productToDelete.id
        );
        deleteProductService(this.productToDelete.id);
        this.productToDelete = null; 
        this.excludeDialog = false; 
      }
    },
  },
};
</script>

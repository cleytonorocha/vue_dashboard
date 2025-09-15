<template>
  <div id="data" class="container-fluid p-4">
    <!-- Table -->
    <el-table :data="products.filter(
      (product) =>
        !search || product.name.toLowerCase().includes(search.toLowerCase())
    )" stripe style="width: 100%; font-size: 16px">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="Name" min-width="200"></el-table-column>
      <el-table-column prop="category" label="Category" min-width="150"></el-table-column>
      <el-table-column prop="stock" label="Stock" width="100"></el-table-column>
      <el-table-column prop="rating" label="Rating" width="100"></el-table-column>
      <el-table-column prop="price" label="Price" width="150"></el-table-column>

      <el-table-column align="right" width="200">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" clearable />
        </template>

        <template #default="scope">
          <el-button size="small" type="primary" @click="openEditDialog(scope.row)">
            Edit
          </el-button>
          <el-button size="small" type="danger" @click="confirmDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <el-pagination class="text-center my-5" background layout="sizes, prev, pager, next" :total="pagination.total" size
      :page-sizes="pageSizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!-- Delete Dialog -->
    <el-dialog title="Warning" :visible.sync="excludeDialog" width="30%" center>
      <span>Are you sure you want to delete this product?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="excludeDialog = false">Cancel</el-button>
        <el-button type="danger" @click="deleteProduct">
          Confirm
        </el-button>
      </span>
    </el-dialog>

    <!-- Edit Dialog -->
    <el-dialog title="Edit Product" :visible.sync="editDialog" width="50%" center>
      <el-form :model="editForm" ref="editFormRef" label-position="top" class="row">
        <el-form-item label="Name" prop="name" class="col-12">
          <el-input v-model="editForm.name" />
        </el-form-item>

        <el-form-item label="Category" prop="category" class="col-12 col-md-4">
          <el-select v-model="editForm.category" placeholder="Select category">
            <el-option v-for="category in categories" :key="category.key" :label="category.description"
              :value="category.key" />
          </el-select>
        </el-form-item>

        <el-form-item label="Status" prop="status" class="col-12 col-md-4">
          <el-select v-model="editForm.status" placeholder="Select status">
            <el-option v-for="status in statusList" :key="status.key" :label="status.description" :value="status.key" />
          </el-select>
        </el-form-item>

        <el-form-item label="Stock" prop="stock" class="col-12 col-md-4">
          <el-input v-model.number="editForm.stock" type="number" min="0" />
        </el-form-item>

        <el-form-item label="Rating" prop="rating" class="col-12 col-md-4">
          <el-input v-model.number="editForm.rating" type="number" min="0" max="5" step="0.1" />
        </el-form-item>

        <el-form-item label="Price" prop="price" class="col-12 col-md-4">
          <el-input v-model.number="editForm.price" type="number" min="0.01" step="0.01" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="editDialog = false">Cancel</el-button>
        <el-button type="primary" @click="saveEdit">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getAllProducts, deleteProduct, updateProduct, listCategory, listStatus } from "@/service/ProductService";

export default {
  name: "DataComponent",
  data() {
    return {
      products: [],
      search: "",
      pagination: {
        page: 0,
        linesPerPage: 10,
        orderBy: 'id',
        direction: 'ASC',
      },
      pageSizes: [10, 50, 100],
      excludeDialog: false,
      productToDelete: null,

      editDialog: false,
      editForm: {},
      categories: [],
      statusList: [],
    };
  },

  mounted() {
    this.loadProducts();
    this.loadCategories();
    this.loadStatus();
  },

  methods: {
    async loadProducts() {
      try {
        const data = await getAllProducts(this.pagination);
        this.products = data.content;
        this.pagination = {
          ...this.pagination,
          page: data.pageable.pageNumber,
          perPage: data.size,
          total: data.totalElements,
          totalPages: data.totalPages
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },

    async loadCategories() {
      const { data } = await listCategory();
      this.categories = data;
    },

    async loadStatus() {
      const { data } = await listStatus();
      this.statusList = data;
    },

    confirmDelete(product) {
      this.productToDelete = product;
      this.excludeDialog = true;
    },

    deleteProduct() {
      if (this.productToDelete) {
        deleteProduct(this.productToDelete.id);
        this.products = this.products.filter(p => p.id !== this.productToDelete.id);
        this.productToDelete = null;
        this.excludeDialog = false;
      }
    },

    openEditDialog(product) {
      this.editForm = { ...product };
      this.editDialog = true;
    },

    async saveEdit() {
      try {
        await updateProduct(this.editForm.id, this.editForm);
        await this.loadProducts();
        this.editDialog = false;
        this.$message.success("Product updated successfully!");
      } catch (error) {
        console.error("Failed to update product:", error);
        this.$message.error("Failed to update product.");
      }
    },

    handleSizeChange(val) {
      this.pagination.linesPerPage = val;
      this.loadProducts();
    },

    handleCurrentChange(val) {
      this.pagination.page = val - 1;
      this.loadProducts();
    },
  },
};
</script>

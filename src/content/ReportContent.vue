<template>
  <div id="report">
    <div class="row d-flex justify-content-around py-4">
      <card-template
        v-for="(item, index) in defaults"
        :key="index"
        @click.native="openDialog(item, item.configIndex)"
      >
        <template v-slot:card-title>
          <h2>{{ item.nameHeader }}</h2>
        </template>

        <template v-slot:card-content>
          <img src="image source" class="img-fluid rounded-top" alt="" />
        </template>
      </card-template>
    </div>

    <el-button
      v-loading.fullscreen.lock="submitLoading"
      v-if="false"
    ></el-button>

    <dialog-template
      ref="DialogTemplate"
      @handleDialogSubmit="handleDialogSubmit"
      @closeDialog="configIndex = null"
    />
  </div>
</template>

<script>
import CardTemplate from "@/templates/CardTemplate.vue";
import DialogTemplate from "@/templates/DialogTemplate.vue";
import { listCategory, listStatus } from "@/service/ProductService";
import { generateProductsReport } from "@/service/ReportService";

export default {
  name: "ReportContent",
  components: { CardTemplate, DialogTemplate },
  mounted: async function () {
    this.categoryList = await listCategory().then((t) => t.data);
    this.statusList = await listStatus().then((t) => t.data);
  },
  data() {
    return {
      configIndex: null,
      categoryList: [],
      statusList: [],
      config: [
        {
          name: "ProductsReport",
          fields: [
            {
              name: "name",
              label: "Name",
              type: "text",
              placeholder: "Enter the name",
            },
            {
              name: "productCategory",
              label: "Category",
              type: "select",
              categoryList: [],
            },
            {
              name: "productStatus",
              label: "Status",
              type: "select",
              options: [],
            },
            {
              name: "minPrice",
              label: "Minimum Price",
              type: "number",
              placeholder: "Enter minimum price",
            },
            {
              name: "maxPrice",
              label: "Maximum Price",
              type: "number",
              placeholder: "Enter maximum price",
            },
          ],
        },
      ],

      defaults: [
        {
          nameHeader: "Products Report",
          name: "Product 1",
          productCategory: "",
          productStatus: "",
          minPrice: 10,
          maxPrice: 50,
          configIndex: 0,
        },
      ],
    };
  },
  methods: {
    openDialog(itemData, configIndex) {
      const fields = this.config[configIndex].fields.map((f) => {
        switch (f.name) {
          case "productCategory":
            return { ...f, options: this.categoryList };
          case "productStatus":
            return { ...f, options: this.statusList };
          default:
            return f;
        }
      });

      this.configIndex = configIndex;

      this.$refs.DialogTemplate.openDialog({
        data: { ...itemData },
        fields,
        config: { title: this.config[configIndex].name, width: "80%" },
      });
    },
    async handleDialogSubmit(formData, type) {
      this.$refs.DialogTemplate.submitLoading = true;
      try {
        switch (this.configIndex) {
          case 0:
            await generateProductsReport(formData, type);
            break;
        }
      } finally {
        this.$refs.DialogTemplate.submitLoading = false;
      }
    },
  },
};
</script>

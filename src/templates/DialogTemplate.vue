<template>
  <el-dialog
    :title="configDialog.title || 'Dialog'"
    :width="configDialog.width || '30%'"
    :visible.sync="visible"
    :before-close="closeDialog"
    append-to-body
    v-loading.fullscreen.lock="submitLoading"
  >
    <el-form :model="formData" label-position="top" class="row g-3">
      <el-form-item
        v-for="(field, index) in fields"
        :key="index"
        :label="field.label || field.name"
        :prop="field.name"
        :class="field.class"
        class="col-12 col-lg-6"
      >
        <el-input
          v-if="field.type === 'text'"
          v-model="formData[field.name]"
          :placeholder="field.placeholder || ''"
          class="w-100"
        />

        <el-input
          v-else-if="field.type === 'number'"
          v-model.number="formData[field.name]"
          type="number"
          :placeholder="field.placeholder || ''"
          class="w-100"
        />

        <el-select
          v-else-if="field.type === 'select'"
          v-model="formData[field.name]"
          :placeholder="field.placeholder || 'Select'"
          class="w-100"
        >
          <el-option
            v-for="option in field.options"
            :key="option.key"
            :label="option.description"
            :value="option.key"
            class="w-100"
          />
        </el-select>
      </el-form-item>

      <div class="dialog-footer" style="text-align: right; margin-top: 1rem">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button
          type="success"
          @click="handleSubmit(2)"
          v-loading.fullscreen.lock="submitLoading"
          >Excel</el-button
        >
        <el-button
          type="danger"
          @click="handleSubmit(1)"
          v-loading.fullscreen.lock="submitLoading"
          >PDF</el-button
        >
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogTemplate",
  data() {
    return {
      visible: false,
      formData: {},
      fields: [],
      configDialog: {},
      submitLoading: false,
    };
  },
  methods: {
    openDialog({ data = {}, fields = [], config = {} }) {
      this.formData = { ...data };
      this.fields = fields;
      this.configDialog = config;
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
      this.$emit("closeDialog");
    },
    async handleSubmit(type) {
      this.$emit("handleDialogSubmit", { ...this.formData, type });
    },
  },
};
</script>

<template>
  <div>
    <nuxt-link :to="`/org/${$route.params.schoolId}/projects/${scope.row.id}.html`">
    </nuxt-link>
  </div>
</template>
<script>
export default {
  // 常用请求方法
  methods: {
    // 接口：get方法
    async getProjectInfo(projectId) {
      try {
        const res = await this.$axios.get(`${api.project.getProjectInfo}/${projectId}`);
        return res;
      } catch (error) {
        console.error(error);
      }
    },
    // post
    async getProjectList() {
      try {
        const res = await this.$axios.post(api.project.getProjectList);
        return res;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    // 删除
    async confirmDelete() {
      let id = this.tempRow.id;
      if ("delete" == this.confirmDeleteInput.toLowerCase()) {
        try {
          let res = await this.$axios.get(api.project.deleteProject + "/" + id);
          this.$message({ message: "删除成功", type: "success" });
        } catch (error) {
          this.$message({ message: error.message, type: "error" });
        }
      } else {
        this.$message({ type: "error", message: "请输入delete进行删除，不区分大小写，不要空格" });
        this.confirmDeleteInput = "";
      }
    },
  }
}
</script>

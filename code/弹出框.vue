<template>
  <div>
    <el-dialog title="添加课程" class="addprojectitems-dialog" :visible.sync="updateItemCompInitProp.visible">
      <updateProjectItemsComp v-if="updateItemCompInitProp.visible" :initProp="updateItemCompInitProp.initProp"
        @callback="callback"></updateProjectItemsComp>
    </el-dialog>
  </div>
  <div  icon="el-icon-remove-outline" style="font-size: 12px"
        @click="disableUser(multipleSelection)">
        <i class="iconfont icon-guanbi"></i>
        禁用
      </div>
</template>
<script>

</script>
<style lang="scss" scoped>
.addprojectitems-dialog {

  ::v-deep .el-dialog {
    width: 1162px;
    height: 660px;
    background: #FFFFFF;
  }

  // 头部
  ::v-deep .el-dialog__header {
    padding: 18px 29px 21px 27px;
    border-bottom: 2px solid #F3F3F3;
    ;
  }

  // 添加课程
  ::v-deep .el-dialog__title {
    height: 25px;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
  }

  // 关闭按钮 button
  ::v-deep .el-dialog__headerbtn {}

  // 关闭图标 icon
  ::v-deep .el-icon-close {
    font-size: 18px;
  }

  ::v-deep .el-icon-close:hover {
    color: #FF6B00;
  }

  // 内容
  ::v-deep .el-dialog__body {}
}
</style>

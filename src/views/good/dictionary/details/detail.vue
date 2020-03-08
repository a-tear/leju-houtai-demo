<template>
  <div class="detail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择颜色">
          <el-color-picker v-model="form.text"></el-color-picker>
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="form.descr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 组件
import dictApi from "@/api/dictionary/index";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        text: "#fff",
        descr: "白色"
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 打开新增用户
    openDialog(id) {
      // 如果存在id  则是点击编辑 否则是新增
      if (id) {
        dictApi
          .DictDetail({
            id
          })
          .then(res => {
            this.form = res.data;
          });
      }
      this.dialogVisible = true;
    },
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
    },
    close() {
      this.dialogVisible = false;
      this.resetForm();
    },
    // 点击确定
    addSave() {
      // 点击确定的时候 关闭遮罩层
      dictApi
        .saveDictList({
          ...this.form
        })
        .then(res => {
          console.log("新增分类", res);
          if (res.code == "S") {
            this.$message.success("保存成功!");
            //  关闭弹窗
            this.handleClose();
            //  刷新数据
            this.$emit("refresh-list");
          } else {
            this.$message.error("保存失败");
          }
        });
    },
    // 重置表单
    resetForm() {
      // vue 有一个对象 保存了 vue的原始数据  this.$options.data()
      // console.log('resetform',this.$options.data())
      // 清除表单数据  函数封装在utils/index.js 里面
      this.form = this.$options.data().form;
    }
  }
};
</script>

<style scoped lang="scss">
</style>

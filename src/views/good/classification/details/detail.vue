<template>
  <div class="detail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="中文名称">
          <el-input v-model="form.ctitle"></el-input>
        </el-form-item>

        <el-form-item label="英文名称">
          <el-input v-model="form.etitle"></el-input>
        </el-form-item>

        <el-form-item label="封面图片">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-button type="primary" size="small" @click="openImgs"
                >选择图片</el-button
              >
            </el-col>
            <el-col :span="6">
              <el-image
                fit="contain"
                v-show="form.img"
                :src="`http://bufan.cloud/${form.img}`"
                style="width:60px;height:50px"
              ></el-image>
            </el-col>
            <el-col :span="6">
              <el-button v-if="form.img" type="danger" @click="removeCover"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
    <ImgDetail ref="imgDetail" @showCover="showCover"></ImgDetail>
  </div>
</template>

<script>
// 组件
import ImgDetail from "@/views/good/classification/details/imgDetail";
import kindApi from "@/api/classification/index";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  components: {
    ImgDetail
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        img: "",
        ctitle: "",
        etitle: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 打开新增用户
    openDialog(data) {
      if (data) {
        this.form = data;
      }
      this.dialogVisible = true;
    },
    // 打开图片弹窗
    openImgs() {
      this.$refs.imgDetail.openImgForm();
    },
    // 显示封面图片
    showCover(url) {
      this.form.img = url;
    },
    // dialogVisible() {
    //   this.resetForm;
    // },
    // 删除封面图片
    removeCover() {
      this.form.img = "";
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
      this.$refs.imgDetail.maskId = "";
      kindApi
        .saveKindList({
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

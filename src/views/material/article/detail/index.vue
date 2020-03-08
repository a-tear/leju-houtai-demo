<template>
  <div class="detail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="form.color1"></el-color-picker>
          <el-color-picker v-model="form.color2"></el-color-picker>
          <el-color-picker v-model="form.color3"></el-color-picker>
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="form.kindIds" multiple placeholder="请选择">
            <el-option
              v-for="item in kindList"
              :key="item.id"
              :label="item.ctitle"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价钱">
          <el-input v-model="form.price" style="width:100px"></el-input>
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
                v-show="form.coverImg"
                :src="`http://bufan.cloud/${form.coverImg}`"
                style="width:60px;height:50px"
              ></el-image>
            </el-col>
            <el-col :span="6">
              <el-button v-if="form.coverImg" type="danger" @click="removeCover"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <Tinymce ref="tin"></Tinymce>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
    <imgDetail ref="imgDetail" @showCover="showCover"></imgDetail>
  </div>
</template>

<script>
import dictApi from "@/api/dictionary/index";
import kindApi from "@/api/classification/index";
import articleApi from "@/api/article/index";
import imgDetail from "@/views/material/article/detail/imgDetail";
import Tinymce from "@/components/Tinymce";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  components: {
    imgDetail,
    Tinymce
  },
  data() {
    return {
      dialogVisible: false,
      kindList: [],
      dictList: [],
      form: {
        coverImg: ""
      }
    };
  },
  computed: {},
  created() {
    this.getKindList();
  },
  mounted() {},
  methods: {
    //   获取分类列表
    getKindList() {
      kindApi.getKindList().then(res => {
        this.kindList = res.data;
        console.log("分类列表", res);
      });
    },

    openImgs() {
      this.$refs.imgDetail.openImgForm();
    },
    // 关闭
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
      this.resetText();
    },
    // 取消
    close() {
      this.dialogVisible = false;
      this.resetForm();
      this.resetText();
    },
    // 点击确定
    addSave() {
      // 富文本
      this.getTin();
      articleApi
        .saveArticleList({
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
    // 富文本
    getTin() {
      this.form.content1 = this.$refs.tin.getContent();
      this.form.content2 = this.$refs.tin.getContent();
    },

    setTin(v) {
      this.$refs.tin.onload(() => {
        this.$refs.tin.setContent(v);
      });
    },
    // 重置文本
    resetText() {
      if (this.$refs.tin) {
        this.$refs.tin.setContent("");
      }
      if (this.$refs.md) {
        this.$refs.md.setValue("");
      }
    },
    showCover(url) {
      this.form.coverImg = url;
    },
    // 删除图片
    removeCover() {},
    // 打开新增/编辑
    openDialog(id) {
      if (id) {
        articleApi
          .articleDetail({
            id
          })
          .then(res => {
            console.log("文章明细", res);
            this.form = res.data;
            this.$nextTick(() => {
              this.setTin(this.form.content1);
            });
          });
      }
      this.dialogVisible = true;
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

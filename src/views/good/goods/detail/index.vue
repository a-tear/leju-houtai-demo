<template>
  <div class="detail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.gname"></el-input>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input v-model="form.descr"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-select v-model="form.colorIds" multiple placeholder="请选择">
            <el-option
              v-for="item in dictList"
              :key="item.id"
              :label="item.descr"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        <el-form-item label="进价">
          <el-input v-model="form.priceIn"></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="form.priceOut"></el-input>
        </el-form-item>
        <el-form-item label="当前价格">
          <el-input v-model="form.priceNow"></el-input>
        </el-form-item>
        <el-form-item label="原产地">
          <el-input v-model="form.pOriginCity"></el-input>
        </el-form-item>
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
// 组件
import goodsApi from "@/api/goods/index";
import dictApi from "@/api/dictionary/index";
import kindApi from "@/api/classification/index";
import imgDetail from "@/views/good/goods/detail/imgDetail";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  components: {
    imgDetail
  },
  data() {
    return {
      dialogVisible: false,
      dictList: [],
      kindList: [],
      form: {
        coverImg: "",
        colorIds: [],
        kindIds: []
      }
    };
  },
  computed: {},
  created() {
    this.getDictList();
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
    // 获取颜色列表
    getDictList() {
      dictApi.getDictList().then(res => {
        this.dictList = res.data.list;
        console.log("字典列表", res);
      });
    },
    // 打开新增用户
    openDialog(id) {
      if (id) {
        goodsApi
          .getGoodsDetail({
            id
          })
          .then(res => {
            console.log("商品明细", res);
            this.form = res.data;
            this.form.colorIds = res.data.colors.map(ele => {
              return ele.descr;
            });
            this.form.kindIds = res.data.kinds.map(ele => {
              return ele.ctitle;
            });
          });
      }
      this.dialogVisible = true;
    },
    // 打开图片弹窗
    openImgs() {
      this.$refs.imgDetail.openImgForm();
    },

    // 封面图片显示
    showCover(url) {
      this.form.coverImg = url;
      //   this.$set(this.form, "coverImg", url);
    },
    // 删除封面图片
    removeCover() {
      this.form.coverImg = "";
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
      goodsApi
        .saveGoodsList({
          ...this.form
        })
        .then(res => {
          console.log("新增分类", res);
          if (res.code == true) {
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

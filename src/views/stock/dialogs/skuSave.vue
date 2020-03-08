<template>
  <div class="detail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <!-- <el-form-item label="商品">
          <el-select v-model="form.goodsId" multiple placeholder="请选择">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.gname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="颜色">
          <el-select v-model="form.colorId" clearable placeholder="请选择">
            <el-option
              v-for="item in dictList"
              :key="item.id"
              :label="item.descr"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="系列">
          <el-select v-model="form.seriesId" clearable placeholder="请选择">
            <el-option
              v-for="item in seriesList"
              :key="item.id"
              :label="item.cname"
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
              <el-button type="primary" size="small" @click="openImg"
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

        <el-form-item label="是否推荐">
          <el-switch
            v-model="form.hot"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="图片">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-button type="primary" size="small" @click="openImgs"
                >选择多张图片</el-button
              >
            </el-col>
            <el-col :span="6" v-for="item in this.form.imgs" :key="item.index">
              <el-image
                fit="contain"
                v-show="form.imgs"
                :src="`http://bufan.cloud/${item}`"
                style="width:60px;height:50px"
              ></el-image>
            </el-col>
            <el-col :span="6">
              <el-button v-if="form.imgs" type="danger" @click="removeImgs"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="高度">
          <el-input v-model="form.height" style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model="form.area" style="width:100px"></el-input>
        </el-form-item>

        <el-form-item label="库存数量">
          <el-input v-model="form.count" style="width:100px"></el-input>
        </el-form-item>

        <Tinymce ref="tin"></Tinymce>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
    <imgDetail ref="imgDetail" @showCover="showCover"></imgDetail>
    <imgsDailog ref="imgsDailog" @showImgs="showImgs"></imgsDailog>
  </div>
</template>

<script>
import stockApi from "@/api/stock/index";
import dictApi from "@/api/dictionary/index";
// import kindApi from "@/api/classification/index";
// import articleApi from "@/api/article/index";
import goodsApi from "@/api/goods/index";
import seriesApi from "@/api/series/index";
import imgDetail from "@/views/material/article/detail/imgDetail";
import imgsDailog from "@/views/stock/dialogs/imgsDailog";
import Tinymce from "@/components/Tinymce";
import { resetDataAttr } from "@/utils/index";
export default {
  props: {},
  components: {
    imgDetail,
    Tinymce,
    imgsDailog
  },
  data() {
    return {
      dialogVisible: false,
      dictList: [],
      // goodsList: [],
      seriesList: [],
      kindList: [],
      goodsId: "",
      form: {
        coverImg: "",
        imgs: "",
        hot: 0,
        colorId: ""
      }
    };
  },
  computed: {},
  created() {
    // this.getGoodsList();
    this.getByIdList();
    this.getSeriesList();
  },
  mounted() {},
  methods: {
    //   根据id获取颜色列表
    getByIdList(id) {
      console.log("id查询颜色", id);
      stockApi
        .getByIdList({
          goodsId: id
        })
        .then(res => {
          this.dictList = res.data;
          console.log("颜色列表", res);
        });
    },

    //   获取系列列表
    getSeriesList() {
      seriesApi.getSeriesList().then(res => {
        this.seriesList = res.data;
        console.log("系列列表", res);
      });
    },

    openImg() {
      this.$refs.imgDetail.openImgForm();
    },
    // 封面图片的显示
    showCover(url) {
      this.form.coverImg = url;
    },
    // 删除图片
    removeCover() {
      this.form.coverImg = "";
    },
    openImgs() {
      this.$refs.imgsDailog.openImgsForm();
    },
    // 多张图片的显示
    showImgs(urls) {
      this.form.imgs = urls;
    },
    removeImgs() {
      this.form.imgs = "";
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
      this.form.imgs = this.form.imgs.join(",");
      console.log(this.form, "---------------s");
      stockApi
        .saveStockList({
          ...this.form
        })
        .then(res => {
          console.log("新增sku", res);
          if (res.code == "S") {
            this.$message.success("保存成功!");
            //  关闭弹窗
            this.handleClose();
            //  刷新数据
            this.$emit("refresh-list", this.goodsId);
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

    // 打开新增/编辑
    openDialog(id, goodsId) {
      this.getByIdList(goodsId);
      this.goodsId = goodsId;
      this.form.goodsId = goodsId;
      if (id) {
        stockApi
          .getStockDetail({
            id: id,
            goodsId: goodsId
          })
          .then(res => {
            console.log("文章明细", res);
            this.form = res.data;
            if (res.data.content1) {
              this.$nextTick(() => {
                this.$refs.tin.setContent(res.data.content1);
              });
            }
            if (res.data.imgs) {
              this.form.imgs = res.data.imgs.split(",");
            }
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

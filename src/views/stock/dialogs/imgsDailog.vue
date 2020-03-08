<template>
  <div class="imgDetail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="openForm"
      width="80%"
      :before-close="handleClose"
    >
      <div class="content">
        <el-card>
          <div slot="header">
            <el-upload
              class="upload-demo"
              action="/api/leju/admin/material/upload"
              :on-success="upload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </div>
          <el-row :gutter="20">
            <Pagination
              style="text-align:right"
              :page="page"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></Pagination>
            <el-col
              :span="6"
              v-for="item in imgsList.list"
              :key="item.id"
              style="height:100px;margin: 30px auto;"
            >
              <el-card class="imgs">
                <el-image
                  @click="maskShow(item.id, item.fullPath)"
                  :class="{ act: imgUrl.some(ele => ele == item.fullPath) }"
                  fit="scale-down"
                  style="width:60px; height: 60px"
                  :src="`http://bufan.cloud/${item.fullPath}`"
                >
                </el-image>
                <!-- 
                <div class="mask" v-show="item.id == maskId">
                  <span class="tips">✔</span>
                </div> -->
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openForm = false">取 消</el-button>
        <el-button type="primary" @click="addSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import materialApi from "@/api/material/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: { Pagination },
  data() {
    return {
      openForm: false,
      imgsList: [],
      maskId: "",
      imgUrl: []
    };
  },
  computed: {},
  created() {
    this.getImgList();
  },
  mounted() {},
  methods: {
    // 打开图片弹窗
    openImgsForm() {
      this.openForm = true;
    },
    getImgList() {
      materialApi
        .getImgList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.imgsList = res.data;
          this.page.total = res.data.totalRow;
          console.log("图片列表=>", res.data);
        });
    },
    handleClose() {
      this.openForm = false;
    },
    upload() {
      this.getImgList();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getImgList();
    },
    handleSizeChange(val) {
      this.page.start = val;
      this.getImgList();
    },
    // 点击弹出遮罩层
    maskShow(id, url) {
      // console.log("lalalla", url);
      // this.maskId = this.maskId == id ? "" : id;
      this.fullPath = url;
      // 如果选中了才有
      // if (this.maskId) {
      //   this.imgUrl = url;
      // } else {
      //   this.imgUrl = "";
      // }
      if (this.imgUrl.indexOf(this.fullPath) > -1) {
        this.imgUrl.splice(this.imgUrl.findIndex(el => el == url), 1);
      } else {
        this.imgUrl.push(this.fullPath);
      }
    },
    addSave() {
      // var url = this.imgUrl;
      this.$emit("showImgs", this.imgUrl);
      console.log("url111", this.imgUrl);
      this.maskId = "";
      this.handleClose();
    }
  }
};
</script>

<style scoped lang="scss">
.imgs {
  .el-image.act::before {
    content: "";
    position: absolute;
    width: 143px;
    height: 160px;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6)
      url("../../../assets/404_images/righting.png") no-repeat center;
    pointer-events: none;
  }
}
</style>

<template>
  <div class="material-main">
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
          style="height:300px;margin: 30px auto;"
        >
          <el-card>
            <el-image
              fit="scale-down"
              style="width:100%; height: 260px"
              :src="`http://bufan.cloud/${item.fullPath}`"
            >
            </el-image>
            <div class="text">
              <!-- <p @click="doEdit(item.id, $event)" v-show="editId != item.id">
                {{ item.title ? item.title : "未定义" }}
              </p> -->
              <!-- <el-input
                v-show="editId == item.id"
                @blur="clearIpt"
                @keyup.esc.native="editId = ''"
                @keyup.enter.native="submit(item.id, item.title)"
                v-model="item.title"
                placeholder="请输入内容"
              ></el-input> -->
              <el-button
                @click="delImgs(item.id)"
                class="btn"
                type="danger"
                icon="el-icon-delete"
                circle
                >删除</el-button
              >
            </div>
          </el-card>
        </el-col>
        <!-- 分页 -->
      </el-row>
    </el-card>
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
      imgsList: []
    };
  },
  computed: {},
  created() {
    this.getImgList();
  },
  mounted() {},
  methods: {
    // 获取图片列表
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
    // doEdit() {},
    // submit() {},

    // 删除
    delImgs(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          materialApi
            .delImgList({
              id: id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getImgList();
                this.$message.success("删除成功!");
              } else {
                this.$message.error("删除失败!");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 上传成功刷新页面
    upload() {
      this.getImgList();
    },
    // editId() {},
    // clearIpt() {},
    handleCurrentChange(val) {
      this.page.start = val;
      // 重新发送请求
      this.getImgList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      // 重新发送请求
      this.getImgList();
    }
  }
};
</script>

<style scoped lang="scss">
.text {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  .btn {
    background-color: #fff;
    color: #f56c6c;
    border: none;
  }
}
</style>

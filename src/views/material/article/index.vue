<template>
  <div class="article-main">
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="articleList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="100">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="100">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="100">
          </el-table-column>

          <el-table-column prop="colors" label="商品颜色" width="180">
            <template slot-scope="scope">
              <div style="display:flex">
                <div
                  class="textColor"
                  :style="{ backgroundColor: scope.row.color1 }"
                ></div>
                <div
                  class="textColor"
                  :style="{ backgroundColor: scope.row.color2 }"
                ></div>

                <div
                  class="textColor"
                  :style="{ backgroundColor: scope.row.color3 }"
                ></div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="coverImg" label="图片" width="100">
            <template slot-scope="scope">
              <el-image
                fit="scale-down"
                style="width:60px; height: 60px"
                :src="`http://bufan.cloud/${scope.row.coverImg}`"
              >
              </el-image>
            </template>
          </el-table-column>

          <el-table-column prop="kindCTitle" label="商品类型" width="180">
            <!-- <template slot-scope="scope">
              <div
                  class="textColor"
                  :style="{ backgroundColor: scope.row.color1 }"
                ></div>
            </template> -->
          </el-table-column>
          <el-table-column prop="price" label="价格" width="100">
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row)" type="primary" size="small"
                >编辑</el-button
              >
              <el-button @click="delForm(scope.row)" type="danger" size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->

        <Pagination
          :page="page"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></Pagination>
      </el-card>
    </div>
    <Detail ref="detail" @refresh-list="getArticleList"></Detail>
  </div>
</template>

<script>
import articleApi from "@/api/article/index";
import Detail from "@/views/material/article/detail/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: { Detail, Pagination },
  data() {
    return {
      articleList: []
    };
  },
  computed: {},
  created() {
    this.getArticleList();
  },
  mounted() {},
  methods: {
    //   获取文章列表
    getArticleList() {
      articleApi
        .getArticleList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.articleList = res.data.list;
          this.page.total = res.data.totalRow;
          console.log("文章列表", res);
        });
    },
    // 打开新增弹窗
    addUser() {
      this.$refs.detail.openDialog();
    },
    // 编辑
    goEdit(row) {
      this.$refs.detail.openDialog(row.id);
    },
    // 删除
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          articleApi
            .delArticleList({
              id: row.id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getArticleList();
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
    handleCurrentChange(val) {
      this.page.start = val;
      this.getGoodsList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getGoodsList();
    }
  }
};
</script>

<style scoped lang="scss">
.textColor {
  width: 40px;
  height: 30px;
  margin-right: 10px;
}
</style>

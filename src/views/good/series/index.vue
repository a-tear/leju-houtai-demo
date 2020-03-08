<template>
  <div class="series-main">
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="seriesList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="100">
          </el-table-column>
          <el-table-column prop="cname" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="ename" label="英文名称" width="100">
          </el-table-column>
          <el-table-column prop="descr" label="商品描述" width="100">
          </el-table-column>
          <el-table-column prop="descr" label="商品描述" width="100">
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
    <Detail ref="detail" @refresh-list="getSeriesList"></Detail>
  </div>
</template>

<script>
import seriesApi from "@/api/series/index";
import Detail from "@/views/good/series/details/detail";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: {
    Pagination,
    Detail
  },
  data() {
    return {
      seriesList: []
    };
  },
  computed: {},
  created() {
    this.getSeriesList();
  },
  mounted() {},
  methods: {
    getSeriesList() {
      seriesApi
        .getSeriesList({
          start: this.page.start,
          limit: this.page.start
        })
        .then(res => {
          this.seriesList = res.data;
          this.page.total = res.data.totalRow;
          console.log("系列列表", res);
        });
    },
    addUser() {
      this.$refs.detail.openDialog();
    },
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          seriesApi
            .delSeriesList({
              id: row.id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getSeriesList();
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
    goEdit(row) {
      this.$refs.detail.openDialog(row);
      row = {
        ...row
      };
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getSeriesList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getSeriesList();
    }
  }
};
</script>

<style scoped lang="scss">
</style>

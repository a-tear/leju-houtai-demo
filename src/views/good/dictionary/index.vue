<template>
  <div class="dict-main">
    <!-- 列表 -->
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="dictList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="100">
          </el-table-column>
          <el-table-column prop="descr" label="描述" width="100">
          </el-table-column>
          <el-table-column prop="text" label="内容" width="auto">
            <template slot-scope="scope">
              <div
                class="textColor"
                :style="{ backgroundColor: scope.row.text }"
              ></div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="type" label="分类" width="100">
          </el-table-column> -->
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
    <Detail ref="detail" @refresh-list="getDictList"></Detail>
  </div>
</template>

<script>
import dictApi from "@/api/dictionary/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import Detail from "@/views/good/dictionary/details/detail";
export default {
  props: {},
  mixins: [pageMixin],
  components: {
    Pagination,
    Detail
  },
  data() {
    return {
      dictList: []
    };
  },
  computed: {},
  created() {
    this.getDictList();
  },
  mounted() {},
  methods: {
    getDictList() {
      dictApi
        .getDictList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.dictList = res.data.list;
          this.page.total = res.data.totalRow;
          console.log("字典列表", res);
        });
    },
    // 点击添加用户
    addUser() {
      this.$refs.detail.openDialog();
    },
    // 编辑
    goEdit(row) {
      this.$refs.detail.openDialog(row.id);
    },
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          dictApi
            .delDictList({
              id: row.id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getDictList();
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
      // 重新发送请求
      this.getDictList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getDictList();
    }
  }
};
</script>

<style scoped lang="scss">
.textColor {
  width: 60px;
  height: 40px;
}
</style>

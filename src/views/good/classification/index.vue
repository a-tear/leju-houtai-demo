<template>
  <div class="kind-main">
    <!-- 列表 -->
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="kindList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="100">
          </el-table-column>
          <el-table-column prop="ctitle" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="etitle" label="商品描述" width="100">
          </el-table-column>
          <el-table-column prop="img" label="图片" width="100">
            <template slot-scope="scope">
              <el-image
                fit="scale-down"
                style="width:60px; height: 60px"
                :src="`http://bufan.cloud/${scope.row.img}`"
              >
              </el-image>
            </template>
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
    <Detail ref="detail" @refresh-list="getKindList"></Detail>
  </div>
</template>

<script>
import kindApi from "@/api/classification/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import Detail from "@/views/good/classification/details/detail";
export default {
  props: {},
  mixins: [pageMixin],
  components: { Pagination, Detail },
  data() {
    return {
      kindList: []
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
      kindApi
        .getKindList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.kindList = res.data;
          this.page.total = res.data.totalRow;
          console.log("分类列表", res);
        });
    },
    // 添加用户
    addUser() {
      this.$refs.detail.openDialog();
    },
    // 编辑
    goEdit(row) {
      this.$refs.detail.openDialog(row);
      row = {
        ...row
      };
    },
    // 删除
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          kindApi
            .delKindList({
              id: row.id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getKindList();
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
      this.getKindList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getKindList();
    }
  }
};
</script>

<style scoped lang="scss">
</style>

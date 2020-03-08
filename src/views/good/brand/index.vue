<template>
  <div class="brand-main">
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="brandList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="100">
          </el-table-column>
          <el-table-column prop="cname" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="ename" label="英文名称" width="100">
          </el-table-column>
          <el-table-column prop="descr" label="商品描述" width="100">
          </el-table-column>
          <el-table-column prop="coverImg" label="封面图片" width="100">
            <template slot-scope="scope">
              <el-image
                fit="scale-down"
                style="width:60px; height: 60px"
                :src="`http://bufan.cloud/${scope.row.coverImg}`"
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
    <Detail ref="detail" @refresh-list="getBrandList"></Detail>
  </div>
</template>

<script>
import brandApi from "@/api/brand/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
import Detail from "@/views/good/brand/details/detail";
export default {
  props: {},
  mixins: [pageMixin],
  components: {
    Pagination,
    Detail
  },
  data() {
    return {
      brandList: []
    };
  },
  computed: {},
  created() {
    this.getBrandList();
  },
  mounted() {},
  methods: {
    //   获取品牌列表
    getBrandList() {
      brandApi
        .getBrandList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.brandList = res.data.list;
          this.page.total = res.data.totalRow;
          console.log("品牌列表", res);
        });
    },
    // 添加用户
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
          brandApi
            .delBrandList({
              id: row.id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getBrandList();
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
      this.getBrandList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getBrandList();
    }
  }
};
</script>

<style scoped lang="scss">
</style>

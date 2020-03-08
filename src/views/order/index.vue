<template>
  <div class="order-main">
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="orderList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="下单时间" width="100">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="100">
          </el-table-column>
          <el-table-column prop="gname" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="100">
          </el-table-column>

          <el-table-column label="订单状态" width="auto">
            <template slot-scope="scope">
              <div
                :class="{
                  red: scope.row.orderStatus == '9',
                  blue: scope.row.orderStatus == '2'
                }"
              >
                {{
                  scope.row.orderStatus == "0"
                    ? "待付款"
                    : scope.row.orderStatus == "1"
                    ? "已付款"
                    : scope.row.orderStatus == "2"
                    ? "已发货"
                    : scope.row.orderStatus == "3"
                    ? "确认收货"
                    : "申请退款"
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="150" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="goEdit(scope.row)" type="primary"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="delForm(scope.row)"
                v-show="scope.row.orderStatus == '9'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          :page="page"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></Pagination>
      </el-card>
    </div>
    <Detail ref="detail" @hand-list="getOrderList"></Detail>
  </div>
</template>

<script>
import orderApi from "@/api/order/index";
import Detail from "@/views/order/detail/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: {
    Detail,
    Pagination
  },
  data() {
    return {
      orderList: []
    };
  },
  computed: {},
  created() {
    this.getOrderList();
  },
  mounted() {},
  methods: {
    getOrderList() {
      orderApi
        .getOrderList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.orderList = res.data.list;
          this.page.total = res.data.totalRow;
          console.log("订单列表", res);
        });
    },
    addUser() {
      this.$refs.detail.openDialog();
    },
    goEdit(row) {
      this.$refs.detail.openDialog(row.orderId);
    },
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          orderApi
            .delOrderList({
              id: row.orderId
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getOrderList();
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
      this.getOrderList();
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getOrderList();
    }
  }
};
</script>

<style scoped lang="scss">
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>

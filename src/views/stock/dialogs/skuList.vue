<template>
  <div class="skuDetail-main">
    <el-dialog
      title="编辑内容"
      :visible.sync="openForm"
      width="80%"
      :before-close="handleClose"
    >
      <el-card>
        <div slot="header">
          <div slot="header">
            <el-button @click="goEdit({ goodsId })" type="primary"
              >添加用户</el-button
            >
          </div>
        </div>
        <el-table border :data="stockList" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="cname" label="中文名称" width="100">
          </el-table-column>
          <el-table-column prop="ename" label="英文名称" width="100">
          </el-table-column>

          <el-table-column prop="color" label="商品颜色" width="100">
          </el-table-column>
          <el-table-column prop="attr" label="颜色样式" width="180">
            <template slot-scope="scope">
              <div
                :style="{ backgroundColor: scope.row.attr }"
                class="textColor"
              ></div>
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
      </el-card>
    </el-dialog>
    <SkuSave ref="SkuSave" @refresh-list="getStockList(goodsId)"></SkuSave>
  </div>
</template>

<script>
import stockApi from "@/api/stock/index";
import SkuSave from "@/views/stock/dialogs/skuSave";
export default {
  props: {},
  components: {
    SkuSave
  },
  data() {
    return {
      openForm: false,
      stockList: [],
      goodsId: ""
    };
  },
  computed: {},
  created() {
    this.getStockList();
  },
  mounted() {},
  methods: {
    // sku列表
    getStockList(id) {
      this.goodsId = id;
      stockApi
        .getStockList({
          goodsId: id
        })
        .then(res => {
          this.stockList = res.data;
          console.log("sku列表", res);
        });
    },

    handleClose() {
      this.openForm = false;
    },
    // 打开查看库存表单
    openLookSku(val) {
      this.getStockList(val);
      this.openForm = true;
    },
    // 打开新增sku
    // addUser() {
    //   this.$refs.SkuSave.openDialog();
    // },
    // 编辑
    goEdit(val) {
      this.$refs.SkuSave.openDialog(val.id, val.goodsId);
    },
    delForm(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          stockApi
            .delStockList({
              id: row.id
            })
            .then(res => {
              if (res.code == "S") {
                // 刷新数据
                this.getStockList(this.goodsId);
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
    }
  }
};
</script>

<style scoped lang="scss">
.textColor {
  width: 60px;
  height: 30px;
}
</style>

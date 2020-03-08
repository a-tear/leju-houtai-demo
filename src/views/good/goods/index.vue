<template>
  <div class="goods-main">
    <!-- 列表 -->
    <div class="content">
      <el-card>
        <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div>

        <el-table border :data="goodsList.list" style="width: 100%">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="addTime" label="添加时间" width="100">
          </el-table-column>
          <el-table-column prop="gname" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="descr" label="商品描述" width="100">
          </el-table-column>

          <el-table-column prop="colors" label="商品颜色" width="180">
            <template slot-scope="scope">
              <div style="display:flex">
                <div v-for="(item, index) in scope.row.colors" :key="index">
                  <div
                    v-if="item.text"
                    :style="{ backgroundColor: item.text }"
                    class="textColor"
                  ></div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="kinds" label="商品类型" width="180">
            <template slot-scope="scope">
              <div style="display:flex;">
                <div v-for="(item, index) in scope.row.kinds" :key="index">
                  <div v-if="item.ctitle" class="kindTtitle">
                    {{ item.ctitle }}
                  </div>
                </div>
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
          <el-table-column prop="priceIn" label="进价" width="100">
          </el-table-column>
          <el-table-column prop="priceOut" label="售价" width="100">
          </el-table-column>
          <el-table-column prop="priceNow" label="当前价格" width="100">
          </el-table-column>
          <el-table-column prop="pOriginCity" label="原产地"> </el-table-column>
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
    <Detail ref="detail" @refresh-list="getGoodsList"></Detail>
  </div>
</template>

<script>
import goodsApi from "@/api/goods/index";
import Detail from "@/views/good/goods/detail/index";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: { Pagination, Detail },
  data() {
    return {
      loading: true,
      goodsList: []
    };
  },
  computed: {},
  created() {
    this.getGoodsList();
  },
  mounted() {},
  methods: {
    getGoodsList() {
      goodsApi
        .getGoodsList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.goodsList = res.data;
          this.page.total = res.data.totalRow;
          console.log("商品列表", res);
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
          goodsApi
            .delGoodsList({
              id: row.id
            })
            .then(res => {
              if (res.code == true) {
                // 刷新数据
                this.getGoodsList();
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
.kindTtitle {
  // background-color: gray;
  margin-right: 10px;
}
</style>

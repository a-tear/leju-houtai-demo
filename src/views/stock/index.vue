<template>
  <div class="stock-main">
    <!-- 列表 -->
    <div class="content">
      <el-card>
        <!-- <div slot="header">
          <el-button @click="addUser" type="primary">添加用户</el-button>
        </div> -->

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
              <el-button
                @click="lookStock(scope.row)"
                type="primary"
                size="small"
                >查看库存</el-button
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
    <SkuList ref="SkuList" @refresh-list="getGoodsList"></SkuList>
  </div>
</template>

<script>
import goodsApi from "@/api/goods/index";
import SkuList from "@/views/stock/dialogs/skuList";
import Pagination from "@/components/Pagination";
import pageMixin from "@/mixins/pageMixin";
export default {
  props: {},
  mixins: [pageMixin],
  components: { Pagination, SkuList },
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

    // 查看库存
    lookStock(row) {
      this.$refs.SkuList.openLookSku(row.id);
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

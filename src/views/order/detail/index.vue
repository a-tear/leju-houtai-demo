<template>
  <div class="order-detail">
    <el-dialog
      title="选择素材"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="60%"
    >
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input
                :disabled="true"
                v-model="form.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><el-form-item label="商品名称" :label-width="formLabelWidth">
              <el-input
                v-model="form.gname"
                :disabled="true"
                autocomplete="off"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品描述" :label-width="formLabelWidth">
              <el-input
                :disabled="true"
                v-model="form.descr"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input
                :disabled="true"
                v-model="form.price"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="数量" :label-width="formLabelWidth">
              <el-input
                :disabled="true"
                v-model="form.count"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单时间" :label-width="formLabelWidth">
              <el-input
                :disabled="true"
                v-model="form.doneTime"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-steps style="margin-top:20px" :active="form.orderStatus - 0">
          <el-step title="待付款" icon="el-icon-wallet"></el-step>
          <el-step title="已付款" icon="el-icon-sold-out"></el-step>
          <el-step title="已发货" icon="el-icon-truck"></el-step>
          <el-step title="已完成" icon="el-icon-circle-check"></el-step>
          <el-step title="申请退款" icon="el-icon-coin"></el-step>
        </el-steps>
        <el-button
          v-show="form.orderStatus == 1"
          style="margin-top: 12px;"
          @click="next()"
          >发货</el-button
        >
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import orderApi from "@/api/order/index";
export default {
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      name: "名字",
      form: {},
      orderId: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 点击下一步
    next() {
      this.form.orderStatus = "2";
      orderApi
        .saveOrderList({
          id: this.orderId,
          status: "2"
        })
        .then(res => {
          console.log(res);
        });
    },
    //   确定按钮
    doSave() {
      console.log(this.form);
      this.$emit("hand-list");
      this.dialogFormVisible = false;
      // orderApi
      //   .saveOrUpdateOrder({
      //     ...this.form
      //   })
      //   .then(res => {
      //     if (res.code == true) {
      //       this.handleClose();
      //       this.$emit("hand-list");
      //       this.$message.success("保存成功");
      //     } else {
      //       this.$message.error("保存失败");
      //     }
      //     console.log(res);
      //   });
    },
    //   弹窗   编辑
    openDialog(id) {
      this.orderId = id;
      this.dialogFormVisible = true;
      if (id) {
        // console.log(id);
        orderApi.orderDetail({ id }).then(res => {
          this.form = res.data;
          console.log("res编辑=>", res);
        });
      }
    },
    //   关闭之前执行的函数
    handleClose() {
      this.dialogFormVisible = false;
      this.resetForm();
    },
    // 重置表单
    resetForm() {
      this.form = this.$options.data().form;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>

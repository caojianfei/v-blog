<template>
  <div>
    <el-row class="form-container">
      <el-col :span="8" :offset="8">
        <el-form
          :model="form"
          label-width="auto"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item label="用户名" prop="email">
            <el-input placeholder="请输入用户名" v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="loading"
              type="primary"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from "../apis";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ required: true, message: "请输入活用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不能小于 6 个字符", trigger: "blur" }
        ]
      },
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        const {
          form: { email, password }
        } = this;
        login({ email, password })
          .then(res => {
            console.log("res", res);
            const { code, message, data } = res;
            if (code !== 0) {
              this.$message.error(`登录失败：${message}`);
              this.loading = false;
              return;
            }
            console.log(data);
            this.$message.success("登录成功");
            this.loading = false;
          })
          .catch(err => {
            this.$message.error("登录失败");
            this.loading = false;
            console.log("err", err);
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
}
</style>

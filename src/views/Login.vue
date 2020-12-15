<template>
  <div class="container">
    <div class="title">
      <h2>欢迎登陆 vBlog 管理后台</h2>
    </div>
    <div class="form">
      <el-form :model="form" label-width="auto" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="email">
          <el-input placeholder="请输入用户名" v-model="form.email"> </el-input>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
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
  mounted() {
    console.log(this.isLogin);
    if (this.isLogin === true) {
      this.$router.replace("/admin");
    }
  },
  computed: {
    ...mapState("auth", {
      token: state => state.token
    }),
    ...mapGetters("auth", ["isLogin"])
  },
  methods: {
    ...mapActions("auth", ["login"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        const {
          form: { email, password }
        } = this;
        this.login({ email, password })
          .then(res => {
            if (res.code === 0) {
              this.$router.replace("/admin");
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message || "登录失败");
            }
          })
          .catch(() => {
            this.$message.error("登录失败");
          })
          .finally(() => (this.loading = false));
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container .form {
  min-width: 300px;
}
.container .title {
  height: 150px;
  margin-top: 50px;
}
</style>

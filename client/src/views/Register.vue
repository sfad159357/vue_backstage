<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">全端vue後台管理系統</span>
      </div>
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        class="registerForm"
        label-width="100px"
      >
        <el-form-item label="用戶名" prop="name">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信箱" prop="email">
          <el-input
            type="email"
            v-model="registerForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="確認密碼" prop="password2">
          <el-input
            type="password"
            v-model="registerForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="registerForm.identity">
            <el-option label="管理員" value="manager"></el-option>
            <el-option label="員工" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('registerForm')">註冊</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "register",
  components: {},
  data() {
    var validatePassword2 = (rule, value, callback) => {
      if (value !== this.registerForm.password)
        callback(new Error("與上一欄密碼不符"));
      else callback();
    };
    return {
      registerForm: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
      },
      rules: {
        name: [
          { required: true, message: "請輸入用戶名", trigger: "blur" },
          { min: 2, max: 10, trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "請輸入信箱",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "請輸入密碼",
            trigger: "blur",
          },
          { min: 6, max: 20, message: "密碼長度為6~20", trigger: "blur" },
        ],
        password2: [
          {
            required: true,
            message: "請輸入密碼",
            trigger: "blur",
          },
          { min: 6, max: 20, message: "密碼長度為6~20", trigger: "blur" },
          { validator: validatePassword2, trigger:"blur"},
        ],
      },
    };
  },
  methods: {
    // 這裡的forNmae是el-form ref的值：registerForm
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) alert("成功提交。");
        else {
          alert("格式不符，提交失敗");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>

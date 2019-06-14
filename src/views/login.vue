<template>
	<div class="login">
		<div class="topImg">
			<!-- <img src="../assets/img/top-bg.png" style="width:100%;min-height:250px" alt=""> -->
		</div>
		<div class="title">
			<p>登 录</p>
		</div>
		<div class="account">
			<img class="icon" src="../assets/img/icon-identity.png" alt="">
			<el-input placeholder="请输入账号" v-model="input" clearable>
			</el-input>
		</div>
		<div class="password">
			<img class="icon" src="../assets/img/icon-password.png" alt="">
			<el-input placeholder="请输入密码" v-model="input" clearable>
			</el-input>
		</div>
		<div class="code">
			<img class="icon" src="../assets/img/icon-code.png" alt="">
			<el-input placeholder="请输入验证" v-model="input" clearable>
			</el-input>
			<div class="codeBox"></div>
		</div>
		<div class="bottom">
			<p class="register">注册</p>
			<p class="forget">忘记密码？</p>
		</div>
		<div class="loginbtn">
			<img src="../assets/img/btn-register.png" alt="">
		</div>
		<div class="checkBox">
			<el-checkbox v-model="checked">游客登录</el-checkbox>
		</div>
		<div class="bottomDesc">
			<p>技术支持：南京九州会计咨询有限公司。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：025-968899996</p>
		</div>
		<!-- <el-button @click='login'>登录</el-button> -->
	</div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      input: "",
      checked: false
    };
  },
  components: {},
  methods: {
    login() {
      this.$router.push({
        path: "/index"
      });
    }
  }
};
</script>
<style>
.account .el-input,
.password .el-input,
.code .el-input {
  margin-left: 30px;
}
.account .el-input--suffix .el-input__inner,
.password .el-input--suffix .el-input__inner,
.code .el-input--suffix .el-input__inner {
  border: none;
  padding: 0;
  border-bottom: 2px solid #999;
  border-radius: 0;
}
.checkBox .el-checkbox__label {
  font-size: 20px;
  color: #808080;
}
.checkBox .el-checkbox__inner {
  width: 22px;
  height: 22px;
}
.checkBox .el-checkbox__inner::after {
  height: 13px;
  left: 7px;
  width: 6px;
}
</style>

<style scoped>
.login {
  height: 100%;
  background: #fff;
  /* background: url("../assets/img/bg.png") no-repeat;
					background-size: cover; */
}
.topImg {
  background: url("../assets/img/top-bg.png") no-repeat center center;
  height: 35%;
  background-size: cover;
}
.title p {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 36px;
  color: #333;
}
.account,
.password,
.code,
.loginbtn {
  display: flex;
  align-items: center;
  width: 406px;
  margin: 0 auto;
  justify-content: center;
}
.password,
.code {
  margin-top: 15px;
}
.codeBox {
  width: 112px;
  height: 38px;
  background: #666666;
  margin-left: 10px;
}
.account img,
.password img {
  width: 30px;
}
.bottom {
  margin: 10px auto;
}
.checkBox {
  margin: 5px auto;
}
.bottom,
.checkBox {
  display: flex;
  align-items: center;
  width: 406px;
  justify-content: space-between;
}
.register {
  font-size: 20px;
  color: #ffac69;
  cursor: pointer;
}
.forget {
  font-size: 20px;
  color: #ed878e;
  cursor: pointer;
}
.bottomDesc {
  position: fixed;
  width: 406px;
  left: 50%;
  bottom: 10px;
  margin-left: -203px;
}
.loginbtn {
  cursor: pointer;
}
@media screen and (min-width: 1024px) {
  .title p {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 36px;
    color: #333;
  }
  .password,
  .code {
    margin-top: 15px;
  }
  .account img,
  .password img {
    width: 30px;
  }
  .bottom {
    margin: 10px auto;
  }
  .checkBox {
    margin: 5px auto;
  }
  .register {
    font-size: 20px;
  }
  .forget {
    font-size: 20px;
  }
  .bottomDesc {
    bottom: 10px;
  }
}
/*>=1024的设备*/
@media screen and (min-width: 1100px) {
}
@media screen and (min-width: 1280px) {
  
  .bottom {
    margin: 25px auto;
  }
  .checkBox {
    margin: 15px auto;
  }
}
@media screen and (min-width: 1366px) {
}
@media screen and (min-width: 1440px) {
  .title p {
    margin-top: 15px;
    margin-bottom: 40px;
    font-size: 46px;
  }
  .password,
  .code {
    margin-top: 15px;
  }
  .account img,
  .password img {
    width: 30px;
  }
  .bottom {
    margin: 35px auto;
  }
  .checkBox {
    margin: 15px auto;
  }
  .bottomDesc {
    bottom: 15px;
  }
}
@media screen and (min-width: 1680px) {
  .title p {
    margin-top: 25px;
    margin-bottom: 50px;
    font-size: 46px;
  }
  .password,
  .code {
    margin-top: 15px;
  }
  .account img,
  .password img {
    width: 30px;
  }
  .bottom {
    margin: 35px auto;
  }
  .checkBox {
    margin: 35px auto;
  }
  .register {
    font-size: 22px;
  }
  .forget {
    font-size: 22px;
  }
  .bottomDesc {
    bottom: 15px;
  }
}
@media screen and (min-width: 1920px) {
  .title p {
    margin-top: 25px;
    margin-bottom: 50px;
    font-size: 46px;
  }
  .password,
  .code {
    margin-top: 15px;
  }
  .account img,
  .password img {
    width: 30px;
  }
  .bottom {
    margin: 35px auto;
  }
  .checkBox {
    margin: 35px auto;
  }
  .register {
    font-size: 22px;
  }
  .forget {
    font-size: 22px;
  }
  .bottomDesc {
    bottom: 15px;
  }
}
</style>

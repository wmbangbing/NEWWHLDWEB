<template>
  <el-card class="userCard">
    <el-form class="form" ref="userForm" :model="userForm" :rules="createRules" label-width="100px" label-position="left">
      <div class="title-container">
        <h3 class="title">创建用户</h3>
      </div>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" type="text" auto-complete="on" style="" placeholder="请输入用户名"/>
      </el-form-item>  
      <el-form-item label="输入密码" prop="password">
        <el-input :type="passwordType" v-model="userForm.password" auto-complete="on" style="" placeholder="请输入密码"  />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPsd">
        <el-input :type="passwordType" v-model="userForm.confirmPsd" auto-complete="on" style="" placeholder="请确认密码"/>
      </el-form-item>
      <el-form-item label="用户组" prop="role">
        <el-radio-group @change="roleChanged" v-model="userForm.role">
          <el-radio label=1>管理员</el-radio>
          <el-radio label=2>区级</el-radio>
          <el-radio label=3>游客</el-radio>
        </el-radio-group>
      </el-form-item>       
      <el-form-item size="large" style="height" label="区域" prop="district">
        <el-select :clearable=true v-if=district v-model="userForm.district" style="width:100%" key="district">
          <el-option label="蔡甸" value="蔡甸区"></el-option>
          <el-option label="黄陂" value="黄陂区"></el-option>
          <!-- <el-option label="机场" value="机场"></el-option> -->
          <el-option label="江夏" value="江夏区"></el-option>
          <el-option label="新洲" value="新洲区"></el-option>
          <el-option label="东西湖" value="东西湖区"></el-option>
          <!-- <el-option label="洪山东湖高新" value="洪山东湖高新"></el-option> -->
        </el-select>
        <el-select :clearable=true v-else v-model="userForm.district" style="width:100%" key="admin">
          <el-option label="全部" value="林业局"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>       
        <el-button type="warning" @click="clear" :loading="loading">清空信息</el-button>
        <el-button type="primary" @click.once="create">创建用户</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { createUser } from "@/api/user"

  export default {
    name: '',
    data() {
      const validateConfirmPsd = (rule, value, callback) => {
        if(value != this.userForm.password){
          callback(new Error('密码不一致！'))       
        }else{
          callback()
        }
      }
      return {
        userForm:{
          username:"",
          password:"",
          confirmPsd:"",
          role:"1",
          district:""
        },
        district:false,
        createRules:{
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '长度大于6个字符', trigger: 'blur' }            
          ],
          confirmPsd: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { required: true, trigger: 'blur',validator: validateConfirmPsd}
            ],
          role:[{ required: true, trigger: 'change', message: '角色不能为空'}],
          district:[{ required: true, trigger: 'change', message: '区域不能为空'}],
        },
        passwordType:"password",
        loading: false,
      }
    },
    methods:{
      roleChanged(val){
        if(val != 1){
          this.district = true;
          this.userForm.district = "";
        }else{
          this.district = false;
          this.userForm.district = "";          
        }
      },
      clear(){
        this.userForm={
          username:"",
          password:"",
          confirmPsd:"",
          role:"1",
          district:""
        }
      },
      create(){
        this.$refs.userForm.validate(valid =>{
          if (valid) {
            this.loading = true;

            var data = {
              username:this.userForm.username,
              password:this.userForm.password,
              role:this.userForm.role,
              district:this.userForm.district,
            }

            createUser(data).then(res => {
              if(result.status == 200){
                this.$message({
                  message:"修改成功",                
                  type:"success"
                })
              }else{
                 this.$message({
                  message:"修改失败",                
                  type:"error"
                })
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('创建失败!!')
            return false
          }
        })
      }
    }   
  }
</script>

<style scoped>
  .userCard{
    height: 500px;
    width: 420px;
    margin: 0 auto;
    top: 50%;
    transform: translateY(+20%)
  }

  .form{
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
    top: 0
  }
  .title{
    font-size: 25px;
    color:gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  /* .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  } */
</style>
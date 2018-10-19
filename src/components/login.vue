<template>
    <div id="login">
         <div class="logo" @click="toHome">
         </div>
        <div class="login_area">
           <div class="tab">
                <div class="item" :style="tabItem==0?'  border-bottom: 2px solid #ea6f5a; color:  #ea6f5a':''" @click="changeTab">
                     登录
                </div>
               <div class="item" :style="tabItem==1?'  border-bottom: 2px solid #ea6f5a; color:  #ea6f5a':''"  @click="changeTab">
                 注册
               </div>
           </div>
          <div class="login_form" v-if="tabItem==0">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="userCode">
                <Input v-model="form.userCode" placeholder="请输入手机号码">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem prop="user_pwd">
                <Input type="password" v-model="form.user_pwd" placeholder="请输入密码">
                 <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                 </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" long>登录</Button>
              </FormItem>
            </Form>

          </div>
          <div class="login_form" v-if="tabItem==1">
            <Form ref="registerForm" :model="registerParms" :rules="registerRules">
              <FormItem prop="user_email">
                <Input v-model="registerParms.user_email" placeholder="请输入邮箱">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem prop="user_password">
                <Input type="password" v-model="registerParms.user_password" placeholder="请输入密码">
                <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                 </span>
                </Input>
              </FormItem>
              <FormItem prop="user_ensure_pwd">
                <Input type="password" v-model="registerParms.user_ensure_pwd" placeholder="请再次输入密码密码">
                <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                 </span>
                </Input>
              </FormItem>
              <FormItem prop="code">
                <div style="display: flex;justify-content: space-around">
                <Input v-model="registerParms.code" placeholder="请输入邮箱验证码"  style="width: 180px">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                </span>
                </Input>
                <Button type="success" @click="getEmailCode" :disabled="count!=60">{{codeDesc}}</Button>
                </div>
              </FormItem>
              <FormItem prop="user_name">
                <Input v-model="registerParms.user_name" placeholder="请输入用户名">
                <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleRegisterSubmit" type="primary" long>注册</Button>
              </FormItem>
            </Form>

          </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Cookies from 'js-cookie';

    export default {
        data() {
          // const validatePhone = (rule, value, callback) => {
          //   if (value != '') {
          //     var n = Number(value);
          //
          //
          //     if (!this.$util.validatemobile(value))
          //     {
          //        callback(new Error('手机号码不合法'));
          //     }
          //     else
          //     {
          //       callback();
          //     }
          //   }
          // };
          const validateEmail = (rule, value, callback) => {
            if (value != '') {
              var n = Number(value);
              if (!this.$util.checkEmail(value))
              {
                callback(new Error('邮箱不合法'));
              }
              else
              {
                callback();
              }
            }
          };
            return {
              tabItem:0,
              from:'home',
              form:{
                userCode:'',
                user_pwd:''
              },
              codeDesc:"获得验证码",
              registerParms:{
                   user_email:"",
                   user_pwd:"",
                   user_ensure_pwd:'',
                   code:"",
                   user_name:''
              },
              count:60,//倒计时
              rules:{
                userCode: [
                  { required: true, message: '请输入手机号或者邮箱', trigger: 'blur' },

                ],
                user_pwd: [
                  { required: true, message: '密码不能为空', trigger: 'blur' }
                ],

              },
              registerRules:{
                user_email: [
                  { required: true, message: '请输入邮箱', trigger: 'blur' },
                  { validator: validateEmail, trigger: 'blur' }
                ],
                user_password: [
                  { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                user_ensure_pwd: [
                  { required: true, message: '请在次输入密码', trigger: 'blur' }
                ],
                code: [
                  { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
                ],
                user_name: [
                  { required: true, message: '请输入用户名', trigger: 'blur' }
                ],

              },

            }
        },
        created: function () {
          // if(this.$route.query.from!=undefined&this.$route.query.from!='')
          // {
          //
          //     this.from=this.$route.query.from;
          // }

        },
        computed: mapGetters({

        }),
        watch: {

        },
        methods: {
          toHome()
          {
              this.$router.push({name:"home"});
          },
          changeTab()
          {
              this.tabItem=  this.tabItem==0?1:0;
          },
          handleSubmit()
          {
              this.$refs.loginForm.validate((valid) => {
                if (valid) {
                  this.login();
                }
              });
          },
          handleRegisterSubmit()
          {
            this.$refs.registerForm.validate((valid) => {
              if (valid) {
                this.$util.confirmDialog(this,"确认注册","您确认注册?",self=>{
                  self.registerUser();
                })

              }
            });

          },
          login()
          {
             var self=this;
             this.$api.login(this.form).then(res=>{
               self.handleLoginRes(res)

             }).catch(e=>{

             })

          },
          registerUser()
          {
            var self=this;
            this.$api.registerUser(this.registerParms).then(res=>{
              if (res.code==200)
              {
                  self.$Message.info('注册成功');
                  self.tabItem=0;
              }
              else {
                self.$Message.error(res.errorMsg);
              }

            }).catch(e=>{

            })

          },
          getEmailCode()
          {
              if (this.registerParms.user_email=='')
              {
                this.$Message.error('请输入邮箱');
                 return;
              }

              var params={user_email:this.registerParms.user_email};
              var self=this;
              this.$api.getEmailCode(params).then(res=>{
                 if (res.code==200)
                 {
                   self.handleTimeCount();

                 }
                 else {
                     self.$Message.error("获取邮箱验证码失败");
                 }



              }).catch(e=>{

              })

          },
          handleTimeCount()
          {
            var timer = setInterval(() => {
              if (this.count > 0 && this.count <= 60) {
                this.count--;
                this.codeDesc=`剩余 ${this.count}秒`;
              } else {
                this.count=60;
                this.codeDesc="获得验证码",
                clearInterval(timer);
                timer = null;
              }
            }, 1000)
          },

          handleLoginRes(res) {
            if (res.code == 0) {
               localStorage.token=res.result.token;
               localStorage.user_name=res.result.user_name;
               localStorage.user_phone=res.result.user_phone;
               localStorage.user_id=res.result.user_id;
               localStorage.user_image_url=res.result.user_image_url;
              this.$Message.info("登录成功");
              this.$router.push({name:this.from});
              this.$store.commit(this.$constantUtils.QUIT_LOGIN,true);
            }
            else
            {
                this.$Message.error(res.message);
            }

          }

        },
        filters: {

        },

        components: {

        }
    }

</script>

<style lang='less'>
  @import './login.less';

</style>


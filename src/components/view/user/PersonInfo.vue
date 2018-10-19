<template>
  <div id="person-info">
     <h3>
        个人基本信息编辑:
     </h3>
    <Form :model="formItem" :label-width="80" :rules="ruleValidate">
      <FormItem label="头像" props="user-im">
        <upload-icon :maxUpload='1' @getImageUrl="setImageUrl" ref="uploadIcon"></upload-icon>
      </FormItem>
      <FormItem label="昵称" props="nickname">
        <Input v-model="formItem.nickname" placeholder="昵称"></Input>
      </FormItem>
      <FormItem label="姓名" props="user_name">
        <Input v-model="formItem.user_name" placeholder="姓名"></Input>
      </FormItem>
       <FormItem label="手机号码" props="user_phone">
        <Input v-model="formItem.user_phone" placeholder="手机号码"></Input>
      </FormItem>
      <FormItem label="地区" props="user_address">
        <Input v-model="formItem.user_address" placeholder="地区"></Input>
      </FormItem>
      <FormItem label="人生格言" prop="user_says">
        <Input v-model="formItem.user_says" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="人生格言"></Input>
      </FormItem>
      <FormItem label="个人简介" prop="user_description">
        <Input v-model="formItem.user_description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="个人简介..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="saveInfo">保存</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import uploadIcon from '../../my_components/uploadIcon'
  export default{
    data()
    {
      return{
        formItem:{
          user_image_url:'',
          nickname:'',
          user_name:'',
          user_description:'',
          user_says:'',
          user_address:'',
          user_school:'',
          user_phone:''

        },
        ruleValidate:{},
        defaultIcon:[],

      }
    },
    created:function(){
      this.getUserInfo();

    },
    computed:mapGetters({

    }),
    watch:{

    },
    methods:{
      getUserInfo()
      {
          this.$api.getUserDetialInfo({user_id:localStorage.user_id}).then(res=>{
            if(res.code==0)
            {
               this.formItem.user_image_url=res.result.user_image_url;
               this.formItem.nickname=res.result.nickname;
               this.formItem.user_name=res.result.user_name;
               this.formItem.user_school=res.result.user_school;
               this.formItem.user_phone=res.result.user_phone;
               this.formItem.user_address=res.result.user_address;
               this.formItem.user_says=res.result.user_says;
               this.formItem.user_description=res.result.user_description;
               if(this.formItem.user_image_url!='')
               {
                  var icon={url:this.formItem.user_image_url};
                  this.$refs.uploadIcon.setInit(icon)
               }

            }

         })
      },
      setImageUrl(res)
      {
        this.formItem.user_image_url=res;
      },
      saveInfo()
      {
           this.formItem.user_id=localStorage.user_id;
          this.$util.confirmDialog(this,'提示','确认保存信息?',self=>{
              self.$api.saveUserInfo(self.formItem).then(res=>{
                   if(res.code==200)
                   {
                      this.$Message.info('修改成功');
                      this.$router.back();
                      localStorage.nickname=this.formItem.nickname;
                      localStorage.user_image_url=this.formItem.user_image_url;
                      this.$store.commit(this.$constantUtils.REFRESH_USER_INFO,0)

                   }
              })


          })
      }

    },
    filters:{

    },

    components:{
      uploadIcon

    }
  }

</script>

<style lang='less'>
    #person-info{
       width: 600px;
       margin-top: 120px;
      h3{
          margin-left: 20px;
          margin-bottom: 20px;
      }


    }
</style>


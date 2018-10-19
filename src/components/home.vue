<template>
  <div id="home_index">
      <div class="top_bar">
           <div  class="icon">
           </div>
           <div class="nav">
              <menu-nav :menuArray="menuArray"></menu-nav>

           </div>
        <div class="person_bar" v-if="user_id!=''">

                <img :src="user_image_url" class="icon_person"/>

              <Dropdown @on-click="handleDrowEvent">
                <a href="javascript:void(0)">
                  <span>{{user_name}}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list" >
                   <DropdownItem name='0'>个人中心</DropdownItem>
                  <DropdownItem  name='1'>信息编辑</DropdownItem>
                   <DropdownItem  name='2'>退出</DropdownItem>
                </DropdownMenu>
              </Dropdown>
        </div>
        <div v-if="user_id==''" @click="toLogin" class="to_login">
            <span>登录(注册)</span>
        </div>

      </div>
    <div class="content">
      <transition name="fade"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import  menuNav from './my_components/menuNav'
  export default{
    data()
    {
      return{
        mode:'horizontal',
        theme:'light',
        user_id:'',
        user_name:'',
        user_image_url:'',
        menuArray:[
          {
            name:'首页',
            key:'blog/home',
          },
          {
            name:'专题推荐',
            key:'blog/special',
          },
          {
            name:'热门关注',
            key:'home',
          },

        ],

      }
    },
    created:function(){
      this.init();


    },
     mounted: function() {

    },
    computed:mapGetters({
        refreshState:'getRefreshTime'


    }),
    watch:{
       refreshState:'init'

    },
    methods:{
       init()
       {
         this.user_id=localStorage.user_id;
         this.user_image_url=localStorage.user_image_url;
         this.user_name=localStorage.user_name;

       },
      handleDrowEvent(name)
      {
        if(name==0)
        {
          this.$router.push({name:"blog/userDetial",query:{user_id:localStorage.user_id}});
        }
        else if(name==1)
        {
          this.$router.push({name:this.$constantUtils.PERSONAL_INFO_EDIT,query:{user_id:localStorage.user_id}});
        }
        if(name==2)
        {
          this.quitLogin();
        }

      },
      toLogin()
      {
         this.$router.push({name:'login'});
      },
      quitLogin()
      {

          this.$util.confirmDialog(this,'确认退出?','您确认退出登录?',self=>{
            localStorage.user_id='';
            localStorage.user_image_url='';
            localStorage.user_name='';
            this.$store.commit(this.$constantUtils.QUIT_LOGIN,false);
            self.init();
          })
      },

    },
    filters:{

    },

  components:{
      menuNav

    }
  }

</script>

<style lang='less'>
   @import './home.less';

</style>


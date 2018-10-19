<template>
  <div id="user_attention">
    <ul class="main_area">
      <li class="one_item" v-for="item in attentionList">
        <img :src="item.user_image_url" class="icon_person"/>
        <div class="center_area">
          <h3>{{item.nickname}}</h3>
          <p>{{item.user_says}}</p>
        </div>
        <div class="right_button" v-if="!item.hasAttention"   @click="changeAttentionUser(item)">
          <i class="iconfont icon-iconfontadd"></i>
          <span>关注</span>
        </div>
        <div v-if="item.hasAttention" class="has" @click="changeAttentionUser(item)"><i class="iconfont icon-duihao"></i><span>已关注</span></div>
      </li>

    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    data()
    {
      return{
        params:{
          user_id:'',
          pageSize:10,
          pageNo:1
        },
        attentionList:[],
        totalCount:0,
        isPersonal:false,

      }
    },
    created:function(){
      this.init();

    },
    computed:mapGetters({

    }),
    watch:{

    },
    methods:{
      init()
      {
        this.params.user_id=this.$route.query.user_id;
        if (this.params.user_id==localStorage.user_id)
        {
          this.isPersonal=true;
        }
        var self=this;
        this.$api.getUserFansList(this.params).then(res=>{
          if (res.code==200)
          {
            var userArray=[];
            for (var item of res.data)
            {
              item.hasAttention=false;
              userArray.push(item.attention_user_id);

            }
            self.judgeIsAttentionAuthor(userArray);
            self.attentionList=res.data;
            self.totalCount=self.count;

          }
          else {
              self.$Message.error('获得关注列表失败');
          }
        })
      },
      changeAttentionUser(item)
      {

        if (localStorage.user_id=='')
        {
          this.$Message.error('请先登录')
          return;
        }
        /*
         type:0 关注好友 1:取消关注
        */

        var params={user_id:localStorage.user_id,attention_user_id:item.attention_user_id,type:item.hasAttention?1:0};

        var self=this;
        this.$api.attentionUser(params).then(res=>{
          if (res.code==200)
          {
            item.hasAttention=!item.hasAttention;
            self.$set(self.attentionList,1,self.attentionList[1])
            self.$Message.info('保存成功');
          }
          else {

          }

        }).then(e=>{

        })
      },
      /*
          判断是否关注了文章作者
         */
      judgeIsAttentionAuthor(user){
        //未登录
        if (this.user_id=='')
        {
          return
        }
        var params={user_id:localStorage.user_id,userarray:user}
        var self=this;
        this.$api.judgeAttentionUserArray(params).then(res=>{
          if (res.code==200)
          {
            for (var item of  res.data)
            {
              self.attentionList.filter(one=>{
                if( item.attention_user_id==one.attention_user_id)
                {
                  one.hasAttention=true;
                }
              })

              this.$set(self.attentionList,1,self.attentionList[1]);

            }

          }

        }).then(e=>{

        })
      },





    },
    filters:{

    },

    components:{

    }
  }

</script>

<style lang='less'>
  #user_attention{
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    .main_area{
      width: 100%;
      padding: 10px;
      .one_item{
        display: -webkit-flex;
        display:flex;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f0f0f0;
        .center_area{
          flex-grow:1;
          h3{
            margin-bottom: 8px;
          }
        }
        .right_button{
          width: 100px;
          height: 40px;
          border-radius: 20px;
          background: #00cc66;
          text-align: center;
          line-height: 40px;
          color: #ffffff;
          font-size: 15px;
          &:hover{
            background: #ffffff;
            border: 1px solid  #00cc66;
            color: #00cc66;
          }

        }
        .has{
          &:hover{
            color: #CC4646;

          }

        }

      }


    }


  }
</style>


<template>
  <div id="user_article">
    <ul class="ul_area">
      <li v-for="item in commentList">

        <h3 @click="checkDetial(item)">
          {{item.article_name}}
        </h3>
        <p>
          {{item.content}}
        </p>
        <div class="bottom">
          <div style="flex-grow: 1">
            <i class="iconfont icon-dianzan1">
            </i>
            <span>
                     {{item.praise_num}}
                   </span>
            &nbsp
            &nbsp
            <i class="iconfont icon-pinglun1">
            </i>
            <span>
                   {{item.reply_num}}
                </span>
            &nbsp
            &nbsp
            <span>
                    {{item.publicDate}}
                 </span>

          </div>


        </div>

      </li>
    </ul>
    <Page :total="totalCount" show-total size="small" @on-change="getPersonalComment"></Page>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        user_id:'',
        params:{
          commit_user_id:'',
          pageNo:1,
          pageSize:8,
        },
        commentList:[],
        totalCount:0,
        isPersonal:false,

      }
    },
    created: function () {
      this.init();

    },
    computed: mapGetters({

    }),
    watch: {

    },
    methods: {
      init()
      {


        this.params.commit_user_id=localStorage.user_id;
        this.getPersonalComment();

      },
      getPersonalComment(no)
      {
        this.params.pageNo=no>0?no:1;
        var self=this;
        this.$api.getPersonalComment(this.params).then(res=>{
          if (res.code==200)
          {
            self.commentList=res.data;
            self.totalCount=res.count;
          }

        })
          .then(e=>{

          })
      },
      checkDetial(item)
      {
        var article_id=item.article_id;

        this.$router.push({name:"blog/articleDetial",query:{article_id:article_id}})

      },
      deleteArticle(item)
      {
        this.$util.confirmDialog(this,'确认删除','确认删除文章',self=>{
          self.ensureDelete(item);

        })

      },
      toEdit(article_id)
      {
        this.$router.push({name:"blog/publishArticle",query:{ article_id:article_id}});

      },
      ensureDelete(item)
      {
        var params={article_id:item.article_id};
        var self=this;
        this.$api.deleteArticle(params).then(res=>{
          if (res.code==200)
          {
            self.$Message.info('删除成功');
            self.searchArticle(self.params.pageNo,3);
          }

        })
          .then(e=>{

          })


      },


    },
    filters: {

    },

    components: {

    }
  }

</script>

<style lang='less'>
  .ul_area{
    li{
      border-bottom: 1px solid #f0f0f0;
      word-break: break-word;
      margin: 0 0 15px;
      height: 135px;
      h3{
        font-size: 16px;
        line-height: 28px;
        &:hover{
          color:#CC4646;
        }
      }
      p{
        height: 80px;
      }
      .bottom{
        width:100%;
        display: -webkit-flex;
        display: flex;
        .item_right{
          display: -webkit-flex;
          display: flex;
          i:hover{
            color: #CC4646;
          }

        }
      }

    }
  }
</style>


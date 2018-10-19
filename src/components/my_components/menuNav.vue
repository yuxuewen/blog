<template>
    <div class="menuNav">
        <ul>
            <li v-for="item in menu" @click="changeChoose(item.key)" :class="item.key==$route.name?'active':''">
                 {{item.name}}
            </li>
        </ul>
        <input  placeholder="输入关键字搜素" v-model="keywords" @keyup.enter="toSearch"/>
        <div class="icon_area" @click="toSearch"><i class="iconfont icon-search"></i></div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'



    export default {
      props:{
        menuArray:{
            default:[],
            type:Array,
        },

      },
        data() {
            return {
                menu:[
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
              keywords:'',

            }
        },
        created: function () {

        this.init()

        },
        computed: mapGetters({
          keywordsData:'getKeywords'

        }),
       mounted:function(){

      },
        watch: {
          keywordsData:'setKeywords'


        },
        methods: {
        init()
        {
           if (this.menuArray.length!=0)
           {
               this.menu=this.menuArray;
           }
        },
          setKeywords()
          {
              this.keywords=this.keywordsData+'';
          },
          changeChoose(key)
          {
              this.$router.push({name:key});

          },
          toSearch()
          {
              if (this.keywords=='')
              {
                 this.$Message.error('请输入关键字');
                 return;
              }
               this.$store.commit(this.$constantUtils.SEARCH_KEYWORDS,this.keywords);

              if (this.$route.name!=this.$constantUtils.SEARCH_ROUTE)
              {
                 this.$router.push({name:this.$constantUtils.SEARCH_ROUTE});

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
    .menuNav{
       width: 100%;
       display: -webkit-flex;
       display: flex;
        align-items: center;
       ul{
         width: 100%;
         font-size: 18px;
         line-height: 50px;

         li{
           padding-right: 30px;
           color: #999;
           float: left;


         }

       }
      .active{
        color: #fff;
      }
      input{
          height: 30px;
          width: 150px;
          border-radius: 15px;
          border:none;
          padding-left: 20px;
        transition: width 0.5s;
        -moz-transition: width 0.5s; /* Firefox 4 */
        -webkit-transition: width 0.5s; /* Safari 和 Chrome */
        -o-transition: width 0.5s;
          &:focus{
            width: 200px;

          }
      }
      .icon_area{
          margin-left: -25px;
          line-height: 30px;
          &:hover{
              color: #CC4646;
          }
      }


    }

</style>


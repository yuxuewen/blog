<template>
    <div>
    <Menu mode="horizontal" :theme="theme" :active-name="$route.name" @on-select="changeMenu">
        <MenuItem name="1" v-for="item in menuArray" :name="item.key">
             <i :class="item .icon"></i>
             {{item.menuName}}
        </MenuItem>
    </Menu>
    </div>
</template>
<script>

    export default {
        props:{
            menuArray: {
                type: Array,
                default:[]
            },
            theme:{
                type: String,
                default:'light'
            },
            activeName:{
                type: String,
                default:''
            }
        },
        data () {
                return {

                }
            },
        created:function(){

        },

        watch:{

        },
        methods:{
            changeMenu(active)
            {
                     var data=this.menuArray.filter(item=>{
                          return item.key==active;
                     })
                   if (data.length>0)
                   {
                      if (data[0].query!=undefined)
                      {
                        this.$router.push({name:active,query:data[0].query})
                         return;
                      }
                     this.$router.push({name:active})
                   }

            }
        },
        filters:{

        },

        components:{

        }
        // data () {
        //     return {
        //
        //     }
        // },
        // mounted:function () {
        //     this.changeMenu(this.activeName)
        //
        // },
        // methods()
        // {
        //
        // },
    }
</script>

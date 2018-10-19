<template>
  <div class="swiper-box">
    <swiper :options="swiperOption" ref="mySwiper"  class="swiper-wrapper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in relatedList" :key="index" class="swiper-slide">
        <div class="swiper-slide" :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"></div>
      </swiper-slide>
      <!-- Optional controls -->
      <div id="swiperOwn" class="swiper-pagination" slot="pagination"></div>

    </swiper>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default{
    props:{
      relatedList:{
        default:[],
        type:Array
      },
    },
    data()
    {
      return {
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          pagination: {
            el: '.swiper-pagination',
            clickable:true,

          },

          autoplay: {
            autoplayDisableOnInteraction: false,
            delay:1000,
          },
          speed:300,
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          slidesPerView:4,
          mousewheel:true ,
        },
      }
    },
    created:function(){

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
     // this.swiper.slideTo(3, 1000, false)
    },
    watch:{

    },
    methods:{

    },
    filters:{

    },

    components:{
      swiper,
      swiperSlide

    }
  }

</script>

<style lang='less'>

  .swiper-box{
     width: 100%;
      height: 160px;
    min-width: 960px;
  }

</style>


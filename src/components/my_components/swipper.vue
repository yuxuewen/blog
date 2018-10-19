<template>
  <div id="swiper-container">
    <swiper :options="swiperOption" ref="mySwiper"  class="swiper-wrapper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in bannerList" :key="index" class="swiper-slide">
        <div class="swiper-slide" :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"></div>
      </swiper-slide>
      <!-- Optional controls -->
      <div id="swiperOwn" class="swiper-pagination" slot="pagination"></div>

    </swiper>

  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    props:{
      bannerList:{
         default:[],
         type:Array

      },
      swiperOption:{
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
        slidesPerView:1,
        mousewheel:true ,

      },
    },
    mounted() {
      //this.swiper.slideTo(1, 1000, true)


    },
    methods:{
      play()
      {

      },

    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    components: {
      swiper,
      swiperSlide,
    },
  }
</script>

<style lang="less">
  #swiper-container {
    width: 100%;
    height: 500px;
    min-width: 960px;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination-bullet {
      width:0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
    }
  }
</style>

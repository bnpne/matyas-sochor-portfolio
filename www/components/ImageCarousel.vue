<script setup lang='ts'>
defineProps(['images', 'containerClass', 'slideClass'])
</script>

<template>
  <Swiper class='swiper-container' :modules='[SwiperFreeMode]' :class='containerClass' v-if='images'
    :slides-offset-before='24' :slides-per-view='"auto"' :space-between='10' :centered-slides='false' :free-mode='true'
    :slide-class='slideClass'>
    <div class='swiper-fade-start'></div>
    <SwiperSlide :class='slideClass' v-for='image in images'>
      <SanityImage class='swiper-image' :asset-id='image.asset?._ref' auto='format' />
    </SwiperSlide>
  </Swiper>
</template>

<style lang='scss'>
.swiper-container {
  position: relative;
}

.swiper-image {
  @include rounded();
  overflow: hidden;

  &>img {
    @include image-default();
  }
}

.swiper-fade {

  &-start {
    height: 100%;
    position: absolute;
    z-index: 3;
    width: 32px;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #FFFFFF 41%, rgba(115, 115, 115, 0) 100%);
  }
}
</style>

<script setup lang='ts'>
defineProps(['images', 'containerClass', 'slideClass'])
</script>

<template>
  <Swiper class='swiper-container' :modules='[SwiperFreeMode]' :class='containerClass' v-if='images'
    :slides-per-view='"auto"' :space-between='10' :centered-slides='false' :free-mode='true' :slide-class='slideClass'>
    <SwiperSlide :class='slideClass' v-for='image in images'>
      <SanityImage class='swiper-image' :asset-id='image.asset?._ref' auto='format' w='1000' fit='clip' />
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
</style>

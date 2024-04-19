<script setup lang='ts'>
defineProps(['images', 'containerClass', 'slideClass'])
const app = useNuxtApp()
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
  cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkRyYWciPgo8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIyNCIgZmlsbD0id2hpdGUiLz4KPGcgaWQ9ImljX2RyYWciPgo8cGF0aCBkPSJNMjAuMDQ4NiAyMEwyMSAyMC45NEwxNy45MDk2IDI0TDIxIDI3LjA2TDIwLjA0ODYgMjhMMTYgMjRMMjAuMDQ4NiAyMFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNy45NTE0IDI4TDI3IDI3LjA2TDMwLjA5MDQgMjRMMjcgMjAuOTRMMjcuOTUxNCAyMEwzMiAyNEwyNy45NTE0IDI4WiIgZmlsbD0iYmxhY2siLz4KPC9nPgo8L2c+Cjwvc3ZnPgo=') 50 50, pointer;
}

.swiper-image {
  @include rounded();
  overflow: hidden;

  &>img {
    @include image-default();
  }
}
</style>

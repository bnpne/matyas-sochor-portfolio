<script setup lang='ts'>
import gsap from 'gsap'
defineProps(['images', 'containerClass', 'slideClass'])
const app = useNuxtApp()
const swiperContainer = ref(null)
const { isMobile, isSafari } = useDevice()

let setCursorPosition = function (s, e, cp) {
  let bounds = s.getBoundingClientRect()
  let xPosition = (e.clientX - bounds.left) - cp.clientWidth / 2 + "px";
  let yPosition = (e.clientY - bounds.top) - cp.clientHeight / 2 + "px";
  cp.style.transform =
    "translate(" + xPosition + "," + yPosition + ") scale(1)";
  return {
    x: xPosition,
    y: yPosition
  };
};

onMounted(() => {
  if (!isMobile && !isSafari) {
    let cp = gsap.utils.toArray('.cursor-carousel-object')
    if (swiperContainer.value) {
      // swiperContainer.value.on('swiperMove', (s, e) => {
      //   console.log(s, e)
      // })
      let timeout
      swiperContainer.value.addEventListener('mousemove', (e) => {
        setTimeout(() => {

          cp[0].style.opacity = 1
        }, 250)
        setCursorPosition(swiperContainer.value, e, cp[0])
      })
      swiperContainer.value.addEventListener('mouseleave', () => {
        setTimeout(() => {

          cp[0].style.opacity = 0
        }, 251)
      })
    }
  }
})
</script>

<template>
  <div class='swiper-w anima-fade' ref='swiperContainer'>
    <Swiper class='swiper-container anima-scale' :modules='[SwiperFreeMode]' :class='containerClass' v-if='images'
      :slides-per-view='"auto"' :space-between='10' :centered-slides='false' :free-mode='true'
      :slide-class='slideClass'>
      <div class='cursor-carousel-object'>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <rect width="48" height="48" rx="24" fill="#fff" />
          <path
            d="m20.049 20 .951.94L17.91 24 21 27.06l-.951.94L16 24l4.049-4ZM27.951 28 27 27.06 30.09 24 27 20.94l.951-.94L32 24l-4.049 4Z"
            fill="#000" />
        </svg>
      </div>
      <SwiperSlide :class='slideClass' v-for='image in images'>
        <SanityImage class='swiper-image' :asset-id='image.asset?._ref' auto='format' w='2000' fit='clip' />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang='scss'>
.cursor-carousel-object {
  position: absolute;
  display: block;
  opacity: 0;
  top: 0;
  z-index: 100;
  transition: all 100ms ease-out;
  //cursor: url('~/assets/svg/grab-svg.svg'), pointer;
  pointer-events: none;

  &>svg {
    width: desktop-vw(48px);
    height: desktop-vw(48px);
  }

  @include mobile() {
    display: none;
  }
}

.swiper-w {
  position: relative;
  width: calc(100% + desktop-vw(10px));
}

.swiper-container {
  position: relative;
  //cursor: url('~/assets/svg/grab-svg.svg') 50 50, pointer;
  cursor: none;
  padding-right: desktop-vw(10px);
  //cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkRyYWciPgo8cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIyNCIgZmlsbD0id2hpdGUiLz4KPGcgaWQ9ImljX2RyYWciPgo8cGF0aCBkPSJNMjAuMDQ4NiAyMEwyMSAyMC45NEwxNy45MDk2IDI0TDIxIDI3LjA2TDIwLjA0ODYgMjhMMTYgMjRMMjAuMDQ4NiAyMFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNy45NTE0IDI4TDI3IDI3LjA2TDMwLjA5MDQgMjRMMjcgMjAuOTRMMjcuOTUxNCAyMEwzMiAyNEwyNy45NTE0IDI4WiIgZmlsbD0iYmxhY2siLz4KPC9nPgo8L2c+Cjwvc3ZnPgo='), pointer;
}

.swiper-wrapper {
  padding-right: desktop-vw(10px);
}

.swiper-image {
  @include rounded();
  overflow: hidden;

  &>img {
    @include image-default();
  }
}
</style>

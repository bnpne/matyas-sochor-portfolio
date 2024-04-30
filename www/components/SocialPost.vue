<script setup lang='ts'>
import { getHours, getMinutes } from 'date-fns'
import gsap from 'gsap'
import { formatInTimeZone } from 'date-fns-tz'

const d = ref(new Date())
const time = computed(() => {
  let k = formatInTimeZone(d.value, 'Europe/Prague', 'h:mm a')
  return k
})

defineProps(['post'])
const store = useStore()
const { socialPostLikes } = storeToRefs(store)
const heart = ref()
const miniHeartRed = ref()
const miniHeartGray = ref()

const like = ref(null)
let postLiked = false

// Set random number for social post
const number = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000)

// like the post
const likePost = () => {
  if (!postLiked) {
    store.incrementPostLikes()
    // gsap.to('.heart', { keyframes: [{ y: '-10%', rotate: 20, opacity: 1, duration: .6 }, { y: '0%', rotate: 0, opacity: 0, delay: .25, duration: 1 }], ease: 'heart' })

    let tl = gsap.timeline({ defaults: { ease: 'heart', duration: .3, } })
    tl.fromTo('.mini-heart-gray', { scale: 1 }, { scale: 1.4, duration: .2, onComplete: toggleLike() })
    tl.fromTo('.mini-heart-red', { scale: 1.4 }, { scale: 1, duration: .5, ease: 'bounce' })

  } else {
    store.decrementPostLikes()
    // gsap.set('.heart', { opacity: 0, rotate: 0, y: '220%' })
    let tl = gsap.timeline({ defaults: { ease: 'heart', duration: .3, } })
    tl.fromTo('.mini-heart-red', { scale: 1 }, { scale: 1.4, duration: .2, onComplete: toggleLike() })
    tl.fromTo('.mini-heart-gray', { scale: 1.4 }, { scale: 1, duration: .5, ease: 'bounce' })
  }
}

const toggleLike = () => {
  if (!postLiked) {
    postLiked = true
    miniHeartGray.value.style.opacity = 0
    miniHeartRed.value.style.opacity = 1
  } else {
    postLiked = false
    miniHeartGray.value.style.opacity = 1
    miniHeartRed.value.style.opacity = 0
  }
}

onMounted(() => {
  store.setSocialPostLikeNumber(number)

  setInterval(() => {
    d.value = new Date()
  }, 1000)
})
</script>

<template>
  <div v-if="post" class='sidebar-post pre-anima'>
    <div @dblclick.native='likePost' class='sidebar-post-overlay'></div>
    <div class='sidebar-post-text'>
      <SanityContent :blocks="post?.postText" />
    </div>
    <div class='sidebar-post-footer'>
      <!-- todo: Add counter -->
      <div ref='like' class='sidebar-post-footer-likes' @click='likePost'>
        <div class='sidebar-post-footer-likes-hearts'>
          <svg ref='miniHeartGray' class='mini-heart-gray' viewBox="0 0 16 15" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.4454 1.04336H11.4455C11.9198 1.04336 12.3895 1.13679 12.8278 1.31831L13.056 0.767377L12.8278 1.31831C13.266 1.49984 13.6642 1.76591 13.9996 2.10132C14.335 2.43674 14.6011 2.83493 14.7826 3.27317C14.9641 3.71142 15.0576 4.18112 15.0576 4.65547C15.0576 6.6176 13.9376 8.47367 12.3962 10.115C10.9902 11.612 9.30134 12.8591 7.9992 13.7666C6.69705 12.8591 5.00816 11.612 3.60221 10.115C2.06078 8.47367 0.94082 6.6176 0.94082 4.65547C0.94082 3.69748 1.32138 2.77872 1.99878 2.10132C2.67618 1.42392 3.59494 1.04336 4.55293 1.04336H4.55302C5.13296 1.04327 5.70436 1.18313 6.2187 1.45104C6.73305 1.71896 7.17515 2.10703 7.50748 2.58231L7.9992 3.28553L8.49091 2.58231C8.82325 2.10703 9.26535 1.71896 9.7797 1.45104C10.294 1.18313 10.8654 1.04327 11.4454 1.04336Z"
              stroke="black" stroke-opacity="0.5" stroke-width="1.2" />
          </svg>
          <svg ref='miniHeartRed' class='mini-heart-red' viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.4512 4.03164H13.4513C13.9266 4.03164 14.3972 4.12525 14.8363 4.30713L15.0652 3.7545L14.8363 4.30713C15.2754 4.48901 15.6743 4.75559 16.0104 5.09166C16.3465 5.42773 16.6131 5.8267 16.7949 6.26579C16.9768 6.70489 17.0704 7.1755 17.0704 7.65077C17.0704 9.61656 15.9484 11.476 14.4043 13.1201C12.9958 14.6199 11.3037 15.8693 9.99928 16.7783C8.69487 15.8693 7.0028 14.6199 5.59422 13.1201C4.05016 11.476 2.92813 9.61656 2.92813 7.65077C2.92813 6.69092 3.30943 5.77038 3.98814 5.09166C4.66686 4.41294 5.5874 4.03164 6.54726 4.03164H6.54735C7.12842 4.03156 7.70093 4.17168 8.21627 4.44012C8.73162 4.70856 9.17458 5.09738 9.50756 5.57358L9.99928 6.2768L10.491 5.57358C10.824 5.09738 11.2669 4.70856 11.7823 4.44012C12.2976 4.17168 12.8701 4.03156 13.4512 4.03164Z"
              fill="#F02F2F" stroke="#F02F2F" stroke-width="1.2" />
          </svg>
        </div>
        <span>{{ socialPostLikes }}</span>
      </div>
      <!-- todo  -->
      <div class='sidebar-post-footer-location'>
        <!-- todo: Add local time -->
        <div>{{ time }}</div>
        <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E" fill-opacity="0.25" />
        </svg>
        <div>{{ post?.postLocation }}</div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.mini-heart-gray {
  width: desktop-vw(15px);
  height: desktop-vw(16px);

  @include mobile() {
    width: mobile-vw(15px);
    height: mobile-vw(16px);
  }
}

.mini-heart-red {
  width: desktop-vw(20px);
  height: desktop-vw(20px);

  @include mobile() {
    width: mobile-vw(15px);
    height: mobile-vw(16px);
  }
}

.sidebar-post {
  @include rounded-border();
  padding: desktop-vw(12px);
  display: flex;
  flex-direction: column;
  gap: desktop-vw(16px);
  position: relative;

  @include mobile() {
    padding: mobile-vw(12px);
    gap: mobile-vw(16px);
  }

  &-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background: transparent;
    @include rounded();
    cursor: pointer;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .heart {
    position: absolute;
    top: 10%;
    left: 50%;
    opacity: 0;
    transform: translateX(-50%) translateY(220%);

  }

  &-text {
    @include sans-serif-regular();
  }

  &-footer {
    color: $black50;
    font-size: desktop-vw(13px);
    display: flex;
    justify-content: space-between;

    @include mobile() {
      font-size: mobile-vw(13px);
    }

    &-likes {
      display: flex;
      flex-direction: row;
      gap: desktop-vw(5px);
      position: relative;
      z-index: 10;

      align-items: center;
      cursor: pointer;
      pointer-events: auto;

      @include mobile() {
        gap: mobile-vw(5px);
      }

      &:hover {
        color: $black75;
      }

      &-hearts {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .mini-heart-gray {
        position: relative;
        opacity: 1;
      }

      .mini-heart-red {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
      }
    }

    &-location {
      display: flex;
      align-items: center;
      gap: desktop-vw(4px);

      @include mobile() {
        gap: mobile-vw(4px);
      }
    }
  }
}
</style>

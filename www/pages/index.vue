<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  pageTransition: {
    css: false,
    name: 'home',
    mode: 'out-in',
    onEnter(el, done) {
      const app = useNuxtApp()

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'circ.out' },
        onComplete: () => {
          app.$scrollStart()
          done()
        }
      })

      tl.to('.t-o', { opacity: 0, duration: .75, delay: .25, ease: 'circ.out', onComplete: app.$scrollToTop() })
    },
    onLeave(el, done) {
      const app = useNuxtApp()
      app.$scrollStop()
      gsap.to('.t-o', { opacity: 1, duration: .75, ease: 'circ.out', onComplete: () => { done() } })
    },
  },
})

import { horizontalLoop } from '~/utils/helpers/horizontalLoop'
const projects = ref([])
const store = useStore()
const { allProjects } = storeToRefs(store)
const snippets = ref([])
const cursor = ref([])
const app = useNuxtApp()

let setCursorPosition = function (c, e) {
  let xPosition = e.clientX - c.clientWidth / 2 + "px";
  let yPosition = e.clientY - c.clientHeight / 2 + "px";
  c.style.transform =
    "translate(" + xPosition + "," + yPosition + ") scale(1)";
  return {
    x: xPosition,
    y: yPosition
  };
};

onMounted(() => {
  app.$scrollStart()
  if (snippets) {
    snippets.value.forEach(s => {
      horizontalLoop(s, { paused: false, repeat: -1, speed: .3, })
    })
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          store.setActiveProject(entry.target.dataset.index)
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  if (projects) {
    projects.value.forEach(p => {
      observer.observe(p)
    })

    // projects.value.forEach((p, i) => {
    //   p.addEventListener("mousemove", e => {
    //     setCursorPosition(cursor.value[i], e)
    //   });
    // })
  }
})

onBeforeUnmount(() => {
  // Revert gsap context
  ScrollTrigger.killAll()
})
</script>

<template>
  <div class='home' id='page'>
    <NuxtLayout name='page'>
      <div v-if='allProjects' class='home-container'>
        <NuxtLink :to="`/work/${project.projectSlug?.current}`" v-for="project, index in allProjects"
          class='home-project pre-project'>
          <!-- <svg class='home-project-cursor' ref='cursor' width="104" height="34" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)"><rect y=".941" width="104" height="32.118" rx="16.059" fill="#fff"/><path d="M22.507 20.412c-1.72 0-2.863-1.372-2.863-3.539s1.143-3.539 2.863-3.539c1.73 0 2.883 1.382 2.883 3.54 0 2.156-1.153 3.538-2.883 3.538Zm0-.795c1.243 0 1.998-1.014 1.998-2.744 0-1.73-.755-2.744-1.998-2.744-1.223 0-1.978.995-1.978 2.744 0 1.75.755 2.744 1.978 2.744Zm6.736-4.394c1.402 0 2.436.944 2.436 2.594 0 1.551-1.034 2.595-2.436 2.595-.855 0-1.431-.348-1.74-.835v2.764h-.815v-7.059h.706l.11.816c.337-.467.884-.875 1.74-.875Zm-.08 4.463c1.005 0 1.68-.765 1.68-1.869 0-1.103-.675-1.868-1.68-1.868-.993 0-1.67.765-1.67 1.849 0 1.113.677 1.889 1.67 1.889Zm8.36-1.69h-3.937v.05c.03.965.636 1.64 1.6 1.64.716 0 1.273-.377 1.442-1.033h.825c-.2 1.014-1.034 1.76-2.207 1.76-1.521 0-2.515-1.045-2.515-2.596 0-1.54.974-2.594 2.405-2.594 1.432 0 2.366.905 2.406 2.406 0 .08-.01.248-.02.367Zm-2.377-2.057c-.745 0-1.431.537-1.51 1.362h3.031c-.08-.875-.676-1.362-1.52-1.362Zm6.123-.716c1.093 0 1.988.596 1.988 2.207v2.922h-.815V17.48c0-.985-.477-1.511-1.313-1.511-.894 0-1.47.665-1.47 1.75v2.633h-.816v-5.07h.706l.11.687c.297-.388.804-.746 1.61-.746Zm7.75 5.13h-.865v-6.96h2.544c1.412 0 2.347.836 2.347 2.138s-.935 2.147-2.346 2.147h-1.68v2.674Zm0-6.164v2.694h1.6c.934 0 1.54-.527 1.54-1.352 0-.825-.596-1.342-1.53-1.342h-1.61Zm8.53 1.094h.547v.795h-.656c-1.183 0-1.53.905-1.53 1.71v1.819h1.48v.745h-3.43v-.745h1.134v-3.579H53.96v-.745h1.908l.03.854c.229-.397.686-.854 1.65-.854Zm3.84 5.13c-1.48 0-2.514-1.055-2.514-2.596 0-1.54 1.034-2.594 2.515-2.594s2.515 1.054 2.515 2.594c0 1.541-1.034 2.595-2.515 2.595Zm0-.727c1.005 0 1.681-.785 1.681-1.869 0-1.083-.676-1.868-1.68-1.868s-1.68.785-1.68 1.868c0 1.084.676 1.87 1.68 1.87Zm5.794-6.53c.348 0 .617.268.617.615a.604.604 0 0 1-.617.627.612.612 0 0 1-.626-.627c0-.348.278-.616.626-.616Zm-2.743 2.872v-.745h3.151v5.736c0 .894-.378 1.322-1.322 1.322h-1.83v-.746h1.78c.408 0 .557-.169.557-.556v-5.01H64.44Zm9.245 1.969H69.75v.05c.03.963.636 1.64 1.6 1.64.716 0 1.273-.378 1.442-1.034h.825c-.2 1.014-1.034 1.76-2.207 1.76-1.521 0-2.515-1.045-2.515-2.596 0-1.54.974-2.594 2.405-2.594 1.432 0 2.366.905 2.406 2.406 0 .08-.01.248-.02.367Zm-2.376-2.058c-.745 0-1.431.537-1.51 1.362h3.031c-.08-.875-.676-1.362-1.52-1.362Zm5.904 4.473c-1.481 0-2.456-1.004-2.456-2.584 0-1.551 1.004-2.605 2.476-2.605 1.242 0 2.028.696 2.236 1.81h-.854c-.15-.677-.647-1.084-1.392-1.084-.974 0-1.63.775-1.63 1.879 0 1.103.656 1.858 1.63 1.858.725 0 1.223-.417 1.382-1.063h.864c-.198 1.093-1.023 1.79-2.256 1.79Zm6.95-.06h-1.351c-.974 0-1.322-.427-1.322-1.322v-3.002h-1.343v-.745h1.343V13.86h.815v1.421h1.78v.746h-1.78v2.992c0 .428.149.587.586.587h1.273v.745Z" fill="#1E1E1E"/></g><defs><filter id="a" x="-152.941" y="-152" width="409.882" height="338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="76.471"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_515_6528"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_515_6528" result="shape"/></filter></defs></svg> -->
          <div ref='projects' class='home-project-img pre-image' :data-index='index'>
            <div class='home-project-img-overlay'></div>
            <template v-if='project.projectCaseImage?.projectCaseSelection === "image"'>
              <SanityImage :asset-id="project.projectCaseImage?.image.asset?._ref" auto="format" w='1000' fit='clip' />
            </template>
            <template v-else-if="project.projectCaseImage?.projectCaseSelection === 'video'">
              <SanityFile :asset-id="project.projectCaseImage?.video.asset?._ref">
                <template #default="{ src }">
                  <video autoplay='true' playsinline='true' loop='true' muted :src='src'></video>
                </template>
              </SanityFile>
            </template>
          </div>
          <div v-if='project.projectDetails' class='home-project-details'>
            <div class='home-project-details-info'>
              <p v-if='project.filters' v-for='filter in project.filters'>{{ filter.tagTitle }},</p>
              <p v-if='project.projectDetails?.projectYear'>{{ project.projectDetails?.projectYear.split('-')[0] }},</p>
              <p v-if='project.projectDetails?.awards'>{{ project.projectDetails?.awards.length }} Awards</p>
              <p v-else>{{ project.projectDetails?.agencies[0] }} +{{ project.projectDetails?.agencies.length - 1 }}</p>
            </div>
            <div class='home-project-details-snippet'>
              <div class='home-project-details-snippet-mask'>
                <p ref='snippets' v-if='project.projectSnippet' class='home-project-details-snippet-text'>{{
        project.projectSnippet
      }}</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang='scss'>
.home {
  position: relative;

  @include mobile() {
    display: none;
    visibility: hidden;
  }

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);
  }

  &-project {
    position: relative;
    min-height: desktop-vw(866px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include rounded-border();

    &-cursor {
      position: absolute;
      z-index: 10;
      transition: all ease-out;
      transform: none;
    }

    &-img {
      display: block;
      height: 100%;
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%);
      }

      video {
        flex-grow: 1;
        height: 100%;
        width: 100%;
        vertical-align: top;
        object-fit: cover;
      }

      img {
        flex-grow: 1;
        @include image-default();
      }
    }

    &-details {
      @include small-type();
      color: $white;
      text-transform: uppercase;
      position: absolute;
      bottom: desktop-vw(14px);
      right: desktop-vw(14px);
      display: flex;
      align-items: center;
      gap: desktop-vw(16px);

      &-info {
        display: flex;
        flex-direction: row;
        gap: desktop-vw(4px);
        color: $white50;
      }

      &-snippet {
        overflow: hidden;
        position: relative;
        width: 100%;
        border: $white50 1px solid;
        border-radius: 100px;
        max-width: desktop-vw(245px);

        &-mask {
          mask-image: linear-gradient(90deg, rgba(217, 217, 217, 0) 2.58%, #D9D9D9 7.05%, #D9D9D9 90.53%, rgba(217, 217, 217, 0) 96.85%);
          padding: desktop-vw(2px) desktop-vw(4px);
          position: relative;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        &-text {
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }
      }
    }

  }
}
</style>

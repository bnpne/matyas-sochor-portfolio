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
  ScrollTrigger.refresh(true)
  /// Image Mask
  let st = gsap.utils.toArray('.s-t')
  st.forEach(t => {
    let s = gsap.utils.toArray('.s', t)
    gsap.to(s, {
      y: '30%',
      ease: ' circ.out',
      scrollTrigger: {
        trigger: t,
        scrub: true,
        start: 'top top',
        end: 'bottom top'
      }
    })
  })

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
          class='home-project pre-project s-t'>
          <div ref='projects' class='home-project-img pre-image' :data-index='index'>
            <div class='home-project-img-overlay'></div>
            <template v-if='project.projectCaseImage?.projectCaseSelection === "image"'>
              <SanityImage class='s' :asset-id="project.projectCaseImage?.image.asset?._ref" auto="format" w='1000'
                fit='clip' />
            </template>
            <template v-else-if="project.projectCaseImage?.projectCaseSelection === 'video'">
              <SanityFile :asset-id="project.projectCaseImage?.video.asset?._ref">
                <template #default="{ src }">
                  <video class='s' autoplay='true' playsinline='true' loop='true' muted :src='src'></video>
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
    max-height: desktop-vw(866px);
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
      position: relative;

      &-overlay {
        position: absolute;
        z-index: 2;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%);
      }

      video {
        position: relative;
        z-index: 1;
        flex-grow: 1;
        height: 100%;
        width: 100%;
        vertical-align: top;
        object-fit: cover;
      }

      img {
        position: relative;
        z-index: 1;
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
          display: flex;
          align-items: center;
          gap: 10px;
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

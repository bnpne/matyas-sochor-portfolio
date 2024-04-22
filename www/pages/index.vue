<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: 'Matyas Sochor | Digital Graphic Designer'
})
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
const snippets = ref([])
const cursor = ref([])
const app = useNuxtApp()
const loading = ref(true)
const video = ref([])

const main = useStore()
const store = useData()
const { data } = storeToRefs(store)

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

watch([() => store.isFetched, () => loading.value], async () => {
  if (store.isFetched || !loading) {
    await nextTick()
    ScrollTrigger.refresh(true)
    /// Image Mask

    if (video.value) {
      // console.log(video.value)
      toRaw(video.value).forEach(v => {
        v.currentTime = 0
        v.load()
      })
    }

    let st = gsap.utils.toArray('.s-t')
    st.forEach(t => {
      let s = gsap.utils.toArray('.s', t)
      gsap.to(s, {
        y: '30%',
        ease: ' circ.out',
        scrollTrigger: {
          trigger: t,
          scrub: 0,
          start: 'top top',
          end: 'bottom top',
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
            main.setActiveProject(entry.target.dataset.index)
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
    }
  }
})

onMounted(() => {
  loading.value = false
})

onBeforeUnmount(() => {
  // Revert gsap context
  ScrollTrigger.killAll()
})
</script>

<template>
  <div class='home' id='page'>
    <NuxtLayout name='page'>
      <div class='home-container'>
        <NuxtLink :to="`/work/${project.projectSlug?.current}`" v-for="project, index in data?.home.selectedProjects"
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
                  <video ref='video' class='s' autoplay='true' playsinline='true' loop='true' muted :src='src'></video>
                </template>
              </SanityFile>
            </template>
          </div>
          <div v-if='project.projectDetails' class='home-project-details'>
            <div class='home-project-details-info'>
              <p v-if='project.filters' v-for='filter in project.filters'>{{ filter.tagTitle }},</p>
              <p v-if='project.projectDetails?.projectYear'>{{ project.projectDetails?.projectYear.split('-')[0] }},
              </p>
              <p v-if='project.projectDetails?.awards'>{{ project.projectDetails?.awards.length }} Awards</p>
              <p v-else>
                <span>{{ project.projectDetails?.agencies[0] }}</span>
                <span v-if='project.projectDetails?.agencies.length > 1'>
                  +{{ project.projectDetails?.agencies.length - 1 }}
                </span>
              </p>
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
  transition: cursor 300ms ease-out;

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

    cursor:
      url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9iXzY0MF8zMDg3KSI+CjxyZWN0IHk9IjAuNTU4NTk0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwLjg4MjQiIHJ4PSIxNS40NDEyIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjEuNjQyNCAxOS43MDM4QzE5Ljk4ODcgMTkuNzAzOCAxOC44ODk0IDE4LjM4NDcgMTguODg5NCAxNi4zMDA5QzE4Ljg4OTQgMTQuMjE3MSAxOS45ODg3IDEyLjg5OCAyMS42NDI0IDEyLjg5OEMyMy4zMDU2IDEyLjg5OCAyNC40MTQ0IDE0LjIyNjYgMjQuNDE0NCAxNi4zMDA5QzI0LjQxNDQgMTguMzc1MiAyMy4zMDU2IDE5LjcwMzggMjEuNjQyNCAxOS43MDM4Wk0yMS42NDI0IDE4LjkzOTFDMjIuODM3MiAxOC45MzkxIDIzLjU2MzcgMTcuOTY0MSAyMy41NjM3IDE2LjMwMDlDMjMuNTYzNyAxNC42Mzc3IDIyLjgzNzIgMTMuNjYyNyAyMS42NDI0IDEzLjY2MjdDMjAuNDY2NiAxMy42NjI3IDE5Ljc0MDIgMTQuNjE4NSAxOS43NDAyIDE2LjMwMDlDMTkuNzQwMiAxNy45ODMyIDIwLjQ2NjYgMTguOTM5MSAyMS42NDI0IDE4LjkzOTFaTTI4LjExOTQgMTQuNzE0MUMyOS40NjcyIDE0LjcxNDEgMzAuNDYxMyAxNS42MjIyIDMwLjQ2MTMgMTcuMjA5QzMwLjQ2MTMgMTguNzAwMiAyOS40NjcyIDE5LjcwMzggMjguMTE5NCAxOS43MDM4QzI3LjI5NzMgMTkuNzAzOCAyNi43NDI5IDE5LjM2OTMgMjYuNDQ2NiAxOC45MDA5VjIxLjU1ODJIMjUuNjYyOFYxNC43NzE1SDI2LjM0MTRMMjYuNDQ2NiAxNS41NTUzQzI2Ljc3MTYgMTUuMTA2IDI3LjI5NzMgMTQuNzE0MSAyOC4xMTk0IDE0LjcxNDFaTTI4LjA0MjkgMTkuMDA2QzI5LjAwODMgMTkuMDA2IDI5LjY1ODMgMTguMjcgMjkuNjU4MyAxNy4yMDlDMjkuNjU4MyAxNi4xNDggMjkuMDA4MyAxNS40MTE5IDI4LjA0MjkgMTUuNDExOUMyNy4wODcgMTUuNDExOSAyNi40MzcgMTYuMTQ4IDI2LjQzNyAxNy4xODk5QzI2LjQzNyAxOC4yNjA1IDI3LjA4NyAxOS4wMDYgMjguMDQyOSAxOS4wMDZaTTM2LjA4MDEgMTcuMzgxSDMyLjI5NDhWMTcuNDI4OEMzMi4zMjM1IDE4LjM1NiAzMi45MDY1IDE5LjAwNiAzMy44MzM4IDE5LjAwNkMzNC41MjIgMTkuMDA2IDM1LjA1NzMgMTguNjQyOCAzNS4yMTk4IDE4LjAxMTlIMzYuMDEzMkMzNS44MjIgMTguOTg2OSAzNS4wMTkgMTkuNzAzOCAzMy44OTExIDE5LjcwMzhDMzIuNDI4NiAxOS43MDM4IDMxLjQ3MjcgMTguNzAwMiAzMS40NzI3IDE3LjIwOUMzMS40NzI3IDE1LjcyNzQgMzIuNDA5NSAxNC43MTQxIDMzLjc4NiAxNC43MTQxQzM1LjE2MjQgMTQuNzE0MSAzNi4wNjEgMTUuNTg0IDM2LjA5OTIgMTcuMDI3NEMzNi4wOTkyIDE3LjEwMzggMzYuMDg5NiAxNy4yNjYzIDM2LjA4MDEgMTcuMzgxWk0zMy43OTU1IDE1LjQwMjRDMzMuMDc4NiAxNS40MDI0IDMyLjQxOSAxNS45MTg1IDMyLjM0MjYgMTYuNzExOUgzNS4yNThDMzUuMTgxNSAxNS44NzA3IDM0LjYwOCAxNS40MDI0IDMzLjc5NTUgMTUuNDAyNFpNMzkuNjgyMyAxNC43MTQxQzQwLjczMzcgMTQuNzE0MSA0MS41OTQgMTUuMjg3NyA0MS41OTQgMTYuODM2MlYxOS42NDY1SDQwLjgxMDJWMTYuODg0QzQwLjgxMDIgMTUuOTM3NyA0MC4zNTE0IDE1LjQzMSAzOS41NDg0IDE1LjQzMUMzOC42ODgxIDE1LjQzMSAzOC4xMzM3IDE2LjA3MTUgMzguMTMzNyAxNy4xMTM0VjE5LjY0NjVIMzcuMzQ5OVYxNC43NzE1SDM4LjAyODZMMzguMTMzNyAxNS40MzFDMzguNDIwNSAxNS4wNTgyIDM4LjkwOCAxNC43MTQxIDM5LjY4MjMgMTQuNzE0MVpNNDcuMTM0IDE5LjY0NjVINDYuMzAyNFYxMi45NTUzSDQ4Ljc0OTVDNTAuMTA2OCAxMi45NTUzIDUxLjAwNTQgMTMuNzU4MiA1MS4wMDU0IDE1LjAxMDVDNTEuMDA1NCAxNi4yNjI3IDUwLjEwNjggMTcuMDc1MiA0OC43NDk1IDE3LjA3NTJINDcuMTM0VjE5LjY0NjVaTTQ3LjEzNCAxMy43MlYxNi4zMTA1SDQ4LjY3M0M0OS41NzE1IDE2LjMxMDUgNTAuMTU0NiAxNS44MDM4IDUwLjE1NDYgMTUuMDEwNUM1MC4xNTQ2IDE0LjIxNzEgNDkuNTgxMSAxMy43MiA0OC42ODI2IDEzLjcySDQ3LjEzNFpNNTUuMzM2OSAxNC43NzE1SDU1Ljg2MjZWMTUuNTM2Mkg1NS4yMzE3QzU0LjA5NDIgMTUuNTM2MiA1My43NTk2IDE2LjQwNiA1My43NTk2IDE3LjE4MDNWMTguOTI5Nkg1NS4xODM5VjE5LjY0NjVINTEuODg2MVYxOC45Mjk2SDUyLjk3NThWMTUuNDg4NEg1MS44ODYxVjE0Ljc3MTVINTMuNzIxNEw1My43NTAxIDE1LjU5MzVDNTMuOTY5OSAxNS4yMTEyIDU0LjQwOTYgMTQuNzcxNSA1NS4zMzY5IDE0Ljc3MTVaTTU5LjAyOTcgMTkuNzAzOEM1Ny42MDU0IDE5LjcwMzggNTYuNjExMyAxOC42OTA2IDU2LjYxMTMgMTcuMjA5QzU2LjYxMTMgMTUuNzI3NCA1Ny42MDU0IDE0LjcxNDEgNTkuMDI5NyAxNC43MTQxQzYwLjQ1NCAxNC43MTQxIDYxLjQ0ODEgMTUuNzI3NCA2MS40NDgxIDE3LjIwOUM2MS40NDgxIDE4LjY5MDYgNjAuNDU0IDE5LjcwMzggNTkuMDI5NyAxOS43MDM4Wk01OS4wMjk3IDE5LjAwNkM1OS45OTUxIDE5LjAwNiA2MC42NDUxIDE4LjI1MDkgNjAuNjQ1MSAxNy4yMDlDNjAuNjQ1MSAxNi4xNjcxIDU5Ljk5NTEgMTUuNDExOSA1OS4wMjk3IDE1LjQxMTlDNTguMDY0MyAxNS40MTE5IDU3LjQxNDMgMTYuMTY3MSA1Ny40MTQzIDE3LjIwOUM1Ny40MTQzIDE4LjI1MDkgNTguMDY0MyAxOS4wMDYgNTkuMDI5NyAxOS4wMDZaTTY0LjYwMDMgMTIuNzI1OUM2NC45MzQ5IDEyLjcyNTkgNjUuMTkzIDEyLjk4NCA2NS4xOTMgMTMuMzE4NUM2NS4xOTMgMTMuNjcyMiA2NC45MzQ5IDEzLjkyMDcgNjQuNjAwMyAxMy45MjA3QzY0LjI2NTggMTMuOTIwNyA2My45OTgxIDEzLjY3MjIgNjMuOTk4MSAxMy4zMTg1QzYzLjk5ODEgMTIuOTg0IDY0LjI2NTggMTIuNzI1OSA2NC42MDAzIDEyLjcyNTlaTTYxLjk2MjEgMTUuNDg4NFYxNC43NzE1SDY0Ljk5MjJWMjAuMjg2OUM2NC45OTIyIDIxLjE0NzIgNjQuNjI5IDIxLjU1ODIgNjMuNzIwOSAyMS41NTgySDYxLjk2MjFWMjAuODQxM0g2My42NzMxQzY0LjA2NSAyMC44NDEzIDY0LjIwODQgMjAuNjc4OCA2NC4yMDg0IDIwLjMwNlYxNS40ODg0SDYxLjk2MjFaTTcwLjg1MjIgMTcuMzgxSDY3LjA2NjlWMTcuNDI4OEM2Ny4wOTU2IDE4LjM1NiA2Ny42Nzg2IDE5LjAwNiA2OC42MDU4IDE5LjAwNkM2OS4yOTQxIDE5LjAwNiA2OS44Mjk0IDE4LjY0MjggNjkuOTkxOSAxOC4wMTE5SDcwLjc4NTNDNzAuNTk0MSAxOC45ODY5IDY5Ljc5MTEgMTkuNzAzOCA2OC42NjMyIDE5LjcwMzhDNjcuMjAwNyAxOS43MDM4IDY2LjI0NDggMTguNzAwMiA2Ni4yNDQ4IDE3LjIwOUM2Ni4yNDQ4IDE1LjcyNzQgNjcuMTgxNiAxNC43MTQxIDY4LjU1ODEgMTQuNzE0MUM2OS45MzQ1IDE0LjcxNDEgNzAuODMzMSAxNS41ODQgNzAuODcxMyAxNy4wMjc0QzcwLjg3MTMgMTcuMTAzOCA3MC44NjE3IDE3LjI2NjMgNzAuODUyMiAxNy4zODFaTTY4LjU2NzYgMTUuNDAyNEM2Ny44NTA3IDE1LjQwMjQgNjcuMTkxMSAxNS45MTg1IDY3LjExNDcgMTYuNzExOUg3MC4wMzAxQzY5Ljk1MzYgMTUuODcwNyA2OS4zODAxIDE1LjQwMjQgNjguNTY3NiAxNS40MDI0Wk03NC4yNDQxIDE5LjcwMzhDNzIuODE5OCAxOS43MDM4IDcxLjg4MyAxOC43Mzg0IDcxLjg4MyAxNy4yMTg1QzcxLjg4MyAxNS43Mjc0IDcyLjg0ODUgMTQuNzE0MSA3NC4yNjMyIDE0LjcxNDFDNzUuNDU4IDE0LjcxNDEgNzYuMjEzMiAxNS4zODMyIDc2LjQxMzkgMTYuNDUzOEg3NS41OTE4Qzc1LjQ0ODUgMTUuODAzOCA3NC45NzA1IDE1LjQxMTkgNzQuMjUzNiAxNS40MTE5QzczLjMxNjggMTUuNDExOSA3Mi42ODYgMTYuMTU3NSA3Mi42ODYgMTcuMjE4NUM3Mi42ODYgMTguMjc5NiA3My4zMTY4IDE5LjAwNiA3NC4yNTM2IDE5LjAwNkM3NC45NTE0IDE5LjAwNiA3NS40MjkzIDE4LjYwNDYgNzUuNTgyMyAxNy45ODMySDc2LjQxMzlDNzYuMjIyNyAxOS4wMzQ3IDc1LjQyOTMgMTkuNzAzOCA3NC4yNDQxIDE5LjcwMzhaTTgwLjkyNzUgMTkuNjQ2NUg3OS42Mjc1Qzc4LjY5MDggMTkuNjQ2NSA3OC4zNTYyIDE5LjIzNTUgNzguMzU2MiAxOC4zNzUyVjE1LjQ4ODRINzcuMDY1OFYxNC43NzE1SDc4LjM1NjJWMTMuNDA0Nkg3OS4xNFYxNC43NzE1SDgwLjg1MTFWMTUuNDg4NEg3OS4xNFYxOC4zNjU2Qzc5LjE0IDE4Ljc3NjYgNzkuMjgzNCAxOC45Mjk2IDc5LjcwNCAxOC45Mjk2SDgwLjkyNzVWMTkuNjQ2NVoiIGZpbGw9IiMxRTFFMUUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9iXzY0MF8zMDg3IiB4PSItMTQ3LjA1OSIgeT0iLTE0Ni41IiB3aWR0aD0iMzk0LjExOCIgaGVpZ2h0PSIzMjUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHN0ZERldmlhdGlvbj0iNzMuNTI5NCIvPgo8ZmVDb21wb3NpdGUgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9ImluIiByZXN1bHQ9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXJfNjQwXzMwODciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2JhY2tncm91bmRCbHVyXzY0MF8zMDg3IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=') 50 50,
      pointer;

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
      z-index: 10;

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
        border: $white25 1px solid;
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

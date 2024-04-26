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
const projectImage = ref([])
const homeContainer = ref(null)
const { isMobile, isSafari } = useDevice()

const main = useStore()
const store = useData()
const { data } = storeToRefs(store)

let setCursorPosition = function (s, e, cp) {
  let bounds = s.getBoundingClientRect()
  let xPosition = (e.clientX - bounds.left) - cp.clientWidth / 2 + "px";
  let yPosition = (e.clientY) - cp.clientHeight / 2 + "px";
  cp.style.transform =
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
      toRaw(video.value).forEach(v => {
        v.currentTime = 0
        v.load()
      })
    }

    let st = gsap.utils.toArray('.s-t')
    if (!isMobile) {
      st.forEach(t => {
        let s = gsap.utils.toArray('.s', t)
        gsap.timeline().fromTo(s, { y: '-20%' }, {
          y: '0%', scrollTrigger: { trigger: t, scrub: true, start: 'top-=20% bottom', end: 'center 70%' }
        }).fromTo(s, { y: '0%' }, { y: '20%', scrollTrigger: { trigger: t, scrub: true, start: 'center 30%', end: 'bottom-=20% top' } })

        // gsap.from(s, {
        //   y: '-20%',
        //   // y: (i, el) =>
        //   //   (1 - .5) *
        //   //   ScrollTrigger.maxScroll(window),
        //   // ease: ' circ.out',
        //   // backgroundPosition: '50% 0%',
        //   ease: 'none',
        //   scrollTrigger: {
        //     trigger: t,
        //     scrub: true,
        //     start: 'top bottom',
        //     invalidateOnRefresh: true,
        //     end: 'bottom bottom',
        //   }
        // })
        // gsap.to(s, {
        //   keyframes: {
        //     y: ['-20%', '20%'],
        //   },
        //   // y: (i, el) =>
        //   //   (1 - .5) *
        //   //   ScrollTrigger.maxScroll(window),
        //   // ease: ' circ.out',
        //   // backgroundPosition: '50% 0%',
        //   ease: 'none',
        //   scrollTrigger: {
        //     trigger: t,
        //     scrub: true,
        //     start: 'top-=20% top',
        //     invalidateOnRefresh: true,
        //     end: 'bottom-=20% top',
        //     markers: true
        //   }
        // })
      })
    }

    if (!isMobile && !isSafari) {
      let cp = gsap.utils.toArray('.cursor-object')

      if (homeContainer.value) {
        let timeout
        // homeContainer.value.addEventListener('mouseenter', () => {
        //   setTimeout(() => {
        //     cp[0].style.opacity = 1
        //   }, 500)
        // })
        homeContainer.value.addEventListener('mousemove', (e) => {
          setTimeout(() => {
            cp[0].style.opacity = 1
          }, 500)

          // cp[0].style.opacity = 1
          setCursorPosition(homeContainer.value, e, cp[0])
        })
        homeContainer.value.addEventListener('mouseleave', () => {
          cp[0].style.opacity = 0
        })
      }
    }

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

// watch(projectImage.value, () => {
//   // projectImage.value.forEach((p, i) => {
//   //   p.addEventListener('mousemove', (e) => {
//   //     console.log(i, e)
//   //   })
//   // })
//   console.log(projectImage.value)
//   toRaw(projectImage.value).forEach((p, i) => {
//
//     p.addEventListener('mousemove', (e) => {
//       console.log(i, e)
//     })
//   })
// })

onMounted(() => {
  loading.value = false
})

onBeforeUnmount(() => {
  // Revert gsap context
  // ScrollTrigger.killAll()
})
</script>

<template>
  <div class='home' id='page'>
    <NuxtLayout name='page'>
      <div ref='homeContainer' class='home-container'>
        <div class='cursor-object'>
          <svg width="136" height="42" viewBox="0 0 136 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="136" height="42" rx="21" fill="white" />
            <path
              d="M29.433 26.078C27.184 26.078 25.689 24.284 25.689 21.45C25.689 18.616 27.184 16.822 29.433 16.822C31.695 16.822 33.203 18.629 33.203 21.45C33.203 24.271 31.695 26.078 29.433 26.078ZM29.433 25.038C31.058 25.038 32.046 23.712 32.046 21.45C32.046 19.188 31.058 17.862 29.433 17.862C27.834 17.862 26.846 19.162 26.846 21.45C26.846 23.738 27.834 25.038 29.433 25.038ZM38.2417 19.292C40.0747 19.292 41.4267 20.527 41.4267 22.685C41.4267 24.713 40.0747 26.078 38.2417 26.078C37.1237 26.078 36.3697 25.623 35.9667 24.986V28.6H34.9007V19.37H35.8237L35.9667 20.436C36.4087 19.825 37.1237 19.292 38.2417 19.292ZM38.1377 25.129C39.4507 25.129 40.3347 24.128 40.3347 22.685C40.3347 21.242 39.4507 20.241 38.1377 20.241C36.8377 20.241 35.9537 21.242 35.9537 22.659C35.9537 24.115 36.8377 25.129 38.1377 25.129ZM49.0683 22.919H43.9203V22.984C43.9593 24.245 44.7523 25.129 46.0133 25.129C46.9493 25.129 47.6773 24.635 47.8983 23.777H48.9773C48.7173 25.103 47.6253 26.078 46.0913 26.078C44.1023 26.078 42.8023 24.713 42.8023 22.685C42.8023 20.67 44.0763 19.292 45.9483 19.292C47.8203 19.292 49.0423 20.475 49.0943 22.438C49.0943 22.542 49.0813 22.763 49.0683 22.919ZM45.9613 20.228C44.9863 20.228 44.0893 20.93 43.9853 22.009H47.9503C47.8463 20.865 47.0663 20.228 45.9613 20.228ZM53.9673 19.292C55.3973 19.292 56.5673 20.072 56.5673 22.178V26H55.5013V22.243C55.5013 20.956 54.8773 20.267 53.7853 20.267C52.6153 20.267 51.8613 21.138 51.8613 22.555V26H50.7953V19.37H51.7183L51.8613 20.267C52.2513 19.76 52.9143 19.292 53.9673 19.292ZM64.1017 26H62.9707V16.9H66.2987C68.1447 16.9 69.3667 17.992 69.3667 19.695C69.3667 21.398 68.1447 22.503 66.2987 22.503H64.1017V26ZM64.1017 17.94V21.463H66.1947C67.4167 21.463 68.2097 20.774 68.2097 19.695C68.2097 18.616 67.4297 17.94 66.2077 17.94H64.1017ZM75.2575 19.37H75.9725V20.41H75.1145C73.5675 20.41 73.1125 21.593 73.1125 22.646V25.025H75.0495V26H70.5645V25.025H72.0465V20.345H70.5645V19.37H73.0605L73.0995 20.488C73.3985 19.968 73.9965 19.37 75.2575 19.37ZM80.2798 26.078C78.3428 26.078 76.9908 24.7 76.9908 22.685C76.9908 20.67 78.3428 19.292 80.2798 19.292C82.2168 19.292 83.5688 20.67 83.5688 22.685C83.5688 24.7 82.2168 26.078 80.2798 26.078ZM80.2798 25.129C81.5928 25.129 82.4768 24.102 82.4768 22.685C82.4768 21.268 81.5928 20.241 80.2798 20.241C78.9668 20.241 78.0828 21.268 78.0828 22.685C78.0828 24.102 78.9668 25.129 80.2798 25.129ZM87.8558 16.588C88.3108 16.588 88.6618 16.939 88.6618 17.394C88.6618 17.875 88.3108 18.213 87.8558 18.213C87.4008 18.213 87.0368 17.875 87.0368 17.394C87.0368 16.939 87.4008 16.588 87.8558 16.588ZM84.2678 20.345V19.37H88.3888V26.871C88.3888 28.041 87.8948 28.6 86.6598 28.6H84.2678V27.625H86.5948C87.1278 27.625 87.3228 27.404 87.3228 26.897V20.345H84.2678ZM96.3583 22.919H91.2103V22.984C91.2493 24.245 92.0423 25.129 93.3033 25.129C94.2393 25.129 94.9673 24.635 95.1883 23.777H96.2673C96.0073 25.103 94.9153 26.078 93.3813 26.078C91.3923 26.078 90.0923 24.713 90.0923 22.685C90.0923 20.67 91.3663 19.292 93.2383 19.292C95.1103 19.292 96.3323 20.475 96.3843 22.438C96.3843 22.542 96.3713 22.763 96.3583 22.919ZM93.2513 20.228C92.2763 20.228 91.3793 20.93 91.2753 22.009H95.2403C95.1363 20.865 94.3563 20.228 93.2513 20.228ZM100.971 26.078C99.0343 26.078 97.7603 24.765 97.7603 22.698C97.7603 20.67 99.0733 19.292 100.997 19.292C102.622 19.292 103.649 20.202 103.922 21.658H102.804C102.609 20.774 101.959 20.241 100.984 20.241C99.7103 20.241 98.8523 21.255 98.8523 22.698C98.8523 24.141 99.7103 25.129 100.984 25.129C101.933 25.129 102.583 24.583 102.791 23.738H103.922C103.662 25.168 102.583 26.078 100.971 26.078ZM110.061 26H108.293C107.019 26 106.564 25.441 106.564 24.271V20.345H104.809V19.37H106.564V17.511H107.63V19.37H109.957V20.345H107.63V24.258C107.63 24.817 107.825 25.025 108.397 25.025H110.061V26Z"
              fill="#1E1E1E" />
          </svg>
        </div>
        <NuxtLink ref='projectImage' :to="`/work/${project.projectSlug?.current}`"
          v-for="project, index in data?.home.selectedProjects" class='home-project pre-project s-t'>
          <div ref='projects' class='home-project-img pre-image' :data-index='index'>
            <!-- <div class='home-project-img-overlay'></div> -->
            <template v-if='project.projectCaseImage?.projectCaseSelection === "image"'>
              <SanityImage class='s' data-speed='1' :asset-id="project.projectCaseImage?.image.asset?._ref"
                auto="format" w='2000' fit='clip' />
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
.cursor-object {
  position: fixed;
  display: block;
  opacity: 0;
  top: 5%;
  z-index: 100;
  transition: all 100ms ease-out;
  cursor: pointer;
  pointer-events: none;

  &>svg {
    width: desktop-vw(136px);
    height: desktop-vw(42px);
  }

  @include mobile() {
    display: none;
  }
}

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

    //cursor:
    // url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTAwIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9iXzY0MF8zMDg3KSI+CjxyZWN0IHk9IjAuNTU4NTk0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwLjg4MjQiIHJ4PSIxNS40NDEyIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjEuNjQyNCAxOS43MDM4QzE5Ljk4ODcgMTkuNzAzOCAxOC44ODk0IDE4LjM4NDcgMTguODg5NCAxNi4zMDA5QzE4Ljg4OTQgMTQuMjE3MSAxOS45ODg3IDEyLjg5OCAyMS42NDI0IDEyLjg5OEMyMy4zMDU2IDEyLjg5OCAyNC40MTQ0IDE0LjIyNjYgMjQuNDE0NCAxNi4zMDA5QzI0LjQxNDQgMTguMzc1MiAyMy4zMDU2IDE5LjcwMzggMjEuNjQyNCAxOS43MDM4Wk0yMS42NDI0IDE4LjkzOTFDMjIuODM3MiAxOC45MzkxIDIzLjU2MzcgMTcuOTY0MSAyMy41NjM3IDE2LjMwMDlDMjMuNTYzNyAxNC42Mzc3IDIyLjgzNzIgMTMuNjYyNyAyMS42NDI0IDEzLjY2MjdDMjAuNDY2NiAxMy42NjI3IDE5Ljc0MDIgMTQuNjE4NSAxOS43NDAyIDE2LjMwMDlDMTkuNzQwMiAxNy45ODMyIDIwLjQ2NjYgMTguOTM5MSAyMS42NDI0IDE4LjkzOTFaTTI4LjExOTQgMTQuNzE0MUMyOS40NjcyIDE0LjcxNDEgMzAuNDYxMyAxNS42MjIyIDMwLjQ2MTMgMTcuMjA5QzMwLjQ2MTMgMTguNzAwMiAyOS40NjcyIDE5LjcwMzggMjguMTE5NCAxOS43MDM4QzI3LjI5NzMgMTkuNzAzOCAyNi43NDI5IDE5LjM2OTMgMjYuNDQ2NiAxOC45MDA5VjIxLjU1ODJIMjUuNjYyOFYxNC43NzE1SDI2LjM0MTRMMjYuNDQ2NiAxNS41NTUzQzI2Ljc3MTYgMTUuMTA2IDI3LjI5NzMgMTQuNzE0MSAyOC4xMTk0IDE0LjcxNDFaTTI4LjA0MjkgMTkuMDA2QzI5LjAwODMgMTkuMDA2IDI5LjY1ODMgMTguMjcgMjkuNjU4MyAxNy4yMDlDMjkuNjU4MyAxNi4xNDggMjkuMDA4MyAxNS40MTE5IDI4LjA0MjkgMTUuNDExOUMyNy4wODcgMTUuNDExOSAyNi40MzcgMTYuMTQ4IDI2LjQzNyAxNy4xODk5QzI2LjQzNyAxOC4yNjA1IDI3LjA4NyAxOS4wMDYgMjguMDQyOSAxOS4wMDZaTTM2LjA4MDEgMTcuMzgxSDMyLjI5NDhWMTcuNDI4OEMzMi4zMjM1IDE4LjM1NiAzMi45MDY1IDE5LjAwNiAzMy44MzM4IDE5LjAwNkMzNC41MjIgMTkuMDA2IDM1LjA1NzMgMTguNjQyOCAzNS4yMTk4IDE4LjAxMTlIMzYuMDEzMkMzNS44MjIgMTguOTg2OSAzNS4wMTkgMTkuNzAzOCAzMy44OTExIDE5LjcwMzhDMzIuNDI4NiAxOS43MDM4IDMxLjQ3MjcgMTguNzAwMiAzMS40NzI3IDE3LjIwOUMzMS40NzI3IDE1LjcyNzQgMzIuNDA5NSAxNC43MTQxIDMzLjc4NiAxNC43MTQxQzM1LjE2MjQgMTQuNzE0MSAzNi4wNjEgMTUuNTg0IDM2LjA5OTIgMTcuMDI3NEMzNi4wOTkyIDE3LjEwMzggMzYuMDg5NiAxNy4yNjYzIDM2LjA4MDEgMTcuMzgxWk0zMy43OTU1IDE1LjQwMjRDMzMuMDc4NiAxNS40MDI0IDMyLjQxOSAxNS45MTg1IDMyLjM0MjYgMTYuNzExOUgzNS4yNThDMzUuMTgxNSAxNS44NzA3IDM0LjYwOCAxNS40MDI0IDMzLjc5NTUgMTUuNDAyNFpNMzkuNjgyMyAxNC43MTQxQzQwLjczMzcgMTQuNzE0MSA0MS41OTQgMTUuMjg3NyA0MS41OTQgMTYuODM2MlYxOS42NDY1SDQwLjgxMDJWMTYuODg0QzQwLjgxMDIgMTUuOTM3NyA0MC4zNTE0IDE1LjQzMSAzOS41NDg0IDE1LjQzMUMzOC42ODgxIDE1LjQzMSAzOC4xMzM3IDE2LjA3MTUgMzguMTMzNyAxNy4xMTM0VjE5LjY0NjVIMzcuMzQ5OVYxNC43NzE1SDM4LjAyODZMMzguMTMzNyAxNS40MzFDMzguNDIwNSAxNS4wNTgyIDM4LjkwOCAxNC43MTQxIDM5LjY4MjMgMTQuNzE0MVpNNDcuMTM0IDE5LjY0NjVINDYuMzAyNFYxMi45NTUzSDQ4Ljc0OTVDNTAuMTA2OCAxMi45NTUzIDUxLjAwNTQgMTMuNzU4MiA1MS4wMDU0IDE1LjAxMDVDNTEuMDA1NCAxNi4yNjI3IDUwLjEwNjggMTcuMDc1MiA0OC43NDk1IDE3LjA3NTJINDcuMTM0VjE5LjY0NjVaTTQ3LjEzNCAxMy43MlYxNi4zMTA1SDQ4LjY3M0M0OS41NzE1IDE2LjMxMDUgNTAuMTU0NiAxNS44MDM4IDUwLjE1NDYgMTUuMDEwNUM1MC4xNTQ2IDE0LjIxNzEgNDkuNTgxMSAxMy43MiA0OC42ODI2IDEzLjcySDQ3LjEzNFpNNTUuMzM2OSAxNC43NzE1SDU1Ljg2MjZWMTUuNTM2Mkg1NS4yMzE3QzU0LjA5NDIgMTUuNTM2MiA1My43NTk2IDE2LjQwNiA1My43NTk2IDE3LjE4MDNWMTguOTI5Nkg1NS4xODM5VjE5LjY0NjVINTEuODg2MVYxOC45Mjk2SDUyLjk3NThWMTUuNDg4NEg1MS44ODYxVjE0Ljc3MTVINTMuNzIxNEw1My43NTAxIDE1LjU5MzVDNTMuOTY5OSAxNS4yMTEyIDU0LjQwOTYgMTQuNzcxNSA1NS4zMzY5IDE0Ljc3MTVaTTU5LjAyOTcgMTkuNzAzOEM1Ny42MDU0IDE5LjcwMzggNTYuNjExMyAxOC42OTA2IDU2LjYxMTMgMTcuMjA5QzU2LjYxMTMgMTUuNzI3NCA1Ny42MDU0IDE0LjcxNDEgNTkuMDI5NyAxNC43MTQxQzYwLjQ1NCAxNC43MTQxIDYxLjQ0ODEgMTUuNzI3NCA2MS40NDgxIDE3LjIwOUM2MS40NDgxIDE4LjY5MDYgNjAuNDU0IDE5LjcwMzggNTkuMDI5NyAxOS43MDM4Wk01OS4wMjk3IDE5LjAwNkM1OS45OTUxIDE5LjAwNiA2MC42NDUxIDE4LjI1MDkgNjAuNjQ1MSAxNy4yMDlDNjAuNjQ1MSAxNi4xNjcxIDU5Ljk5NTEgMTUuNDExOSA1OS4wMjk3IDE1LjQxMTlDNTguMDY0MyAxNS40MTE5IDU3LjQxNDMgMTYuMTY3MSA1Ny40MTQzIDE3LjIwOUM1Ny40MTQzIDE4LjI1MDkgNTguMDY0MyAxOS4wMDYgNTkuMDI5NyAxOS4wMDZaTTY0LjYwMDMgMTIuNzI1OUM2NC45MzQ5IDEyLjcyNTkgNjUuMTkzIDEyLjk4NCA2NS4xOTMgMTMuMzE4NUM2NS4xOTMgMTMuNjcyMiA2NC45MzQ5IDEzLjkyMDcgNjQuNjAwMyAxMy45MjA3QzY0LjI2NTggMTMuOTIwNyA2My45OTgxIDEzLjY3MjIgNjMuOTk4MSAxMy4zMTg1QzYzLjk5ODEgMTIuOTg0IDY0LjI2NTggMTIuNzI1OSA2NC42MDAzIDEyLjcyNTlaTTYxLjk2MjEgMTUuNDg4NFYxNC43NzE1SDY0Ljk5MjJWMjAuMjg2OUM2NC45OTIyIDIxLjE0NzIgNjQuNjI5IDIxLjU1ODIgNjMuNzIwOSAyMS41NTgySDYxLjk2MjFWMjAuODQxM0g2My42NzMxQzY0LjA2NSAyMC44NDEzIDY0LjIwODQgMjAuNjc4OCA2NC4yMDg0IDIwLjMwNlYxNS40ODg0SDYxLjk2MjFaTTcwLjg1MjIgMTcuMzgxSDY3LjA2NjlWMTcuNDI4OEM2Ny4wOTU2IDE4LjM1NiA2Ny42Nzg2IDE5LjAwNiA2OC42MDU4IDE5LjAwNkM2OS4yOTQxIDE5LjAwNiA2OS44Mjk0IDE4LjY0MjggNjkuOTkxOSAxOC4wMTE5SDcwLjc4NTNDNzAuNTk0MSAxOC45ODY5IDY5Ljc5MTEgMTkuNzAzOCA2OC42NjMyIDE5LjcwMzhDNjcuMjAwNyAxOS43MDM4IDY2LjI0NDggMTguNzAwMiA2Ni4yNDQ4IDE3LjIwOUM2Ni4yNDQ4IDE1LjcyNzQgNjcuMTgxNiAxNC43MTQxIDY4LjU1ODEgMTQuNzE0MUM2OS45MzQ1IDE0LjcxNDEgNzAuODMzMSAxNS41ODQgNzAuODcxMyAxNy4wMjc0QzcwLjg3MTMgMTcuMTAzOCA3MC44NjE3IDE3LjI2NjMgNzAuODUyMiAxNy4zODFaTTY4LjU2NzYgMTUuNDAyNEM2Ny44NTA3IDE1LjQwMjQgNjcuMTkxMSAxNS45MTg1IDY3LjExNDcgMTYuNzExOUg3MC4wMzAxQzY5Ljk1MzYgMTUuODcwNyA2OS4zODAxIDE1LjQwMjQgNjguNTY3NiAxNS40MDI0Wk03NC4yNDQxIDE5LjcwMzhDNzIuODE5OCAxOS43MDM4IDcxLjg4MyAxOC43Mzg0IDcxLjg4MyAxNy4yMTg1QzcxLjg4MyAxNS43Mjc0IDcyLjg0ODUgMTQuNzE0MSA3NC4yNjMyIDE0LjcxNDFDNzUuNDU4IDE0LjcxNDEgNzYuMjEzMiAxNS4zODMyIDc2LjQxMzkgMTYuNDUzOEg3NS41OTE4Qzc1LjQ0ODUgMTUuODAzOCA3NC45NzA1IDE1LjQxMTkgNzQuMjUzNiAxNS40MTE5QzczLjMxNjggMTUuNDExOSA3Mi42ODYgMTYuMTU3NSA3Mi42ODYgMTcuMjE4NUM3Mi42ODYgMTguMjc5NiA3My4zMTY4IDE5LjAwNiA3NC4yNTM2IDE5LjAwNkM3NC45NTE0IDE5LjAwNiA3NS40MjkzIDE4LjYwNDYgNzUuNTgyMyAxNy45ODMySDc2LjQxMzlDNzYuMjIyNyAxOS4wMzQ3IDc1LjQyOTMgMTkuNzAzOCA3NC4yNDQxIDE5LjcwMzhaTTgwLjkyNzUgMTkuNjQ2NUg3OS42Mjc1Qzc4LjY5MDggMTkuNjQ2NSA3OC4zNTYyIDE5LjIzNTUgNzguMzU2MiAxOC4zNzUyVjE1LjQ4ODRINzcuMDY1OFYxNC43NzE1SDc4LjM1NjJWMTMuNDA0Nkg3OS4xNFYxNC43NzE1SDgwLjg1MTFWMTUuNDg4NEg3OS4xNFYxOC4zNjU2Qzc5LjE0IDE4Ljc3NjYgNzkuMjgzNCAxOC45Mjk2IDc5LjcwNCAxOC45Mjk2SDgwLjkyNzVWMTkuNjQ2NVoiIGZpbGw9IiMxRTFFMUUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9iXzY0MF8zMDg3IiB4PSItMTQ3LjA1OSIgeT0iLTE0Ni41IiB3aWR0aD0iMzk0LjExOCIgaGVpZ2h0PSIzMjUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlR2F1c3NpYW5CbHVyIGluPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHN0ZERldmlhdGlvbj0iNzMuNTI5NCIvPgo8ZmVDb21wb3NpdGUgaW4yPSJTb3VyY2VBbHBoYSIgb3BlcmF0b3I9ImluIiByZXN1bHQ9ImVmZmVjdDFfYmFja2dyb3VuZEJsdXJfNjQwXzMwODciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2JhY2tncm91bmRCbHVyXzY0MF8zMDg3IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=') 50 50,
    // pointer;

    cursor: pointer;

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

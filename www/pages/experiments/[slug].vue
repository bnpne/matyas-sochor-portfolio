<!-- Experiment PAGE -->
<!-- https://plasticbionic.com/project/days-2-->
<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  pageTransition: {
    css: false,
    name: 'experiment',
    mode: 'out-in',
    onEnter(el, done) {
      const app = useNuxtApp()

      gsap.to('.t-o', {
        opacity: 0, duration: .75, delay: .25, ease: 'circ.out',
        onComplete: () => {
          app.$scrollStart()
          done()
        }
      })
    },
    onLeave(el, done) {
      const app = useNuxtApp()
      app.$scrollStop()
      gsap.to('.t-o', { opacity: 1, duration: .75, ease: 'circ.out', onComplete: () => { done() } })
    },
  },
})

const app = useNuxtApp()
const router = useRouter()
const ellipse = ref()
const progress = reactive({ value: 0 })
const lenisProgress = reactive({ value: 0 })
const caseImage = ref(null)
const scrollImage = ref(null)

const testProgress = () => {
  progress.value += 25
}

const da = computed(() => {
  const c = 2 * Math.PI * 21.5
  const p = c * (1 - progress.value / 100)
  return { c, p }
})

const route = useRoute()
const store = useData()
const { data } = storeToRefs(store)
const work = ref(null)
const loading = ref(true)
const called = ref(false)
const video = ref([])

// Get next index
const nextIndex = reactive({ value: null })
const isNext = computed(() => {
  return nextIndex.value
})
async function getIndex() {
  if (work.value) {
    toRaw(data.value).home?.selectedExperiments.forEach((a, i) => {
      if (a?._id === work.value?._id) {
        if (i === toRaw(data.value).home.selectedExperiments.length - 1) {
          nextIndex.value = 0
        } else {
          nextIndex.value = i + 1
        }
      }
    })
  }
  await nextTick()
}

const navigate = async () => {
  await navigateTo(`/experiments/${toRaw(data.value).home?.selectedExperiments?.[isNext.value].projectSlug.current}`, { redirectCode: 301 })
}

watch(() => called.value, () => {
  if (called.value === true) {
    let tl = gsap.timeline({ default: { ease: 'circ.out', duration: .75 }, onComplete: () => navigate() })
    tl.to(scrollImage.value, {
      width: '100%', top: '-40vh', delay: .5, duration: .8
    })
      .to('.t-o', { opacity: 1 }, '<+=20%')
  }
})


watch([() => store.isFetched, () => loading.value], async () => {
  if (!loading || store.isFetched) {
    toRaw(data.value)?.projects.forEach(p => {
      if (p.projectSlug.current === route.params.slug) {
        work.value = p
      }
    })
    getIndex()
    useHead({
      title: `${work.value?.projectTitle} | Matyas Sochor`
    })
    await nextTick()

    let intro = gsap.timeline({ defaults: { duration: 1, ease: 'circ.out' }, paused: true })
    intro
      .from('.work-hero', { opacity: 0 }, '>-.5')
      .from('.intro-anima', { scale: 1.2 }, '>-.9')
      .from('.detail-anima', { y: '50%', opacity: 0, stagger: 0.17 }, '>-.5')
    intro.play()
    ScrollTrigger.refresh(true)

    if (Array.isArray(toRaw(video.value))) {
      toRaw(video.value).forEach(v => {
        v.currentTime = 0
        v.load()
      })
    } else {
      toRaw(video.value).currentTime = 0
      toRaw(video.value).load()
    }

    if (caseImage.value) {
      gsap.to(caseImage.value, {
        y: '30%',
        ease: ' circ.out',
        scrollTrigger: {
          trigger: caseImage.value,
          scrub: 0,
          start: 'top top',
          end: 'bottom top',
        }
      })
    }

    /// SCROLL ANIMATIONS
    /// Fade In
    let animaFade = gsap.utils.toArray('.anima-fade')
    animaFade.forEach(f => {
      gsap.from(f.children, {
        opacity: 0,
        y: '80%',
        duration: 1,
        ease: 'circ.out',
        stagger: .17,
        scrollTrigger: {
          trigger: f,
          start: 'top 95%',
        }
      })
    })

    /// Scale
    let animaScale = gsap.utils.toArray('.anima-scale')
    animaScale.forEach(s => {
      let img = gsap.utils.toArray('.a', s)
      gsap.from(img, {
        scale: 1.1,
        ease: 'circ.out',
        stagger: .17,
        duration: 1.5,
        scrollTrigger: {
          trigger: s,
          start: 'top 95%',
        }
      })
    })

    /// Divider
    let animaDivider = gsap.utils.toArray('.anima-divider')
    animaDivider.forEach(d => {
      gsap.from(d.children, {
        width: '0%',
        ease: 'circ.out',
        stagger: .17,
        duration: 1.5,
        scrollTrigger: {
          trigger: d,
          start: 'top 95%',
        }
      })
    })


    app.$lenis.on('scroll', (e) => {
      lenisProgress.value = e.progress
    })

    let t = 0
    window.addEventListener('wheel', (e) => {
      if (lenisProgress.value === 1) {
        if (t < 100) {

          t += e.deltaY / 20
          t = Math.min(Math.max(t, 0), 100)
          gsap.to(progress, { value: t, ease: 'circ.out' })
        }

        if (t === 100) {
          called.value = true
        }
      } else {
        t = 0
        gsap.to(progress, { value: 0, ease: 'circ.out' })

      }
    })
  }
})

onMounted(() => {
  loading.value = false
  if (app.$lenis.isStopped) {
    // app.$scrollStart()
  }
})

onBeforeUnmount(() => {
  // Revert gsap context
  ScrollTrigger.killAll()
})
</script>

<template>
  <div class='work' id='page'>
    <NuxtLayout name='work' :data='work'>
      <div v-if='work' class='work-container '>
        <div class='work-hero pre-project'>
          <div class='work-hero-img pre-image' ref='caseImage'>
            <div class='work-hero-img-overlay'></div>
            <template v-if='work.projectCaseImage?.projectCaseSelection === "image"'>
              <SanityImage class='intro-anima' :asset-id="work.projectCaseImage?.image.asset?._ref" auto="format"
                w='1000' fit='clip' />
            </template>
            <template v-else-if="work.projectCaseImage?.projectCaseSelection === 'video'">
              <SanityFile :asset-id="work.projectCaseImage?.video.asset?._ref">
                <template #default="{ src }">
                  <video ref='video' class='intro-anima' autoplay='true' playsinline='true' loop='true' muted
                    :src='src'></video>
                </template>
              </SanityFile>
            </template>
            <div v-if='work.projectDetails' class='work-hero-details'>
              <div class='work-hero-details-client detail-anima'>
                <p>Client</p>
                <template v-for='client in work.projectDetails?.clients'>
                  <NuxtLink :to='client.clientLink'
                    :class='client.clientLink ? "work-hero-details-client-link" : "work-hero-details-client-nolink"'
                    target="_blank" rel="noreferrer">
                    {{ client.clientName }}
                  </NuxtLink>
                  <div v-if='client.clientLink' class="work-hero-details-client-footer"></div>
                </template>
              </div>
              <div class='work-hero-details-info '>
                <div class='work-hero-details-info-section detail-anima' v-if='work.projectDetails?.projectYear &&
      work.projectDetails?.projectType'>
                  <p>Type/Year</p>
                  <p v-for='type in work.projectDetails?.projectType'>{{ type }}</p>
                </div>
                <div class='work-hero-details-info-section detail-anima' v-if='work.projectDetails?.projectRole'>
                  <p>My role</p>
                  <p v-for='role in work.projectDetails?.projectRole'>{{ role }}</p>
                </div>
                <div class='work-hero-details-info-section detail-anima' v-if='work.projectDetails?.agencies'>
                  <p>Agencies</p>
                  <p v-for='agency in work.projectDetails?.agencies'>{{ agency }}</p>
                </div>
                <div class='work-hero-details-info-section detail-anima' v-if='work.projectDetails?.awards'>
                  <p>Recognition</p>
                  <p v-for='award in work.projectDetails?.awards'>{{ award }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if='work.projectHeroText' class='work-intro'>
          <span class='anima-fade'>
            <p class='work-intro-header'>Introduction</p>
          </span>
          <span class='anima-fade'>
            <SanityContent :blocks='work.projectHeroText' />
          </span>
        </div>
        <div v-if='work.projectSections' class='work-sections'>
          <template v-for='section in work.projectSections.sections'>
            <ImageGrid v-if='section._type == "imageGrid"' :data='section' />
            <FullWidthImage v-else-if='section._type == "fullWidthImage"' :data='section' />
            <ProjectText v-else-if='section._type == "projectText"' :data='section' />
            <PlainText v-else-if='section._type == "projectPlainText"' :data='section' />
          </template>
        </div>
        <div v-if='work.projectCredits' class='work-credits'>
          <ProjectCredits :data='work.projectCredits' />
        </div>
        <template v-if='data.home?.selectedExperiments[isNext]'>
          <div class='work-footer'>
            <span class='anima-fade'>
              <p class='work-footer-text'>
                Do you want to know more about my role,
                the team and the process?
              </p>
            </span>
            <div>
              <span class='anima-fade'>
                <NuxtLink to='mailto:matyas@sochor.xyz' class='work-footer-button'>
                  Let's Chat
                </NuxtLink>
              </span>
            </div>
            <div class='work-footer-divider'></div>
            <div class='work-footer-scroll'>
              <span class='anima-fade'>
                <p class='work-footer-scroll-heading'>Scroll to next experiment</p>
              </span>
              <span class='anima-fade'>
                <h2 class='work-footer-scroll-next'>{{ data.home?.selectedExperiments[isNext]?.projectTitle }}</h2>
              </span>
              <span class='anima-fade'>
                <div class='work-footer-scroll-spinner'>
                  <div class='work-footer-scroll-spinner-base'>
                    <svg viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.9992 26.9004L22.5763 27.3234L22.9992 27.7451L23.4222 27.3234L22.9992 26.9004ZM23.4222 26.4775L18.6431 21.6985L17.7972 22.5443L22.5763 27.3234L23.4222 26.4775ZM23.4222 27.3234L28.2012 22.5443L27.3553 21.6985L22.5763 26.4775L23.4222 27.3234ZM23.5966 26.9004L23.5966 16.3953L22.4018 16.3953L22.4018 26.9004L23.5966 26.9004Z"
                        fill="black" />
                    </svg>
                  </div>
                  <div class='work-footer-scroll-spinner-progress'>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle v-if='da.c' ref='ellipse' cx="22" cy="22" r="21.5" stroke='black'
                        :stroke-dasharray="`${(da?.c - da?.p)} ${da?.p}`" />
                    </svg>
                  </div>
                </div>
              </span>
              <span class='anima-scale'>
                <div ref='scrollImage' v-if='data.home?.selectedExperiments[isNext]' class='work-footer-scroll-image'>
                  <template
                    v-if='data.home?.selectedExperiments[isNext]?.projectCaseImage?.projectCaseSelection === "image"'>
                    <SanityImage class='a'
                      :asset-id="data.home?.selectedExperiments[isNext]?.projectCaseImage?.image.asset?._ref"
                      auto="format" w='1000' fit='clip' />
                  </template>
                  <template
                    v-else-if="data.home?.selectedExperiments[isNext]?.projectCaseImage?.projectCaseSelection === 'video'">
                    <SanityFile :asset-id="data.home?.selectedExperiments[isNext]?.projectCaseImage?.video.asset?._ref">
                      <template #default="{ src }">
                        <video ref='video' class='a' autoplay='true' playsinline='true' loop='true' muted
                          :src='src'></video>
                      </template>
                    </SanityFile>
                  </template>
                </div>
              </span>
            </div>
          </div>
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang='scss'>
.work {
  position: relative;

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);

    @include mobile() {
      gap: mobile-vw(6px);
    }
  }

  &-hero {
    position: relative;
    height: calc(100vh - desktop-vw(20px));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include rounded-border();

    @include mobile() {
      min-height: calc(100vh - mobile-vw(20px));
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

      img {
        flex-grow: 1;
        @include image-default();
      }

      video {
        height: 100%;
        width: 100%;
        flex-grow: 1;
        object-fit: cover;
      }
    }

    &-details {
      min-height: desktop-vw(125px);
      width: 100%;
      position: absolute;
      z-index: 4;
      bottom: 0;
      left: 0;
      background: $white10;
      backdrop-filter: blur(10px);
      padding: desktop-vw(18px) desktop-vw(24px) desktop-vw(28px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: flex-start;

      @include mobile() {
        min-height: mobile-vw(125px);
        padding: mobile-vw(18px) mobile-vw(14px) mobile-vw(28px);
        justify-content: flex-start;
        gap: mobile-vw(40px);
        overflow-x: scroll;
      }

      &-client {
        display: flex;
        flex-direction: column;
        gap: desktop-vw(6px);
        @include small-type();
        line-height: desktop-vw(14px);
        color: #FFFFFF66;

        @include mobile() {
          gap: mobile-vw(6px);
          line-height: mobile-vw(14px);
        }

        &-link {
          color: $white;
          display: flex;
          // gap: desktop-vw(4px);
          align-content: center;
          margin-bottom: desktop-vw(4px);

          @include mobile() {
            //gap: mobile-vw(4px);
            margin-bottom: mobile-vw(4px);
          }

          &::after {
            content: url('~/assets/svg/link-arrow.svg');
            width: desktop-vw(13px);
            height: desktop-vw(13px);
            display: inline-block;
            margin-left: 4px;
            //margin-top: 2px;
            // margin-bottom: -2px;
            overflow: hidden;

            @include mobile() {
              width: mobile-vw(13px);
              height: mobile-vw(13px);
            }
          }
        }

        &-footer {
          width: 100%;
          border: solid 1px #FFFFFF33;
        }
      }

      &-info {
        display: flex;
        gap: desktop-vw(130px);
        align-content: flex-start;

        @include mobile() {
          gap: mobile-vw(40px);
        }

        &-section {
          @include small-type();
          line-height: desktop-vw(14px);
          display: flex;
          flex-direction: column;
          gap: desktop-vw(6px);
          color: $white;

          @include mobile() {
            gap: mobile-vw(6px);
            line-height: mobile-vw(14px);
            min-width: mobile-vw(100px);
          }

          &>p {
            &:first-child {
              color: #FFFFFF66;
            }
          }
        }
      }
    }
  }

  &-intro {

    &-header {
      margin-top: desktop-vw(30px);
      @include body-type();
      @include small-type();
      color: #00000040;
      margin-bottom: desktop-vw(320px);

      @include mobile() {
        margin-bottom: mobile-vw(114px);
        margin-top: mobile-vw(30px);
      }
    }

    margin-bottom: desktop-vw(30px);
    @include large-heading();
    max-width: 75%;

    @include mobile() {
      padding: 0 mobile-vw(14px);
      margin-bottom: mobile-vw(30px);
      max-width: 100%;
    }

    & strong {
      color: $black50;
    }
  }

  &-sections {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);

    @include mobile() {
      gap: mobile-vw(6px);
    }

  }

  &-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(20px);

    @include mobile() {
      gap: mobile-vw(20px);
      padding: 0 mobile-vw(14px);
    }

    &-text {
      @include medium-type();
      width: 40%;
      margin-top: desktop-vw(68px);

      @include mobile() {
        margin-top: mobile-vw(68px);
        width: 100%;
      }
    }

    &-button {
      @include button-default-black();
      @include small-type();
      width: auto;
      margin-bottom: desktop-vw(76px);
      padding: desktop-vw(12px) desktop-vw(25px);

      @include mobile() {
        margin-bottom: mobile-vw(76px);
        padding: mobile-vw(12px) mobile-vw(25px);
      }
    }

    &-divider {
      border: solid .5px $black10;
      margin-bottom: desktop-vw(96px);

      @include mobile() {
        margin-bottom: mobile-vw(96px);
      }
    }

    &-scroll {
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      gap: desktop-vw(24px);
      padding: 0 desktop-vw(60px);

      @include mobile() {
        gap: mobile-vw(24px);
        padding: 0 mobile-vw(60px);
      }

      &-heading {
        @include small-type();
        color: $black50;
      }

      &-next {
        @include sans-serif-regular();
        font-size: desktop-vw(56px);
        line-height: desktop-vw(67px);

        @include mobile() {
          text-align: center;
          font-size: mobile-vw(56px);
          line-height: mobile-vw(67px);
        }
      }

      &-spinner {
        position: relative;
        height: desktop-vw(44px);
        width: desktop-vw(44px);
        border-radius: 50%;
        margin-bottom: desktop-vw(144px);

        @include mobile() {
          height: mobile-vw(44px);
          width: mobile-vw(44px);
          margin-bottom: mobile-vw(144px);
        }

        &-base {
          position: relative;
          z-index: 1;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background: $white;
          border: $black10 solid 1px;
        }

        &-progress {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background: transparent;
          transform: rotate(-90deg);

          svg {
            height: desktop-vw(44px);
            width: desktop-vw(44px);

            @include mobile() {
              height: mobile-vw(44px);
              width: mobile-vw(44px);
            }
          }
        }
      }

      &-image {
        position: absolute;
        top: calc(100% - desktop-vw(74px));
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - desktop-vw(120px));

        @include rounded();
        overflow: hidden;

        @include mobile() {
          top: calc(100% - mobile-vw(74px));
          width: calc(100% - mobile-vw(10px));
        }

        img {
          @include image-default();
        }

        video {
          @include image-default();
        }
      }


    }
  }
}
</style>

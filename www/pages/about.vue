<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  pageTransition: {
    css: false,
    name: 'about',
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

const app = useNuxtApp()
const { isMobile } = useDevice()
const store = useData()
const { data } = storeToRefs(store)
const loading = ref(true)
const cleanBio = reactive({ value: null })
const trunc = reactive({ value: null })
const readMore = ref(false)
// const query = groq`*[_type == 'about'][0]`
// const linkQuery = groq`*[_type == 'links'][0].linkArray`
// const { data: about } = useSanityQuery(query)
// const { data: links } = useSanityQuery(linkQuery)

const read = () => {
  readMore.value ? readMore.value = false : readMore.value = true
}

watch([() => store.isFetched, () => loading.value], async () => {
  if (!loading || store.isFetched) {
    useHead({
      title: 'About | Matyas Sochor'
    })

    await nextTick()

    if (isMobile) {
      let t = gsap.utils.toArray('.temp-bio')[0]
      cleanBio.value = t.innerHTML.replace(/<\/?[^>]+(>|$)/g, "")
      let length = cleanBio.value.split('').length
      let median = Math.floor(length / 2) - 30
      trunc.value = cleanBio.value.slice(0, median)
    }

    // console.log(cleanBio.value, splt)

    ScrollTrigger.refresh(true)
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
  <div class='about' id='page'>
    <NuxtLayout name='page'>
      <div v-if='data' class='about-container'>
        <div class='about-container-flex'>
          <div v-if='!isMobile' class='about-avatar'>
            <ul class='about-avatar-list anima-fade'>
              <li>
                <NuxtLink class='about-avatar-list-link' to='/feed'>
                  Website
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class='about-avatar-list-link' to='/feed'>Identity</NuxtLink>
              </li>
              <li>
                <NuxtLink class='about-avatar-list-link' to='/feed'>Branding</NuxtLink>
              </li>
              <li>
                <NuxtLink class='about-avatar-list-link' to='/feed'>Motion</NuxtLink>
              </li>
              <li>
                <NuxtLink class='about-avatar-list-link' to='/feed'>Print</NuxtLink>
              </li>
            </ul>
            <div v-if='data?.about.bioImage' class='about-avatar-image'>
              <span class='anima-scale'>
                <SanityImage class='a' :asset-id='data?.about.bioImage.asset?._ref' auto='format' w='2000' fit='clip' />
              </span>
            </div>
          </div>
          <div class='about-info'>
            <div v-if='data?.about.bio' class='about-info-bio anima-fade'>
              <div class='temp-bio'>
                <SanityContent :blocks='data?.about.bio' />
              </div>
              <template v-if='!isMobile'>
                <SanityContent v-if='!cleanBio.value' :blocks='data?.about.bio' />
              </template>
              <template v-else>
                <template v-if='!trunc.value'>
                  <SanityContent class='bio-main' :blocks='data?.about.bio' />
                </template>
                <template v-else>
                  <SanityContent class='bio-main' v-if='readMore' :blocks='data?.about.bio' />
                  <p v-if='!readMore' class='about-info-bio-trunc'>{{ trunc.value }}</p>
                  <div class='about-info-bio-readMore'>
                    <p @click='read' v-if='!readMore' class='about-info-bio-readMore-el'>Read More</p>
                    <p @click='read' v-if='readMore' class='about-info-bio-readMore-el active'>Read Less</p>
                  </div>
                </template>
              </template>
            </div>
            <div v-if='isMobile' class='about-avatar'>
              <ul class='about-avatar-list '>
                <li>
                  <NuxtLink to='/feed'>
                    Website
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/feed'>Identity</NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/feed'>Branding</NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/feed'>Motion</NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/feed'>Print</NuxtLink>
                </li>
              </ul>
              <div v-if='data?.about.bioImage' class='about-avatar-image'>
                <span class='anima-scale'>
                  <SanityImage class='a' :asset-id='data?.about.bioImage.asset?._ref' auto='format' w='2000'
                    fit='clip' />
                </span>
              </div>
            </div>
            <template v-if='!isMobile'>
              <ImageCarousel v-if='data?.about.imageCarousel' containerClass='about-info-carousel'
                slideClass='about-info-carousel-image' :images='data?.about.imageCarousel' />
            </template>
            <div v-if='data?.about.resume' class='about-info-resume'>
              <EducationItem v-if='data?.about.resume.educationList' :data='data?.about.resume.educationList' />
              <ExperienceItem v-if='data?.about.resume.experienceList' :data='data?.about.resume.experienceList' />
              <RecognitionItem v-if='data?.about.resume.recognitionList' :data='data?.about.resume.recognitionList' />
              <SoftwareItem v-if='data?.about.resume.softwareList' :data='data?.about.resume.softwareList' />
              <SelectedProjectsItem v-if='data?.about.resume.selectedAndCollaborations'
                :data='data?.about.resume.selectedAndCollaborations' />
            </div>
          </div>
        </div>
        <div class='about-footer'>
          <div v-if='data?.about.footerImage' class='about-footer-image anima-scale'>
            <div class='about-footer-image-overlay'></div>
            <SanityImage class='a' v-if='data?.about?.footerImage?.image'
              :asset-id="data?.about?.footerImage?.image.asset?._ref" auto="format" w='2000' fit='clip' />
            <!-- todo fix video -->
            <SanityFile v-else-if='data?.about?.footerImage?.video'
              :asset-id="data?.about?.footerImage?.video.asset?._ref">
              <template #default="{ src }">
                <video ref='video' class='a' autoplay='true' playsinline='true' loop='true' muted :src='src'></video>
              </template>
            </SanityFile>
            <div class='about-footer-image-text'>
              <p>Let's create something extraordinary together.</p>
              <NuxtLink class='about-footer-image-text-button' to='mailto:matyas@sochor.xyz' target='_blank'>Let's
                Chat
              </NuxtLink>
            </div>
          </div>
          <div class='about-footer-links'>
            <div class='about-footer-link'>
              <NuxtLink to='mailto:matyas@sochor.xyz'>matyas@sochor.xyz</NuxtLink>
            </div>
            <div v-if='data.links' class='about-footer-linkList'>
              <NuxtLink class='about-footer-linkList-el' target='_blank' v-for='link in data.links?.linkArray'
                :to='link.linkURL'>
                {{ link.linkText }}
              </NuxtLink>
              <NuxtLink class='about-footer-linkList-el lets-chat' to='mailto:matyas@sochor.xyz'>
                Let's Chat
              </NuxtLink>
            </div>
            <div class='about-footer-copyright'>
              <NuxtLink v-if='isMobile' to='mailto:matyas@sochor.xyz'>matyas@sochor.xyz</NuxtLink>
              <p>©Matyas Sochor 2024</p>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang='scss'>
.temp-bio {
  display: none;
  visibility: hidden;
  opacity: 0;
}

.about {
  position: relative;
  @include small-type();

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(40px);

    @include mobile() {
      gap: mobile-vw(40px);
      padding: mobile-vw(6px);
    }

    &-flex {
      position: relative;
      display: flex;
      gap: desktop-vw(24px);
      position: relative;

      @include mobile() {
        gap: mobile-vw(24px);
      }
    }
  }

  &-avatar {
    padding: desktop-vw(14px) 0;
    max-width: desktop-vw(300px);
    flex: 0 0 desktop-vw(300px);
    position: sticky;
    bottom: desktop-vw(100px);

    @include mobile() {
      padding: 0;
      padding: 0 mobile-vw(14px);
      position: relative;
      max-width: 100%;
      flex: 1;
      bottom: 0;
      display: flex;
      flex-direction: column;
      gap: mobile-vw(20px);
    }

    &-list {
      color: $black50;
      // position: sticky;
      // top: desktop-vw(24px);

      @include mobile() {
        position: relative;
        display: flex;
        justify-content: space-between;
      }

      &-link {
        &:hover {
          color: $black75;
        }
      }

    }

    &-image {
      position: relative;
      top: desktop-vw(610px);
      @include rounded();
      overflow: hidden;

      @include mobile() {
        top: 0;
      }

      &>span {
        display: flex;
        flex-direction: column;
      }

      &>img {
        flex-grow: 1;
        vertical-align: top;
        @include image-default();
      }
    }
  }

  &-info {
    width: 100%;
    flex: 0 0 1;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(40px);
    padding-top: desktop-vw(14px);

    @include mobile() {
      gap: mobile-vw(40px);
      padding-top: mobile-vw(14px);
    }

    &-bio {
      @include medium-type();
      font-size: desktop-vw(18px);
      line-height: desktop-vw(28px);
      max-width: desktop-vw(726px);
      margin-bottom: desktop-vw(120px);

      strong {
        @include sans-serif-medium();
        font-size: inherit;
        line-height: inherit;

        @include mobile() {
          font-size: mobile-vw(18px);
          line-height: mobile-vw(28px);
        }
      }

      @include mobile() {
        padding: 0 mobile-vw(14px);
        margin-top: mobile-vw(84px);
        font-size: mobile-vw(18px);
        line-height: mobile-vw(28px);
        max-width: 100%;
        margin-bottom: mobile-vw(40px);
        display: flex;
        flex-direction: column;
        gap: mobile-vw(10px);
      }

      &-trunc {
        text-overflow: ellipsis;

        &::after {
          content: '...'
        }
      }

      &-readMore {
        @include body-type();
        @include small-type();
        color: $black50;


        &-el {
          width: auto;
          display: flex;
          max-width: fit-content;
          position: relative;

          &::after {
            content: '+';
            position: absolute;
            top: 0;
            font-size: mobile-vw(13px);
            left: calc(100% + 6px);
            color: rgba(30, 30, 30, .5);
            transition: transform 300ms ease-out;

            @include mobile() {
              font-size: mobile-vw(13px);
            }
          }

          &.active {
            &::after {
              transform: rotate(45deg);
            }
          }
        }
      }

    }

    &-carousel {
      width: 100%;
      display: flex;
      gap: desktop-vw(10px);

      &-image {
        @include rounded();
        overflow: hidden;
        width: auto;
        display: inline-block;
        max-width: desktop-vw(848px);

        &>img {
          @include image-default();
          // object-fit: contain;
          max-height: desktop-vw(560px);
        }
      }
    }

    &-resume {
      @include small-type();
      max-width: desktop-vw(640px);
      display: flex;
      flex-direction: column;
      gap: desktop-vw(32px);
      margin-bottom: desktop-vw(40px);

      @include mobile() {
        max-width: mobile-vw(640px);
        gap: mobile-vw(32px);
        margin-bottom: mobile-vw(40px);
      }
    }
  }

  &-footer {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(24px);

    @include mobile() {
      gap: mobile-vw(24px);
      margin-right: 0;
    }

    &-image {
      position: relative;
      @include rounded();
      overflow: hidden;
      min-height: 100vh;

      @include mobile() {}

      &>img {
        @include image-default();
        object-fit: cover;
        min-height: 100vh;
      }

      &-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%);
      }

      &-text {
        position: absolute;
        bottom: desktop-vw(34px);
        left: desktop-vw(24px);
        max-width: desktop-vw(400px);
        display: flex;
        flex-direction: column;
        gap: desktop-vw(20px);

        @include mobile() {
          bottom: mobile-vw(24px);
          left: mobile-vw(14px);
          max-width: mobile-vw(300px);
          gap: mobile-vw(20px);

        }

        &>p {
          @include medium-type();
          line-height: desktop-vw(40px);
          color: $white;
        }

        &>a {
          display: inline-block;
          @include button-default-white();
          width: fit-content;
          padding: desktop-vw(11px) desktop-vw(20px);

          @include mobile() {
            padding: mobile-vw(11px) mobile-vw(20px);
          }
        }
      }
    }

    &-links {
      margin-right: desktop-vw(14px);
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: desktop-vw(40px);

      @include mobile() {
        font-size: mobile-vw(12px);
        margin-bottom: mobile-vw(40px);
        flex-direction: column;
        justify-content: flex-start;
        gap: mobile-vw(20px);
        padding: 0 mobile-vw(14px);
        margin-right: 0;
      }
    }

    &-link {
      display: block;
      //min-width: 20%;

      @include mobile() {
        display: none;
      }

      &>a {
        &:hover {
          color: $black75;
        }
      }
    }

    &-linkList {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 50%;

      @include mobile() {
        flex-direction: row;
        max-width: none;
      }

      &>a {
        &:hover {
          color: $black75;
        }
      }

      &-el {
        &:not(:last-child, &.lets-chat) {
          &::after {
            content: url('~/assets/svg/link-dot.svg');
            margin-left: desktop-vw(5px);
            margin-right: desktop-vw(8px);
            vertical-align: top;
            padding-bottom: 5px;
            position: relative;
            bottom: 2px;

            @include mobile() {
              margin-left: mobile-vw(5px);
              margin-right: mobile-vw(8px);
            }
          }
        }

        &.lets-chat {
          &::after {
            content: url('~/assets/svg/link-arrow-gray.svg');
            color: $black50;
            width: desktop-vw(8px);
            height: desktop-vw(8px);
            display: inline-block;
            margin-left: desktop-vw(4px);
            margin-bottom: 1px;
            position: relative;
            left: 0;
            transition: left 300ms ease-out;

            @include mobile() {
              margin-left: mobile-vw(4px);
              width: mobile-vw(8px);
              height: mobile-vw(9px);
            }
          }

          &:hover {
            &::after {
              left: 5px;
            }
          }
        }
      }
    }

    &-copyright {
      color: $black50;
      min-width: desktop-vw(180px);
      display: flex;
      justify-content: flex-end;

      @include mobile() {
        &>a {
          color: $black;
        }

        min-width: mobile-vw(180px);
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
      }

    }
  }
}
</style>

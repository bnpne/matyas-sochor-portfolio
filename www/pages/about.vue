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
      ScrollTrigger.update()

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
const query = groq`*[_type == 'about'][0]`
const { data: about } = useSanityQuery(query)

const { isMobile } = useDevice()

useHead({
  title: 'About | Matyas Sochor'
})

onMounted(() => {
  app.$scrollStart()
})
</script>

<template>
  <div class='about' id='page'>
    <NuxtLayout v-if='about' name='work'>
      <div class='about-container'>
        <div class='about-container-flex'>
          <div v-if='!isMobile' class='about-avatar'>
            <ul class='about-avatar-list'>
              <ScrollFadeIn>
                <li>
                  <NuxtLink to='/archive'>
                    Website
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/archive'>Identity</NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/archive'>Branding</NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/archive'>Motion</NuxtLink>
                </li>
                <li>
                  <NuxtLink to='/archive'>Print</NuxtLink>
                </li>
              </ScrollFadeIn>
            </ul>
            <div v-if='about.bioImage' class='about-avatar-image'>
              <ScrollScaleIn>
                <SanityImage :asset-id='about.bioImage.asset?._ref' auto='format' w='1000' fit='clip' />
              </ScrollScaleIn>
            </div>
          </div>
          <div class='about-info'>
            <div v-if='about.bio' class='about-info-bio'>
              <ScrollFadeIn>
                <SanityContent :blocks='about.bio' />
              </ScrollFadeIn>
            </div>
            <div v-if='isMobile' class='about-avatar'>
              <ul class='about-avatar-list'>
                <ScrollFadeIn>
                  <li>
                    <NuxtLink to='/archive'>
                      Website
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/archive'>Identity</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/archive'>Branding</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/archive'>Motion</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to='/archive'>Print</NuxtLink>
                  </li>
                </ScrollFadeIn>
              </ul>
              <div v-if='about.bioImage' class='about-avatar-image'>
                <ScrollScaleIn>
                  <SanityImage :asset-id='about.bioImage.asset?._ref' auto='format' w='1000' fit='clip' />
                </ScrollScaleIn>
              </div>
            </div>
            <template v-if='!isMobile'>
              <ImageCarousel v-if='about.imageCarousel' containerClass='about-info-carousel'
                slideClass='about-info-carousel-image' :images='about.imageCarousel' />
            </template>
            <div v-if='about.resume' class='about-info-resume'>
              <EducationItem v-if='about.resume.educationList' :data='about.resume.educationList' />
              <ExperienceItem v-if='about.resume.experienceList' :data='about.resume.experienceList' />
              <RecognitionItem v-if='about.resume.recognitionList' :data='about.resume.recognitionList' />
              <SoftwareItem v-if='about.resume.softwareList' :data='about.resume.softwareList' />
              <SelectedProjectsItem v-if='about.resume.selectedAndCollaborations'
                :data='about.resume.selectedAndCollaborations' />
            </div>
          </div>
        </div>
        <div class='about-footer'>
          <ScrollScaleIn>
            <div v-if='about.footerImage' class='about-footer-image'>
              <div class='about-footer-image-overlay'></div>
              <SanityImage :asset-id='about.footerImage?.asset?._ref' format='auto' w='1000' fit='clip' />
              <div class='about-footer-image-text'>
                <p>Let's create something extraordinary together.</p>
                <NuxtLink class='about-footer-image-text-button' to='mailto:matyas@sochor.xyz' target='_blank'>Let's
                  Chat
                </NuxtLink>
              </div>
            </div>
          </ScrollScaleIn>
          <div class='about-footer-links'>
            <div class='about-footer-link'>
              <NuxtLink to='mailto:matyas@sochor.xyz'>matyas@sochor.xyz</NuxtLink>
            </div>
            <div class='about-footer-linkList'>
              <NuxtLink to='mailto:matyas@sochor.xyz'>matyas@sochor.xyz</NuxtLink>
            </div>
            <div class='about-footer-copyright'>
              <p>©Matyas Sochor 2024</p>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang='scss'>
.about {
  position: relative;
  @include small-type();

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(40px);

    @include mobile() {
      gap: mobile-vw(40px);
      //padding: mobile-vw(14px);
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
      bottom: auto;
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
    }

    &-image {
      position: relative;
      top: desktop-vw(200px);
      @include rounded();
      overflow: hidden;

      @include mobile() {
        transform: none;
      }

      &>img {
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

    @include mobile() {
      gap: mobile-vw(40px);
    }

    &-bio {
      @include medium-type();
      font-size: desktop-vw(20px);
      line-height: desktop-vw(34px);
      max-width: desktop-vw(725px);
      margin-bottom: desktop-vw(120px);

      @include mobile() {
        padding: 0 mobile-vw(14px);
        margin-top: mobile-vw(84px);
        font-size: mobile-vw(18px);
        line-height: mobile-vw(28px);
        max-width: 100%;
        margin-bottom: mobile-vw(40px);
      }

      strong {
        font-weight: 500;
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
    margin-right: desktop-vw(14px);

    @include mobile() {
      gap: mobile-vw(24px);
      margin-right: 0;
    }

    &-image {
      position: relative;
      @include rounded();
      overflow: hidden;
      min-height: 100vh;

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
      display: flex;
      justify-content: space-between;
      margin-bottom: desktop-vw(40px);

      @include mobile() {
        margin-bottom: mobile-vw(40px);
      }

      &-link,
      &-copyright {
        min-width: desktop-vw(180px);

        @include mobile() {
          min-width: mobile-vw(180px);

        }

        &-copyright {
          display: flex;
          justify-content: flex-end;
          color: $black50;
        }
      }
    }
  }
}
</style>

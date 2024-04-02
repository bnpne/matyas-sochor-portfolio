<script setup lang='ts'>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  pageTransition: {
    css: false,
    name: 'archive',
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
const query = groq`*[_type == 'articles'][0]{..., articleList[]{..., project->{projectSlug, projectType, projectFilters{filter[]->}},'articleType':articleTypeFilters.showFilter[]->}}`
const { data: archive } = useSanityQuery(query)

useHead({
  title: 'Archive | Matyas Sochor'
})

const { isMobile } = useDevice()
const filtersIsOpen = reactive({ isOpen: false })

const grid = ref()

const toggleFilter = () => {
  if (filtersIsOpen.isOpen) {
    filtersIsOpen.isOpen = false
  } else {
    filtersIsOpen.isOpen = true
  }
}

onMounted(() => {
})
</script>

<template>
  <div class='archive' id='page'>
    <NuxtLayout name='archive'>
      <div v-if='archive?.articleList' ref='grid' class='archive-container'>
        <ArchiveCard v-for='card in archive.articleList' :card='card' />
      </div>
      <div v-if='isMobile' class='archive-mobile'>
        <div @click='toggleFilter' v-if='!filtersIsOpen.isOpen' class="archive-mobile-pill">
          Filter
        </div>
        <div @click='toggleFilter' v-else class="archive-mobile-pill-close">
          Close
        </div>
      </div>
      <div v-if='isMobile' class='archive-overlay' :class='{ open: filtersIsOpen.isOpen }'>
        <ClientOnly>
          <ArchiveShowFilters />
          <ArchiveProjectFilters />
          <ArchiveExperimentFilters />
        </ClientOnly>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang='scss'>
.archive {
  position: relative;

  &-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: desktop-vw(24px);
    column-gap: desktop-vw(24px);
    grid-gap: 24px;
    padding: desktop-vw(90px) 0 0;

    @include mobile() {
      display: flex;
      flex-direction: column;
      gap: mobile-vw(20px);
      padding: mobile-vw(84px) mobile-vw(20px);
    }
  }

  &-mobile {
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 8;
    bottom: mobile-vw(24px);
    left: 0;
    width: 100%;

    @include small-type();

    &-pill {
      @include button-default-white();
      padding: mobile-vw(12px) mobile-vw(24px);
      box-shadow: 0px 2px 12px 0px #0000001F;

      &-close {
        @include button-default-black();
        padding: mobile-vw(12px) mobile-vw(24px);
        box-shadow: 0px 2px 12px 0px #0000001F;
      }
    }
  }

  &-overlay {
    background: $white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 6;
    display: none;
    flex-direction: column;
    padding: mobile-vw(76px) mobile-vw(20px);
    gap: mobile-vw(20px);

    &.open {
      display: flex;
    }
  }
}
</style>

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

const main = useStore()
const { activeFilters, activeCards } = storeToRefs(main)
const router = useRouter()
const route = useRoute()
const params = reactive({ value: [] })
const { isMobile } = useDevice()
const filtersIsOpen = reactive({ isOpen: false })
const cardsActive = ref(false)
const grid = ref()
const store = useData()
const loading = ref(true)
const archiveData = reactive({ value: null })
const ca = reactive({ value: [] })

watch([() => store.isFetched, () => loading.value], async () => {
  if (!loading || store.isFetched) {
    await nextTick()
    archiveData.value = store.data.articles.articleList

    // Set Head
    useHead({
      title: 'Archive | Matyas Sochor'
    })

    // Set Grid
    if (grid.value) {
      cardsActive.value = true
    }

    ca.value = archiveData.value
  }
})

const toggleFilter = () => {
  if (filtersIsOpen.isOpen) {
    filtersIsOpen.isOpen = false
  } else {
    filtersIsOpen.isOpen = true
  }
}

watch(activeCards.value, () => {
  ca.value = activeCards.value
})

watch(activeFilters.value, async () => {
  const temp = activeFilters.value.map(a => {
    let html = a.el.children[0].innerHTML
    return html
  })

  if (temp.length > 0) {
    params.value = temp
  } else {
    params.value = []
  }

  let s = ''

  if (params.value.length > 0) {
    params.value.forEach((p, i) => {
      let str = p
      s += str
      if (i < params.value.length - 1) {
        s += ';'
      }
    })

    await navigateTo({
      path: '/archive',
      query: {
        filter: s,
      }
    })
  } else {
    await navigateTo({
      path: '/archive',
    })
  }
})

onMounted(async () => {
  loading.value = false
  if (grid.value) {
  }
})

onBeforeUnmount(() => {
  // Revert gsap context
  ScrollTrigger.killAll()
})
</script>

<template>
  <div class='archive' id='page'>
    <NuxtLayout name='archive'>
      <ClientOnly>
        <div class='archive-container'>
          <template v-if='archiveData.value'>
            <template v-if='!isMobile'>
              <masonry-wall :items="ca.value" :ssr-columns="1" :column-width="300" :gap="24" :max-columns='3'
                :min-columns='3'>
                <template #default="{ item, index }">
                  <ArchiveCard :card='item' />
                </template>
              </masonry-wall>
            </template>
            <template v-else>
              <ArchiveCard v-for='card in archiveData.value' :card='card' />
            </template>
          </template>
        </div>
      </ClientOnly>
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
    display: block;
    padding: desktop-vw(90px) 0 0;
    margin-right: desktop-vw(14px);

    @include mobile() {
      display: flex;
      flex-direction: column;
      gap: mobile-vw(20px);
      padding: mobile-vw(84px) mobile-vw(20px);
      margin-right: 0;
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

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
const cards = ref([])

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

watch(activeFilters.value, async () => {
  const temp = activeFilters.value.map(a => {
    let html = a.el.children[0].innerHTML
    return { t: a.type, s: html }
  })

  if (temp.length > 0) {
    params.value = temp
  } else {
    params.value = []
  }

  let s = ''
  let j = ''
  let e = ''

  if (params.value.length > 0) {
    params.value.forEach((p, i) => {
      let str = p.s
      if (p.t === 'show') {
        s += str
        s += ';'
      }
      if (p.t === 'project') {
        j += str
        j += ';'
      }
      if (p.t === 'experiment') {
        e += str
        e += ';'
      }
    })

    await navigateTo({
      path: '/archive',
      query: {
        filter: s,
        project: j,
        experiment: e
      },
      replace: true
    })
  } else {
    await navigateTo({
      path: '/archive',
      replace: true
    })
  }
})

const append = () => {
  ca.value = archiveData.value
}

onMounted(() => {
  loading.value = false
})

onBeforeUnmount(() => {
  // Revert gsap context
  main.clearActiveShowFilters()
  main.clearActiveProjectFilters()
  main.clearActiveExperimentFilters()
  if (route.query) {
    router.replace({ query: '' })
  }
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
              <!-- <MasonryWall :items="ca.value" :column-width="412" :gap="24"> -->
              <!--   <template #default="{ item }"> -->
              <!--     <ArchiveCard :card='item' /> -->
              <!--   </template> -->
              <!-- </MasonryWall> -->
              <ArchiveCard v-for='card in archiveData.value' :card='card' />
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
          <!-- <ArchiveProjectFilters /> -->
          <!-- <ArchiveExperimentFilters /> -->
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
    grid-auto-rows: desktop-vw(4px);
    gap: 12px;
    //display: block;
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

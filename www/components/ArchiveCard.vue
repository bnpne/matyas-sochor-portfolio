<script setup lang='ts'>
const props = defineProps(['card',])

const store = useStore()
const { activeFilters, activeFilterTypes } = storeToRefs(store)
const { isMobile } = useDevice();
const article = ref()
const route = useRoute()
const routeParams = reactive({ params: route.query.filter })
const isActive = ref(true)
const isProject = ref(false)
const cardFilters = reactive({ value: [] })
const cardProjectFilters = reactive({ value: [] })
const cardExperimentFilters = reactive({ value: [] })
const isConfigured = ref(false)

const resizeGridItem = (item) => {
  const grid = document.querySelector(".archive-container");
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('row-gap'));
  const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;
}

watch([() => route.query.filter, () => route.query.project, () => route.query.experiment], async () => {
  routeParams.params = route.query.filter ? route.query : ''
  if (routeParams.params !== '') {
    let filterSplt = route.query.filter.split(';')
    let projectSplt = route.query.project.split(';')
    let experimentSplt = route.query.experiment.split(';')

    if (cardFilters.value.length > 0) {
      let isThere = false
      cardFilters.value.forEach(c => {
        if (filterSplt.includes(c)) {
          isThere = true
        }
      })

      // filter projects
      if (cardFilters.value.includes('Projects') && routeParams.params.project !== '') {
        cardProjectFilters.value.forEach(t => {
          if (projectSplt.includes(t)) {
            isThere = true
          } else {
            isThere = false
          }
        })
      }

      // filter experiments
      if (cardFilters.value.includes('Experiments') && routeParams.params.experiment !== '') {
        cardExperimentFilters.value.forEach(t => {
          if (experimentSplt.includes(t)) {
            isThere = true
          } else {
            isThere = false
          }
        })
      }

      if (isThere) {
        isActive.value = true
      } else {
        isActive.value = false
      }
    }
  } else {
    isActive.value = true
  }
})

watch(() => isConfigured.value, async () => {
  await nextTick()
  routeParams.params = route.query.filter ? route.query : ''
  if (routeParams.params !== '') {
    let filterSplt = route.query.filter ? route.query.filter.split(';') : ''
    let projectSplt = route.query.project ? route.query.project.split(';') : ''
    let experimentSplt = route.query.experiment ? route.query.experiment.split(';') : ''

    if (cardFilters.value.length > 0) {
      let isThere = false
      cardFilters.value.forEach(c => {
        if (filterSplt.includes(c)) {
          isThere = true
        }
      })

      // filter projects
      if (cardFilters.value.includes('Projects') && routeParams.params.project !== '') {
        cardProjectFilters.value.forEach(t => {
          if (projectSplt.includes(t)) {
            isThere = true
          } else {
            isThere = false
          }
        })
      }

      // filter experiments
      if (cardFilters.value.includes('Experiments') && routeParams.params.experiment !== '') {
        cardExperimentFilters.value.forEach(t => {
          if (experimentSplt.includes(t)) {
            isThere = true
          } else {
            isThere = false
          }
        })
      }

      if (isThere) {
        isActive.value = true
      } else {
        isActive.value = false
      }
    }
  } else {
    isActive.value = true
  }
})

const configureCard = () => {
  if (props.card.isProject && props.card.project.projectType === 'selectedProject') {
    isProject.value = true
  }

  props.card.articleType.forEach(a => {
    cardFilters.value.push(a.title)
  })

  if (props.card.isProject) {
    if (props.card.project.projectType === 'selectedProject') {
      props.card.project.projectFilters.filter.forEach(f => {
        cardProjectFilters.value.push(f.tagTitle)
      })
    }
    if (props.card.project.projectType === 'experiment') {
      props.card.project.projectFilters.filter.forEach(f => {
        cardExperimentFilters.value.push(f.tagTitle)
      })
    }
  }
  isConfigured.value = true
}

onMounted(() => {
  configureCard()
})
</script>

<template>
  <div v-if='card' ref='article' class='card' :class='{
    project: isProject, base: !isProject, active:
      isActive
  }' :data-active='isActive ? "true" : "false"'>
    <div class='card-heading'>
      <p class='card-type'>{{ card.articleType[0]?.title }}</p>
      <div v-if='isProject' class='card-tag'>{{
    card.project?.projectFilters?.filter[0].tagTitle }}</div>
    </div>
    <p class='card-title'>{{ card.articleTitle }}</p>
    <div class='card-image'>
      <SanityImage :asset-id='card.articleImage?.asset?._ref' auto='format' w='1000' fit='clip' />
    </div>
    <p class='card-desc'>{{ card.articleDesc }}</p>
    <!-- Has article Link, but not a project -->
    <template v-if='card.articleLink'>
      <div class='card-link'>
        <NuxtLink :to='card.articleLink' target='_blank'>{{ card.articleLinkText
          }}</NuxtLink>
      </div>
    </template>
    <!-- is a selected project -->
    <template v-if='isProject'>
      <div class='card-link'>
        <NuxtLink v-if='card.project.projectType === "selectedProject"'
          :to="`/work/${card.project.projectSlug.current}`">
          Show
        </NuxtLink>
      </div>
    </template>
    <!-- is not a selected project, but still a project -->
    <template v-if='!isProject && card.articleType === "Projects"'>
      <div class='card-link-rounded'>
        <NuxtLink v-if='card.project.projectType === "selectedProject"'
          :to="`/work/${card.project.projectSlug.current}`">
          Show
        </NuxtLink>
      </div>
    </template>
    <!-- is an experiment -->
    <template v-if='card.project?.projectType === "experiment"'>
      <div class='card-link-rounded'>
        <NuxtLink :to="`/experiments/${card.project.projectSlug.current}`">
          Show
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style lang='scss'>
.base {
  @include rounded-border();
  background: $white;
  color: $black;
}

.project {
  @include rounded();
  background: $black;
  color: $white;

  .card-type {
    color: $white50;
  }

  .card-image {
    aspect-ratio: 388/408;
  }

  .card-link {
    &>a {
      @include button-default-white();
      min-width: desktop-vw(80px);
      text-align: center;

      @include mobile() {
        min-width: mobile-vw(80px);
      }
    }
  }
}

.card {
  padding: desktop-vw(16px);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);
  height: fit-content;
  display: none;

  @include mobile() {
    gap: mobile-vw(12px);
    padding: mobile-vw(12px);
  }

  &.active {
    display: flex;
  }

  &-heading {
    display: flex;
    justify-content: space-between;
  }

  &-type {
    @include small-type();
    color: $black50;
  }

  &-tag {
    @include tag();
  }

  &-title {
    @include sans-serif-regular();

    @include mobile() {
      font-size: mobile-vw(15px);
      line-height: mobile-vw(20px);
    }
  }

  &-desc {
    @include sans-serif-regular();
    @include small-type();
  }

  &-link {
    @include small-type();
    color: $black50;

    &>a {
      &:hover {
        color: $black75;
      }
    }

    &-rounded {
      &>a {
        @include button-third();
      }
    }
  }

  &-image {
    overflow: hidden;
    @include rounded();
    aspect-ratio: 16/9;

    &>img {
      @include image-default();
    }
  }
}
</style>

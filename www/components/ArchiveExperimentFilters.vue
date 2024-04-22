<script setup lang='ts'>
const query = groq`*[_type == 'articles'][0]{'filters':articleList[].project->{projectType,'filters': projectFilters.filter[]->tagTitle}}`
const { data: filters } = useSanityQuery(query)

const store = useStore()
const { experimentFilters, activeFilterTypes, experimentFilterLengths, activeFilters } = storeToRefs(store)
const reset = ref(false)
const isActive = ref(false)
const route = useRoute()
const filtersArr = ref([])

watch(() => route.query.filter, () => {
  if (route.query.filter) {

    let splt = route.query.filter.split(';')
    if (splt.includes('Experiments')) {
      isActive.value = true
    } else {
      store.clearActiveExperimentFilters()
      filtersArr.value.forEach(f => {
        if (f.classList.contains('active')) {
          f.classList.toggle('active')
        }
      })
      isActive.value = false
    }
  } else {
    isActive.value = false
  }
})

const resetFilter = (event) => {
  event.preventDefault()
  activeFilters.value.forEach((f, i) => {
    if (f.type === 'experiment') {
      f.el.classList.toggle('active')
    }
  })
  activeFilters.value.forEach(a => {
    if (a.type === 'experiment') {
      store.removeActiveFilter({ type: 'experiment', el: a.el })
    }
  })
  reset.value = false
}

const selectFilter = (event) => {
  event.preventDefault()
  event.target.classList.toggle('active')

  if (event.target.classList.contains('active')) {
    store.addActiveFilter({ type: 'experiment', el: event.target })

    if (activeFilters.value.length > 0) {
      let t = true
      activeFilters.value.forEach(a => {
        if (a.type === 'experiment') {
          t = true
        } else {
          t = false
        }
      })
      if (t === false) {
        reset.value = false
      } else {
        reset.value = true
      }
    }
  } else {
    store.removeActiveFilter({ type: 'experiment', el: event.target })
    if (activeFilters.value.length === 0) {
      let t = true
      activeFilters.value.forEach(a => {
        if (a.type === 'experiment') {
          t = true
        } else {
          t = false
        }
      })
      if (t === false) {
        reset.value = false
      } else {
        reset.value = true
      }
    }
  }
}

watch(filtersArr.value, () => {
  if (route.query.filter) {
    let splt = route.query.filter.split(';')
    if (splt.includes('Experiments')) {
      isActive.value = true
    }
  }
})

watch(filters, () => {
  if (filters.value?.filters) {
    toRaw(filters.value.filters).forEach(f => {
      if (f !== null) {
        if (f.projectType === 'experiment') {
          f.filters.forEach(l => {
            store.addExperimentFilter(l)
          })
        }
      }
    })
  }
})


onMounted(() => {
  // These are the filters of each article on the archive page
})

onUnmounted(() => {
  store.clearFilters()
})
</script>

<template>
  <div class='filters filters-experiment' :class='{ active: isActive }'>
    <div class=' filters-heading'>
      <p>Experiments</p>
      <!-- <div @click='resetFilter' v-if='reset' class='filters-reset'>Reset</div> -->
      <!-- <div v-else class='filters-caret'> -->
      <!--   <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
      <!--     <path fill-rule="evenodd" clip-rule="evenodd" -->
      <!--       d="M1.25 0.416992L5 4.16699L8.75 0.416992L10 1.66699L5 6.66699L0 1.66699L1.25 0.416992Z" fill="#1E1E1E" -->
      <!--       fill-opacity="0.75" /> -->
      <!--   </svg> -->
      <!-- </div> -->
    </div>
    <div v-if='experimentFilters' class='filters-filters'>
      <div @click='selectFilter' ref='filtersArr' v-for='filter, index in experimentFilters' class='filters-filter'>
        <span style='pointer-events: none;'>
          {{ filter }}
        </span>
        <span style='pointer-events: none;'>
          {{ ('0' + experimentFilterLengths[index]).slice(-2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.filters-experiment {
  @include rounded-border();
  padding: desktop-vw(12px);
  @include small-type();
  display: none;
  flex-direction: column;
  gap: desktop-vw(12px);

  @include mobile() {
    padding: mobile-vw(12px);
    gap: mobile-vw(12px);

  }

  &.active {
    display: flex;
  }

  &-heading {
    display: flex;
    justify-content: space-between;
  }

  &-reset {
    color: $black50;
    cursor: pointer;

    &::before {
      content: url('~/assets/svg/reset-x.svg');
      margin-right: desktop-vw(4px);

      @include mobile() {
        margin-right: mobile-vw(4px);

      }
    }
  }

  &-filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: desktop-vw(8px);

    @include mobile() {
      gap: mobile-vw(8px);
    }
  }

  &-filter {
    @include button-third();
    padding: desktop-vw(10px) desktop-vw(12px);
    display: flex;
    flex-direction: row;
    gap: desktop-vw(4px);

    @include mobile() {
      padding: mobile-vw(10px) mobile-vw(12px);
      gap: mobile-vw(4px);
    }

    &.active {
      background: $black;
      color: $white;

      &>span {
        &:last-child {
          color: $white50;
        }
      }
    }

    &>span {
      &:last-child {
        color: $black50;
      }
    }

    &:hover {
      background-color: $black10 !important;
      color: $black !important;
      border: 1px $black10 solid !important;

      &>span {
        &:last-child {
          color: $black50 !important;
        }
      }

      &.active {
        background: transparent;
        color: $black;
        border: 1px $black10 solid;

        &>span {
          &:last-child {
            color: $black50;
          }
        }
      }
    }
  }
}
</style>

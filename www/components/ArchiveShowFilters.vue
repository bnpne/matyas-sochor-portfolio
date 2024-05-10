<script setup lang='ts'>
const query = groq`*[_type == 'articles'][0]{'filters':articleList[].articleTypeFilters.showFilter[]->{'title': showTagTitle}, 'categories':articleList[].articleCategory}`
const { data: filters } = useSanityQuery(query)

const store = useStore()
const { showFilters, showFilterLengths, activeFilters } = storeToRefs(store)
const route = useRoute()

const reset = ref(false)
const filterButton = ref([])

const resetFilter = async (event) => {
  event.preventDefault()
  filterButton.value.forEach((f, i) => {
    if (f.classList.contains('active')) {
      f.classList.toggle('active')
    }
  })

  store.clearActiveShowFilters()
  await navigateTo({
    path: '/feed',
  })
  reset.value = false
}

const selectFilter = (event) => {
  event.preventDefault()
  event.target.classList.toggle('active')

  if (event.target.classList.contains('active')) {
    store.addActiveFilter({ type: 'show', el: event.target })

    if (activeFilters.value.length > 0) {
      let t = true
      activeFilters.value.forEach(a => {
        if (a.type === 'show') {
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
    store.removeActiveFilter({ type: 'show', el: event.target })
    if (activeFilters.value.length === 0) {
      let t = true
      activeFilters.value.forEach(a => {
        if (a.type === 'show') {
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

watch(filters, () => {
  if (filters.value?.filters) {
    toRaw(filters.value.filters).forEach(f => {
      store.addShowFilter(f.title)
    })
  }
})

watch(filterButton.value, () => {
  if (route.query.filter) {
    let splt = route.query.filter.split(';')
    toRaw(filterButton.value).forEach((b, i) => {
      let s = b.children[0].innerHTML
      if (splt.includes(s)) {
        b.classList.toggle('active')
        store.addActiveFilter({ type: 'show', el: b })
      }
    })
  }
})


onMounted(() => {
})

onUnmounted(() => {
  store.clearFilters()
})
</script>

<template>
  <div class='filters filters-show'>
    <div class='filters-heading'>
      <p>Show</p>
      <!-- <div @click='resetFilter' v-if='reset == true' class='filters-reset'>Reset</div> -->
      <!-- <div v-else class='filters-caret'> -->
      <!--   <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
      <!--     <path fill-rule="evenodd" clip-rule="evenodd" -->
      <!--       d="M1.25 0.416992L5 4.16699L8.75 0.416992L10 1.66699L5 6.66699L0 1.66699L1.25 0.416992Z" fill="#1E1E1E" -->
      <!--       fill-opacity="0.75" /> -->
      <!--   </svg> -->
      <!-- </div> -->
    </div>
    <div v-if='showFilters' class='filters-filters'>
      <div ref='filterButton' @click='selectFilter' v-for='filter, index in showFilters' class='filters-filter'>
        <span style='pointer-events: none;'>
          {{ filter === 'Selected Project' ? filter.split(' ')[1] : filter }}
        </span>
        <span style='pointer-events: none;'>
          {{ ('0' + showFilterLengths[index]).slice(-2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.filters {
  @include rounded-border();
  padding: desktop-vw(12px);
  @include small-type();
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);

  @include mobile() {
    gap: mobile-vw(12px);
    padding: mobile-vw(12px);
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
    transition: all 300ms ease-out;

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
        background: $black75 !important;
        color: $white !important;
        border: 1px $black10 solid;

        &>span {
          &:last-child {
            color: $white50 !important;
          }
        }
      }
    }
  }
}
</style>

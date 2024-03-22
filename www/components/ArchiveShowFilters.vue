<script setup lang='ts'>
const query = groq`*[_type == 'articles'][0]{'filters':articleList[].articleTypeFilters.showFilter[]->{'title': showTagTitle}}`
const { data: filters } = useSanityQuery(query)

const store = useStore()
const { showFilters, showFilterLengths } = storeToRefs(store)
const activeFilters = reactive({ filters: [] })

const reset = ref(false)

const resetfilters = (event) => {
  event.preventDefault()
  console.log('here')
  activeFilters.filters.forEach(f => {
    f.classList.toggle('active')
  })
  activeFilters.filters = []
}

const selectFilter = (event) => {
  event.preventDefault()
  event.target.classList.toggle('active')

  if (event.target.classList.contains('active')) {
    activeFilters.filters.push(event.target)
  } else {
    let index = activeFilters.filters.indexOf(event.target)
    activeFilters.filters.splice(index, 1)
  }
}

watch(activeFilters.filters, () => {
  if (activeFilters.filters.length > 0) {
    reset.value = true
  } else {
    reset.value = false
  }
})

onBeforeMount(() => {
})

onMounted(() => {
  // These are the filters of each article on the archive page
  if (filters.value?.filters) {
    toRaw(filters.value.filters).forEach(f => {
      store.addShowFilter(f.title)
    })
  }
})
</script>

<template>
  <div class='filters filters-show'>
    <div class='filters-heading'>
      <p>Show</p>
      <div @click='resetFilters' v-if='reset == true' class='filters-reset'>Reset</div>
      <div v-else class='filters-caret'>
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M1.25 0.416992L5 4.16699L8.75 0.416992L10 1.66699L5 6.66699L0 1.66699L1.25 0.416992Z" fill="#1E1E1E"
            fill-opacity="0.75" />
        </svg>
      </div>
    </div>
    <div v-if='showFilters' class='filters-filters'>
      <div @click='selectFilter' v-for='filter, index in showFilters' class='filters-filter'>
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
    }
  }

  &-filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: desktop-vw(8px);
  }

  &-filter {
    @include button-third();
    padding: desktop-vw(10px) desktop-vw(12px);
    display: flex;
    flex-direction: row;
    gap: desktop-vw(4px);

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
      &>span {
        &:last-child {
          color: $white50;
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

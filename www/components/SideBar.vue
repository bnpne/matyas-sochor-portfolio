<script setup lang='ts'>
import Lenis from '@studio-freight/lenis'
import R from '~/utils/R'

const query = groq`*[_type == 'home'][0]{...,selectedProjects[]->{..., "filters":projectFilters.filter[]->}, selectedExperiments[]->{..., "filters":projectFilters.filter[]->}}`
const { data } = useSanityQuery<HomeData>(query)

const linkQuery = groq`*[_type == 'links'][0]{linkArray}`
const { data: links } = useSanityQuery(linkQuery)

const wrapper = ref()
const container = ref()
const dropdown = ref()
let isOpen = false
const route = useRoute()

const openDropdown = () => {
  if (!isOpen) {
    isOpen = true
    dropdown.value.classList.toggle('active')
  } else {
    isOpen = false
    dropdown.value.classList.toggle('active')
  }
}

onMounted(() => {
  const lenis = new Lenis({
    wrapper: wrapper.value!,
    content: container.value!
  })

  // @ts-ignore
  R.add(time => {
    lenis.raf(time)
  }, 0)
})
</script>

<template>
  <section ref="wrapper" class='sidebar'>
    <div v-if='data' class='sidebar-avatar'>
      <div class='sidebar-avatar-container'>
        <div class='sidebar-avatar-info'>
          <NuxtLink to='/' v-if='data.avatar' class='sidebar-avatar-info-img'>
            <SanityImage :asset-id="data.avatar?.asset?._ref" auto='format' w='80' />
          </NuxtLink>
          <div class='sidebar-avatar-info-email'>
            <p v-if='data.name' class='sidebar-avatar-info-email-text'>{{ data.name }}</p>
            <div @click='openDropdown' v-if='data.emailForm' class='sidebar-avatar-info-email-link' target='_blank'>
              {{ data.emailForm?.emailText }} +
            </div>
            <div ref='dropdown' v-if='links' class='sidebar-link-dropdown'>
              <NuxtLink v-for='link in links.linkArray' :to='link.linkURL' class='sidebar-link-dropdown-link'>
                {{ link.linkText }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class='sidebar-avatar-about'>
          <NuxtLink to="/about" class='btn btn-third'>About Me</NuxtLink>
        </div>
      </div>
      <div class='sidebar-avatar-gradient'></div>
    </div>
    <div v-if='data' ref='container' class='sidebar-container'>
      <template v-if='route.path !== "/archive"'>
        <SocialPost v-if='data.socialPost' :post='data.socialPost' />
        <SelectedProjects v-if='data.selectedProjects' :projects='data.selectedProjects' />
        <SelectedExperiments v-if='data.selectedExperiments' :experiments='data.selectedExperiments' />
      </template>
      <template v-else>
        <ClientOnly>
          <ArchiveShowFilters />
          <ArchiveProjectFilters />
          <ArchiveExperimentFilters />
        </ClientOnly>
      </template>
    </div>
  </section>
</template>

<style lang='scss'>
.sidebar {
  max-width: desktop-vw(372px);
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;

  &-container {
    width: 100%;
    padding: 0 desktop-vw(24px) desktop-vw(24px);
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(24px);
  }

  &-avatar {
    position: sticky;
    top: 0;
    z-index: 3;

    &-about {
      @include small-type();
    }

    &-container {
      padding: desktop-vw(24px) desktop-vw(24px) 0;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-gradient {
      height: desktop-vw(24px);
      width: 100%;
      background: linear-gradient(180deg, #FFFFFF 32.76%, rgba(115, 115, 115, 0) 100%);
    }

    &-info {
      display: flex;
      gap: desktop-vw(10px);
      align-items: center;
      position: relative;

      &-img {
        max-width: desktop-vw(42px);
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      &-email {
        @include small-type();
        cursor: pointer;

        &-link {
          color: rgba(30, 30, 30, .5);
        }
      }
    }
  }

  &-link-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    @include rounded();
    background: $black;
    color: $white;
    padding: desktop-vw(12px);
    display: flex;
    flex-direction: column;
    gap: desktop-vw(6px);
    @include small-type();
    font-size: desktop-vw(12px);
    pointer-events: none;
    opacity: 0;
    z-index: 4;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }

    &-link {
      &:hover {
        color: $white50;
      }
    }
  }
}
</style>

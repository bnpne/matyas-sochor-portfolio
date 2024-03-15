<script setup lang='ts'>
import Lenis from '@studio-freight/lenis'
import R from '~/utils/R'

const query = groq`*[_type == 'home'][0]{...,selectedProjects[]->{..., "filters":projectFilters.filter[]->}, selectedExperiments[]->{..., "filters":projectFilters.filter[]->}}`
const { data } = useSanityQuery<HomeData>(query)

const wrapper = ref()
const container = ref()

onMounted(() => {
  // console.log(toRaw(data.value))
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
          <div v-if='data.avatar' class='sidebar-avatar-info-img'>
            <SanityImage :asset-id="data.avatar?.asset?._ref" auto='format' w='80' />
          </div>
          <div class='sidebar-avatar-info-email'>
            <p v-if='data.name' class='sidebar-avatar-info-email-text'>{{ data.name }}</p>
            <NuxtLink v-if='data.emailForm' class='sidebar-avatar-info-email-link' target='_blank'
              :to='data.emailForm?.emailUrl'>
              {{ data.emailForm?.emailText }}
            </NuxtLink>
          </div>
        </div>
        <div class='sidebar-avatar-about'>
          <NuxtLink to="/about" class='btn btn-third'>About Me</NuxtLink>
        </div>
      </div>
      <div class='sidebar-avatar-gradient'></div>
    </div>
    <div v-if='data' ref='container' class='sidebar-container'>
      <SocialPost v-if='data.socialPost' :post='data.socialPost' />
      <SelectedProjects v-if='data.selectedProjects' :projects='data.selectedProjects' />
      <SelectedExperiments v-if='data.selectedExperiments' :experiments='data.selectedExperiments' />
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

        &-link {
          color: rgba(30, 30, 30, .5);
        }
      }
    }
  }
}
</style>

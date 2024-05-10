<script setup lang='ts'>
import Lenis from 'lenis'
import R from '~/utils/R'
import gsap from 'gsap'

const store = useData()
const { data } = storeToRefs(store)

const wrapper = ref()
const container = ref()
const dropdown = ref()
const toggler = ref()
const toggle = ref()
const isOpen = ref(false)
const toggleIsOpen = reactive({ isOpen: false })
const route = useRoute()
const { isMobile, isDesktop } = useDevice()
const device = useDevice()

const openToggle = () => {
  if (toggleIsOpen.isOpen) {
    toggleIsOpen.isOpen = false
    toggler.value.classList.toggle('open')
    toggle.value.classList.toggle('open')
  }
  else {
    toggleIsOpen.isOpen = true
    toggler.value.classList.toggle('open')
    toggle.value.classList.toggle('open')
  }
}

const dropdownOver = () => {
  isOpen.value = true
}

const dropdownLeave = () => {
  isOpen.value = false
}

const mobileDropdownToggle = () => {
  if (!isOpen.value) {
    isOpen.value = true
  } else {
    isOpen.value = false
  }
}

onMounted(() => {
  if (!isMobile) {
    const lenis = new Lenis({
      wrapper: wrapper.value!,
      content: container.value!
    })

    // @ts-ignore
    R.add(time => {
      lenis.raf(time)
    }, 0)
  }
})
</script>

<template>
  <section ref="wrapper" class='sidebar'>
    <ClientOnly>
      <div v-if='isMobile' class='sidebar-overlay' :class='{ open: toggleIsOpen.isOpen }'></div>
      <div v-if='data' class='sidebar-avatar'>
        <div class='sidebar-avatar-container'>
          <div class='sidebar-avatar-info' :class='{ open: toggleIsOpen.isOpen }'>
            <NuxtLink to='/' v-if='data.home.avatar' class='sidebar-avatar-info-img'>
              <SanityImage :asset-id="data.home.avatar?.asset?._ref" auto='format' w='300' />
            </NuxtLink>
            <div class='sidebar-avatar-info-email'>
              <p v-if='data.home.name' class='sidebar-avatar-info-email-text'>{{ data.home.name }}</p>
              <!-- DROPDOWN -->
              <template v-if='!isMobile'>
                <div @mouseover='dropdownOver' @mouseleave='dropdownLeave' class='sidebar-dropdown'>
                  <div v-if='data.home.emailForm' class='sidebar-dropdown-email' :class='{ active: isOpen }'>
                    {{ data.home.emailForm?.emailText }}
                  </div>
                  <div ref='dropdown' v-if='data.links.linkArray' class='sidebar-dropdown-content'
                    :class='{ active: isOpen }'>
                    <NuxtLink v-for=' link in data.links.linkArray' :to='link.linkURL' target='_blank'
                      class='sidebar-dropdown-link'>
                      {{ link.linkText }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
              <template v-else-if='isMobile'>
                <div @click='mobileDropdownToggle' class='sidebar-dropdown'>
                  <div v-if='data.home.emailForm' class='sidebar-dropdown-email'>
                    {{ data.home.emailForm?.emailText }}
                  </div>
                  <div ref='dropdown' v-if='data.links.linkArray' class='sidebar-dropdown-content'
                    :class='{ active: isOpen }'>
                    <NuxtLink v-for=' link in data.links.linkArray' :to='link.linkURL' class='sidebar-dropdown-link'>
                      {{ link.linkText }}
                    </NuxtLink>
                  </div>
                </div>
              </template>
              <!-- DROPDOWN -->
            </div>
          </div>
          <div class='sidebar-avatar-about'>
            <NuxtLink v-if='isDesktop' to="/about" class='btn btn-third'>About Me</NuxtLink>
            <div ref='toggler' @click='openToggle' v-else class='sidebar-toggle'>
              <svg v-if='!toggleIsOpen.isOpen' viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.142578" y="0.25" width="12.8571" height="1.07143" fill="#1E1E1E" fill-opacity="0.75" />
                <rect x="0.142578" y="3.46387" width="12.8571" height="1.07143" fill="#1E1E1E" fill-opacity="0.75" />
                <rect x="0.142578" y="6.67871" width="12.8571" height="1.07143" fill="#1E1E1E" fill-opacity="0.75" />
              </svg>
              <svg v-else viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.29395 9.39174L5.00056 6.09835L1.70717 9.39174L0.609376 8.29394L3.90276 5.00056L0.609375 1.70717L1.70717 0.609375L5.00056 3.90276L8.29394 0.609375L9.39174 1.70717L6.09835 5.00056L9.39174 8.29395L8.29395 9.39174Z"
                  fill="white" />
                <path
                  d="M8.29395 9.39174L5.00056 6.09835L1.70717 9.39174L0.609376 8.29394L3.90276 5.00056L0.609375 1.70717L1.70717 0.609375L5.00056 3.90276L8.29394 0.609375L9.39174 1.70717L6.09835 5.00056L9.39174 8.29395L8.29395 9.39174Z"
                  fill="white" />
              </svg>
              <!-- <svg v-else viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
              <!--   <path -->
              <!--     d="M7.68457 9.39076L4.39118 6.09738L1.0978 9.39076L7.76351e-07 8.29297L3.29339 4.99958L0 1.70619L1.0978 0.608398L4.39118 3.90179L7.68457 0.608399L8.78237 1.70619L5.48898 4.99958L8.78237 8.29297L7.68457 9.39076Z" -->
              <!--     fill="white" /> -->
              <!--   <path -->
              <!--     d="M7.68457 9.39076L4.39118 6.09738L1.0978 9.39076L7.76351e-07 8.29297L3.29339 4.99958L0 1.70619L1.0978 0.608398L4.39118 3.90179L7.68457 0.608399L8.78237 1.70619L5.48898 4.99958L8.78237 8.29297L7.68457 9.39076Z" -->
              <!--     fill="white" /> -->
              <!-- </svg> -->
            </div>
            <div ref='toggle' v-if='isMobile' class='sidebar-toggle-menu'>
              <div class='sidebar-toggle-menu-links'>
                <NuxtLink @click='openToggle' to='/about'>About Me</NuxtLink>
                <NuxtLink @click='openToggle' to='/feed'>Feed</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class='sidebar-avatar-gradient'></div>
      </div>
      <div v-if='data' ref='container' class='sidebar-container'>
        <template v-if='route.path !== "/feed"'>
          <SocialPost v-if='data.home.socialPost' :post='data.home.socialPost' />
          <SelectedProjects v-if='data.home.selectedProjects' :projects='data.home.selectedProjects' />
          <SelectedExperiments v-if='data.home.selectedExperiments' :experiments='data.home.selectedExperiments'
            :indexStart='data.home.selectedProjects.length' />
        </template>
        <template v-else>
          <ClientOnly>
            <ArchiveShowFilters />
            <!-- <ArchiveProjectFilters /> -->
            <!-- <ArchiveExperimentFilters /> -->
          </ClientOnly>
        </template>
      </div>
    </ClientOnly>
  </section>
</template>

<style lang='scss'>
.sidebar {
  max-width: desktop-vw(372px);
  display: block;

  @include desktop() {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
  }

  @include mobile() {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    //padding-bottom: mobile-vw(20px);
    max-width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff90;
    z-index: 3;
    display: none;

    &.open {
      display: block;
    }
  }

  &-container {
    width: 100%;
    padding: 0 desktop-vw(24px) desktop-vw(24px);
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(24px);

    @include mobile() {
      gap: mobile-vw(20px);
      padding: 0 mobile-vw(20px) mobile-vw(20px);
    }
  }

  &-avatar {
    position: sticky;
    top: 0;
    z-index: 3;

    &-about {
      @include small-type();

      &>a {
        transition: all 300ms ease-out;

      }
    }

    &-container {
      padding: desktop-vw(24px) desktop-vw(24px) 0;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1000;

      @include mobile() {
        padding: mobile-vw(20px) mobile-vw(20px) 0;
      }
    }

    &-gradient {
      height: desktop-vw(24px);
      width: 100%;
      background: linear-gradient(180deg, #FFFFFF 32.76%, rgba(115, 115, 115, 0) 100%);

      @include mobile() {
        height: mobile-vw(24px);
      }
    }

    &-info {
      display: flex;
      gap: desktop-vw(10px);
      align-items: center;
      position: relative;

      &.open {
        opacity: .5;
      }

      @include mobile() {
        gap: mobile-vw(10px);
      }

      &-img {
        max-width: desktop-vw(42px);
        width: 100%;
        aspect-ratio: 1/1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity 300ms ease-out;

        &:hover {
          opacity: .5;
        }

        @include mobile() {
          max-width: mobile-vw(42px);
        }
      }

      &-email {
        margin-top: 6px;
      }
    }
  }

  &-dropdown {
    position: relative;
    display: block;
    height: calc(100% + desktop-vw(10px));
    z-index: 10;
    cursor: pointer;

    @include mobile() {
      height: calc(100% + mobile-vw(10px));
    }

    &-email {
      @include small-type();
      color: rgba(30, 30, 30, .5);
      padding-bottom: desktop-vw(5px);
      transition: color 300ms ease-out;

      &::after {
        content: '+';
        font-size: desktop-vw(16px);
        position: absolute;
        top: 0;
        left: calc(100% + 6px);
        color: rgba(30, 30, 30, .5);
        transition: transform 300ms ease-out;

        @include mobile() {
          font-size: mobile-vw(16px);
        }
      }

      &.active {
        &::after {
          transform: rotate(45deg);
        }
      }

      @include mobile() {
        //padding-bottom: mobile-vw(10px);
      }
    }

    &-content {
      position: absolute;
      @include rounded();
      background: $black;
      color: $white50;
      top: calc(100%);
      left: desktop-vw(-55px);
      width: desktop-vw(200px);
      padding: desktop-vw(12px);
      //display: none;
      display: flex;
      flex-direction: column;
      gap: desktop-vw(6px);
      @include small-type();
      font-size: desktop-vw(12px);
      opacity: 0;
      z-index: 4;
      //transition: all 500ms ease-out;
      top: desktop-vw(24px);
      visibility: hidden;
      transition: visibility 0s, opacity 300ms ease-out;

      @include mobile() {
        top: mobile-vw(24px);
        left: mobile-vw(-55px);
        font-size: mobile-vw(12px);
        padding: mobile-vw(12px);
        gap: mobile-vw(6px);
        width: mobile-vw(200px);
      }

      &.active {
        //display: flex;

        opacity: 1;
        visibility: visible;
      }
    }

    &-link:hover {
      transition: color 300ms ease-out;
      color: $white;
    }
  }

  &-toggle {
    height: mobile-vw(40px);
    width: mobile-vw(40px);
    border-radius: mobile-vw(100px);
    background: #F0F1F1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;

    &>svg {
      height: mobile-vw(8px);
      width: mobile-vw(12px);
    }

    &.open {
      background: $black;
    }

    &-hamburger {
      margin: 0 mobile-vw(12px);

    }

    &-index {
      height: 100%;
      width: 100%;
      max-height: mobile-vw(38px);
      max-width: mobile-vw(38px);
      border-radius: mobile-vw(100px);
      background: $white;
      font-size: mobile-vw(12px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-menu {
      box-sizing: border-box;
      width: 100%;
      max-width: mobile-vw(94px);
      @include rounded();
      background: $white;
      @include small-type();
      display: none;
      flex-direction: column;
      justify-content: flex-start;
      padding: mobile-vw(12px);
      box-shadow: 0px 2px 12px 0px #0000001F;
      position: absolute;
      top: mobile-vw(72px);
      right: mobile-vw(20px);

      &.open {
        display: flex;
      }

      &-links {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: mobile-vw(6px);
        text-align: center;

        font-size: mobile-vw(12px);
      }
    }
  }
}
</style>

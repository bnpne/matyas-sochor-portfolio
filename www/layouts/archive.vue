<script setup lang='ts'>
const query = groq`*[_type == 'home'][0]{...,selectedProjects[]->{..., "filters":projectFilters.filter[]->}, selectedExperiments[]->{..., "filters":projectFilters.filter[]->}}`
const { data: avatar } = useSanityQuery<HomeData>(query)
const linkQuery = groq`*[_type == 'links'][0]{linkArray}`
const { data: links } = useSanityQuery(linkQuery)

const { isMobile } = useDevice()
const data = reactive({ data: toRaw(useAttrs().data) })
const dropdown = ref()
const toggler = ref()
const toggle = ref()
let isOpen = false
const toggleIsOpen = reactive({ isOpen: false })

let notifications: { list: any[] } = reactive({ list: [] })
let notificationActive: { isActive: boolean } = reactive({ isActive: false })

const toggleNotification = () => {
  notificationActive.isActive =
    notificationActive.isActive === true ?
      notificationActive.isActive = false :
      notificationActive.isActive = true
}

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

const openDropdown = () => {
  if (!isOpen) {
    isOpen = true
    dropdown.value.classList.toggle('active')
  } else {
    isOpen = false
    dropdown.value.classList.toggle('active')
  }
}
</script>

<template>
  <div id='page' class='archive-layout'>
    <template v-if='!isMobile'>
      <nav class='archive-layout-nav'>
        <NuxtLink to='/' class='archive-layout-nav-home'>Back to Homepage</NuxtLink>
      </nav>
    </template>
    <template v-else>
      <div v-if='avatar' class='archive-layout-avatar'>
        <div class='archive-layout-avatar-container'>
          <div class='archive-layout-avatar-info' :class='{ open: toggleIsOpen.isOpen }'>
            <NuxtLink to='/' v-if='avatar.avatar' class='archive-layout-avatar-info-img'>
              <SanityImage :asset-id="avatar.avatar?.asset?._ref" auto='format' w='80' />
            </NuxtLink>
            <div class='archive-layout-avatar-info-email'>
              <p v-if='avatar.name' class='archive-layout-avatar-info-email-text'>{{ avatar.name }}</p>
              <div @click='openDropdown' v-if='avatar.emailForm' class='archive-layout-avatar-info-email-link'
                target='_blank'>
                {{ avatar.emailForm?.emailText }} +
              </div>
              <div ref='dropdown' v-if='links' class='archive-layout-link-dropdown'>
                <NuxtLink v-for='link in links.linkArray' :to='link.linkURL' class='archive-layout-link-dropdown-link'>
                  {{ link.linkText }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class='archive-layout-avatar-about'>
            <div ref='toggler' @click='openToggle' class='sidebar-toggle'>
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

            <div ref='toggle' class='archive-layout-toggle-menu'>
              <div class='archive-layout-toggle-menu-links'>
                <NuxtLink @click='openToggle' to='/about'>About Me</NuxtLink>
                <NuxtLink @click='openToggle' to='/archive'>Archive</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class='archive-layout-container'>
      <slot />
    </div>
  </div>
</template>

<style lang='scss'>
.archive-layout {
  padding: desktop-vw(10px) 0;
  padding-right: desktop-vw(10px);

  &-nav {
    position: fixed;
    top: desktop-vw(24px);
    right: desktop-vw(24px);
    width: auto;
    display: flex;
    gap: desktop-vw(4px);
    z-index: 2;
    @include small-type();

    &-home {
      @include button-second-black();
    }

    &-more {
      @include button-second-black();
    }
  }

  &-container {
    position: relative;
    z-index: 1;
  }

  &-avatar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    box-sizing: border-box;

    &-about {
      @include small-type();
    }

    &-container {
      padding: desktop-vw(24px) desktop-vw(20px) 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      background: white;

      @include mobile() {
        padding: mobile-vw(20px) mobile-vw(20px) mobile-vw(24px);
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

        @include mobile() {
          max-width: mobile-vw(42px);
          border-radius: 100px;
          overflow: hidden;
        }
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

    @include mobile() {
      font-size: mobile-vw(12px);
      padding: mobile-vw(12px);
      gap: mobile-vw(6px);
    }

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

  &-toggle {
    height: mobile-vw(42px);
    width: 100%;
    min-width: mobile-vw(80px);
    max-width: mobile-vw(80px);
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

      &>svg {
        height: mobile-vw(8px);
        width: mobile-vw(12px);
      }
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
      top: mobile-vw(77px);
      right: mobile-vw(14px);

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

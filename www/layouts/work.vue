<script setup lang='ts'>
import gsap from 'gsap'

// const query = groq`*[_type == 'home'][0]{...,selectedProjects[]->{..., "filters":projectFilters.filter[]->}, selectedExperiments[]->{..., "filters":projectFilters.filter[]->}}`
// const { data: avatar } = useSanityQuery<HomeData>(query)
// const linkQuery = groq`*[_type == 'links'][0]{linkArray}`
// const { data: links } = useSanityQuery(linkQuery)

const { isMobile } = useDevice()
// const data = reactive({ data: toRaw(useAttrs().data) })
const route = useRoute()
const dropdown = ref()
const toggler = ref()
const toggle = ref()
let isOpen = false
const toggleIsOpen = reactive({ isOpen: false })

const store = useData()
const { data } = storeToRefs(store)
const loading = ref(true)
const notifications: { list: any[] } = reactive({ list: [] })
const notificationActive: { isActive: boolean } = reactive({ isActive: false })
const isNotif = computed(() => {
  return notifications.list.length > 0
})

watch([() => store.isFetched, () => loading.value, () => route.path], async () => {
  if (!loading || store.isFetched) {
    let str = route.path.split('/')
    let project
    toRaw(data.value).projects.forEach(p => {
      if (p.projectSlug.current === str[2]) {
        project = p
      }
    })
    if (project.notifications) {
      notifications.list = project.notifications
    }

  }
})

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

onMounted(() => {
  loading.value = false

  watch(() => notificationActive.isActive, () => {
    if (notificationActive.isActive === true) {
      gsap.to('.work-layout-notification', {
        x: '0%',
        ease: 'expo.out',
        stagger: {
          each: .1
        },
        duration: 1.2,
      })
    } else {
      gsap.to('.work-layout-notification', {
        x: '150%',
        ease: 'expo.out',
        stagger: {
          each: .1
        },
        duration: 1.2,
      })
    }
  })

  setTimeout(() => {
    if (notifications.list.length > 0) {
      toggleNotification()
    }
  }, 5000)
})

</script>

<template>
  <div class='work-layout'>
    <template v-if='!isMobile'>
      <nav class='work-layout-nav'>
        <template v-if='notifications.list'>
          <NuxtLink to='/archive' class='work-layout-nav-archive'>Archive</NuxtLink>
          <div v-if='!notificationActive.isActive' @click='toggleNotification' class='work-layout-nav-notifications'>{{
      notifications.list.length }}</div>
          <div v-else @click='toggleNotification' class='work-layout-nav-notifications-active'>
            <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.293 9.39 5 6.098 1.706 9.391.608 8.293 3.902 5 .608 1.706 1.706.608 5 3.902 8.293.608l1.098 1.098L6.097 5l3.294 3.293-1.098 1.098Z"
                fill="#1E1E1E" fill-opacity=".75" />
              <path
                d="M8.293 9.39 5 6.098 1.706 9.391.608 8.293 3.902 5 .608 1.706 1.706.608 5 3.902 8.293.608l1.098 1.098L6.097 5l3.294 3.293-1.098 1.098Z"
                fill="#1E1E1E" fill-opacity=".75" />
            </svg>
          </div>

        </template>
      </nav>
    </template>
    <template v-else>
      <div v-if='avatar' class='work-layout-avatar'>
        <div class='work-layout-avatar-container'>
          <div class='work-layout-avatar-info' :class='{ open: toggleIsOpen.isOpen }'>
            <NuxtLink to='/' v-if='avatar.avatar' class='work-layout-avatar-info-img'>
              <SanityImage :asset-id="avatar.avatar?.asset?._ref" auto='format' w='80' />
            </NuxtLink>
            <div class='work-layout-avatar-info-email'>
              <p v-if='avatar.name' class='work-layout-avatar-info-email-text'>{{ avatar.name }}</p>
              <div @click='openDropdown' v-if='avatar.emailForm' class='work-layout-avatar-info-email-link'
                target='_blank'>
                {{ avatar.emailForm?.emailText }} +
              </div>
              <div ref='dropdown' v-if='links' class='work-layout-link-dropdown'>
                <NuxtLink v-for='link in links.linkArray' :to='link.linkURL' class='work-layout-link-dropdown-link'>
                  {{ link.linkText }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class='work-layout-avatar-about'>
            <div ref='toggler' @click='openToggle' class='work-layout-toggle'>
              <div class='work-layout-toggle-hamburger'>
                <svg v-if='!toggleIsOpen.isOpen' viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.142578" y="0.25" width="12.8571" height="1.07143" fill="#1E1E1E" fill-opacity="0.75" />
                  <rect x="0.142578" y="3.46387" width="12.8571" height="1.07143" fill="#1E1E1E" fill-opacity="0.75" />
                  <rect x="0.142578" y="6.67871" width="12.8571" height="1.07143" fill="#1E1E1E" fill-opacity="0.75" />
                </svg>
                <svg v-else viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.68457 9.39076L4.39118 6.09738L1.0978 9.39076L7.76351e-07 8.29297L3.29339 4.99958L0 1.70619L1.0978 0.608398L4.39118 3.90179L7.68457 0.608399L8.78237 1.70619L5.48898 4.99958L8.78237 8.29297L7.68457 9.39076Z"
                    fill="white" />
                  <path
                    d="M7.68457 9.39076L4.39118 6.09738L1.0978 9.39076L7.76351e-07 8.29297L3.29339 4.99958L0 1.70619L1.0978 0.608398L4.39118 3.90179L7.68457 0.608399L8.78237 1.70619L5.48898 4.99958L8.78237 8.29297L7.68457 9.39076Z"
                    fill="white" />
                </svg>
              </div>
              <div class='work-layout-toggle-index'>2</div>
            </div>
            <div ref='toggle' class='work-layout-toggle-menu'>
              <div class='work-layout-toggle-menu-links'>
                <NuxtLink @click='openToggle' to='/about'>About Me</NuxtLink>
                <NuxtLink @click='openToggle' to='/archive'>Archive</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class='work-layout-container'>
      <div v-if='!isMobile' class='work-layout-notification-container'>
        <div v-for='no, index in notifications.list' class='work-layout-notification'>
          <div v-if='no.notificationImage' class='work-layout-notification-img'>
            <SanityImage :asset-id="no.notificationImage.asset._ref" auto='format' fit='crop' h='300' w='300' />
          </div>
          <div class='work-layout-notification-info'>
            <div class="work-layout-notification-heading">
              <p class='work-layout-notification-title'>{{ no.notificationTitle }}</p>
            </div>
            <div class='work-layout-notification-snippet'>
              <SanityContent :blocks='no.notificationDesc'></SanityContent>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang='scss'>
.work-layout {
  padding: desktop-vw(10px) 0;
  padding-right: desktop-vw(10px);
  overflow-x: hidden;

  @include mobile {
    padding: mobile-vw(6px);
    padding-top: mobile-vw(90px);
  }

  &-avatar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100vw;
    box-sizing: border-box;

    background: white;
    box-shadow: 0px 2px 12px 0px #0000001F;

    &-about {
      @include small-type();
    }

    &-container {
      padding: desktop-vw(24px) desktop-vw(20px) 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      @include mobile() {
        padding: mobile-vw(24px) mobile-vw(20px) mobile-vw(20px);
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

  &-nav {
    position: fixed;
    top: desktop-vw(24px);
    right: desktop-vw(24px);
    width: auto;
    display: flex;
    gap: desktop-vw(4px);
    z-index: 2;
    @include small-type();

    @include mobile {
      top: mobile-vw(24px);
      right: mobile-vw(24px);
      gap: mobile-vw(4px);
    }

    &-archive {
      @include button-second-black();
      box-shadow: 0px 2px 12px 0px #0000001F;
    }

    &-more {
      @include button-default-white();
      border-radius: 50%;
      height: desktop-vw(42px);
      width: desktop-vw(42px);
      align-items: center;
      justify-content: center;
      text-align: center;

      @include mobile {
        height: mobile-vw(42px);
        width: mobile-vw(42px);
      }
    }

    &-notifications {
      @include button-second-black();
      border-radius: 50%;
      height: desktop-vw(42px);
      width: desktop-vw(42px);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: 0px 2px 12px 0px #0000001F;

      @include mobile {
        height: mobile-vw(42px);
        width: mobile-vw(42px);
      }

      &-active {
        @include button-default-white();
        box-shadow: 0px 2px 12px 0px #0000001F;
        border-radius: 50%;
        height: desktop-vw(42px);
        width: desktop-vw(42px);
        align-items: center;
        justify-content: center;
        text-align: center;

        @include mobile {
          height: mobile-vw(42px);
          width: mobile-vw(42px);
        }
      }
    }

  }

  &-notification {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: desktop-vw(12px);
    padding: desktop-vw(8px) desktop-vw(10px);
    @include rounded-border();
    background: $white;
    max-width: desktop-vw(300px);

    // for Animation
    transform: translateX(150%);

    @include mobile {
      gap: mobile-vw(12px);
      padding: mobile-vw(8px) mobile-vw(10px);
    }

    &:hover {

      .page-notification-img,
      .page-notification-info {
        opacity: .5;
      }
    }

    &-container {
      position: fixed;
      z-index: 5;
      right: desktop-vw(24px);
      top: desktop-vw(82px);
      display: flex;
      flex-direction: column;
      gap: desktop-vw(10px);
      align-items: flex-end;

      @include mobile {
        gap: mobile-vw(10px);
        right: mobile-vw(24px);
        top: mobile-vw(82px);
      }
    }

    &-img {
      min-width: desktop-vw(56px);
      max-height: desktop-vw(56px);
      aspect-ratio: 1/1;
      border-radius: desktop-vw(8px);
      overflow: hidden;

      img {
        @include image-default();
      }

      @include mobile {
        min-width: mobile-vw(56px);
        max-height: mobile-vw(56px);
        border-radius: mobile-vw(8px);
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: desktop-vw(3px);
      width: 100%;

      @include mobile {
        gap: mobile-vw(3px);
      }
    }

    &-title {
      @include sans-serif-medium();
      @include small-type();
    }

    &-snippet {
      color: $black50;
      @include small-type();
    }
  }

  &-container {
    position: relative;
    z-index: 1;
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
      justify-content: flex-end;
      padding: mobile-vw(18px);
      box-shadow: 0px 2px 12px 0px #0000001F;
      position: absolute;
      top: mobile-vw(16px);
      right: mobile-vw(14px);

      &.open {
        display: flex;
      }

      &-links {
        margin-top: mobile-vw(47px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: mobile-vw(12px);
        text-align: center;

        font-size: mobile-vw(12px);
      }
    }
  }
}
</style>

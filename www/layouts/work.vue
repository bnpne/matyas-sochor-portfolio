<script setup lang='ts'>
import gsap from 'gsap'

const query = groq`*[_type == 'projects']{notifications, projectSlug}`
const { data } = useSanityQuery<Project>(query)
const route = useRoute()
const { isMobile } = useDevice()
const avatar = reactive({ value: null })
const links = ref(null)
const store = useData()
const { data: storeData } = storeToRefs(store)
const loading = ref(true)
let isOpen = false
const toggleIsOpen = reactive({ isOpen: false })
const toggler = ref()
const toggle = ref()
const dropdown = ref()

let notifications: { list: any[] } = reactive({ list: [] })
let notificationActive: { isActive: boolean } = reactive({ isActive: false })
let notificationsLink: { list: any[] } = reactive({ list: [] })

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

watch([() => store.isFetched, () => loading.value, () => route.path], async () => {
  if (!loading || store.isFetched) {
    avatar.value = storeData.value.home
    links.value = storeData.value.links
  }
})

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

  if (data) {
    toRaw(data.value)?.forEach((n: any) => {
      if (n.notifications !== null) {
        n.notifications.forEach((no: any) => {
          notifications.list.push(no)
          notificationsLink.list.push(n.projectSlug)
        })
      }
    })
  }
})
</script>

<template>
  <div id='page' class='work-layout'>
    <template v-if='!isMobile'>
      <nav class='work-layout-nav' :class='{ "about-nav": route.path === "/about" }'>
        <NuxtLink to='/archive' class='work-layout-nav-archive'>Archive</NuxtLink>
        <div v-if='!notificationActive.isActive' @click='toggleNotification' class='work-layout-nav-notifications'>{{
      notifications.list.length }}</div>
        <div v-else @click='toggleNotification' class='work-layout-nav-notifications-active'>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.293 9.39 5 6.098 1.706 9.391.608 8.293 3.902 5 .608 1.706 1.706.608 5 3.902 8.293.608l1.098 1.098L6.097 5l3.294 3.293-1.098 1.098Z"
              fill="#1E1E1E" fill-opacity=".75" />
            <path
              d="M8.293 9.39 5 6.098 1.706 9.391.608 8.293 3.902 5 .608 1.706 1.706.608 5 3.902 8.293.608l1.098 1.098L6.097 5l3.294 3.293-1.098 1.098Z"
              fill="#1E1E1E" fill-opacity=".75" />
          </svg>
        </div>
      </nav>
    </template>
    <template v-else>
      <div v-if='avatar.value' class='work-layout-avatar'>
        <div class='work-layout-avatar-container'>
          <div class='work-layout-avatar-info' :class='{ open: toggleIsOpen.isOpen }'>
            <NuxtLink to='/' v-if='avatar.value.avatar' class='work-layout-avatar-info-img'>
              <SanityImage :asset-id="avatar.value.avatar?.asset?._ref" auto='format' w='300' />
            </NuxtLink>
            <div class='work-layout-avatar-info-email'>
              <p v-if='avatar.value.name' class='work-layout-avatar-info-email-text'>{{ avatar.value.name }}</p>
              <div @click='openDropdown' v-if='avatar.value.emailForm' class='work-layout-avatar-info-email-link'
                target='_blank'>
                {{ avatar.value.emailForm?.emailText }} +
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
        <NuxtLink :to="`/work/${notificationsLink.list[index].current}`" v-for='no, index in  notifications.list'
          class='work-layout-notification'>
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
        </NuxtLink>
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

    //background: white;
    //box-shadow: 0px 2px 12px 0px #0000001F;

    &-about {
      @include small-type();
    }

    &-container {
      padding: desktop-vw(20px) desktop-vw(20px) 0;
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
      transition: opacity 300ms ease-out;

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
        //@include small-type();
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

        &>svg {
          width: desktop-vw(10px);
          height: desktop-vw(10px);
        }

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
    z-index: 4;
    @include rounded();
    background: $black;
    color: $white50;
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
    visibility: hidden;
    transition: visibility 0s, opacity 300ms ease-out;

    @include mobile() {
      left: 0;
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

    &-link:hover {
      transition: color 300ms ease-out;
      color: $white;
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
    transition: background 300ms ease-out;

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

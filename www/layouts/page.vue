<script setup lang='ts'>
import gsap from 'gsap'

const query = groq`*[_type == 'projects']{notifications, projectSlug}`
const { data } = useSanityQuery<Project>(query)
// const store = useData()
// store.$subscribe(state => console.log(state.data))

let notifications: { list: any[] } = reactive({ list: [] })
let notificationActive: { isActive: boolean } = reactive({ isActive: false })
let notificationsLink: { list: any[] } = reactive({ list: [] })

const toggleNotification = () => {
  notificationActive.isActive =
    notificationActive.isActive === true ?
      notificationActive.isActive = false :
      notificationActive.isActive = true
}

onMounted(() => {
  watch(() => notificationActive.isActive, () => {
    if (notificationActive.isActive === true) {
      gsap.to('.page-layout-notification', {
        x: '0%',
        ease: 'expo.out',
        stagger: {
          each: .1
        },
        duration: 1.2,
      })
    } else {
      gsap.to('.page-layout-notification', {
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
    toggleNotification()
  }, 5000)

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
  <div id='page' class='page-layout'>
    <nav class='page-layout-nav'>
      <NuxtLink to='/archive' class='page-layout-nav-archive'>Archive</NuxtLink>
      <div v-if='!notificationActive.isActive' @click='toggleNotification' class='page-layout-nav-notifications'>{{
        notifications.list.length }}</div>
      <div v-else @click='toggleNotification' class='page-layout-nav-notifications-active'>X</div>
    </nav>
    <div class='page-layout-container'>
      <div class='page-layout-notification-container'>
        <NuxtLink :to="`/work/${notificationsLink.list[index].current}`" v-for='no, index in notifications.list'
          class='page-layout-notification'>
          <div v-if='no.notificationImage' class='page-layout-notification-img'>
            <SanityImage :asset-id="no.notificationImage.asset._ref" auto='format' fit='crop' h='56' w='56' />
          </div>
          <div class='page-layout-notification-info'>
            <div class="page-layout-notification-heading">
              <p class='page-layout-notification-title'>{{ no.notificationTitle }}</p>
            </div>
            <div class='page-layout-notification-snippet'>
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
.page-layout {
  padding: desktop-vw(10px) 0;
  padding-right: desktop-vw(10px);

  position: relative;

  &-nav {
    position: fixed;
    top: desktop-vw(24px);
    right: desktop-vw(24px);
    width: auto;
    display: flex;
    gap: desktop-vw(4px);
    z-index: 2;
    @include small-type();

    &-archive {
      @include button-second-white();
    }

    &-notifications {
      @include button-second-white();
      border-radius: 50%;
      height: desktop-vw(42px);
      width: desktop-vw(42px);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      &-active {
        @include button-default-white();
        border-radius: 50%;
        height: desktop-vw(42px);
        width: desktop-vw(42px);
        align-items: center;
        justify-content: center;
        text-align: center;
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
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: desktop-vw(3px);
      width: 100%;
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
}
</style>

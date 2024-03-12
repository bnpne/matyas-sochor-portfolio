export const useStore = defineStore('main', {
  state: () => ({
    socialPostLikes: 0,
  }),
  actions: {
    incrementPostLikes() {
      this.socialPostLikes++
    },
    setSocialPostLikeNumber(number: number) {
      this.socialPostLikes = number
    },
  },
})

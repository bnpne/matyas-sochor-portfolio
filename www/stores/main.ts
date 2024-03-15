type Store = {
  socialPostLikes: number
  activeProject: number | null
}

export const useStore = defineStore('main', {
  state: (): Store => ({
    socialPostLikes: 0,
    activeProject: null,
  }),
  actions: {
    incrementPostLikes() {
      this.socialPostLikes++
    },
    setSocialPostLikeNumber(number: number) {
      this.socialPostLikes = number
    },
    setActiveProject(index: number) {
      this.activeProject = index
    },
  },
})

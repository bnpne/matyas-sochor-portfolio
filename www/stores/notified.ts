export const useNotified = defineStore('notfied', {
  state: () => ({
    notified: false,
  }),
  actions: {
    isNotified() {
      this.notified === true ? (this.notified = false) : (this.notified = true)
    },
  },
})

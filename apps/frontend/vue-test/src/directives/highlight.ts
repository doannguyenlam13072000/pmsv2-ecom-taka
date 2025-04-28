import { type App } from 'vue'

export default function registerDemoDrirective(app: App<Element>) {
  app.directive('highlight', {
    created(el, binding) {
      console.log(el, binding)
      el.style.color = 'red'
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {}
  })
}

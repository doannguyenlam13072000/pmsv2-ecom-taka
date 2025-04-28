import { type App } from 'vue'

export default function registerDemoDrirective(app: App<Element>) {
  app.directive('custom', {
    created(el, binding) {
      const value = binding.value || 'red'

      // Agruments
      switch (binding.arg) {
        case 'background':
          el.style[binding.arg] = value
          break
        default:
          el.style.color = value
      }

      // Modified properties
      if (binding.modifiers['delay']) {
        const DELAY = 2000
        setTimeout(() => {
          el.textContent += DELAY / 1000 + ' seconds'
        }, DELAY)
      }
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {}
  })
}

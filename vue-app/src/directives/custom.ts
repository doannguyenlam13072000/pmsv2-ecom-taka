import { type App } from 'vue'

export default function registerDemoDrirective(app: App<Element>) {
  app.directive('custom', {
    created(el, binding, vnode, preNode) {
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
      } else {
      }
    },
    beforeMount(el, binding, vnode, preNode) {},
    mounted(el, binding, vnode, preNode) {},
    beforeUpdate(el, binding, vnode, preNode) {},
    updated(el, binding, vnode, preNode) {},
    beforeUnmount(el, binding, vnode, preNode) {},
    unmounted(el, binding, vnode, preNode) {}
  })
}

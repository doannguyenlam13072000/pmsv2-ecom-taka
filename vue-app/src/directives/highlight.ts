import { type App } from 'vue'

export default function registerDemoDrirective(app: App<Element>) {
  app.directive('highlight', {
    created(el, binding, vnode, preNode) {
        console.log(el, binding);
        el.style.color = 'red'
    },
    beforeMount(el, binding, vnode, preNode) {},
    mounted(el, binding, vnode, preNode) {},
    beforeUpdate(el, binding, vnode, preNode) {},
    updated(el, binding, vnode, preNode) {},
    beforeUnmount(el, binding, vnode, preNode) {},
    unmounted(el, binding, vnode, preNode) {}
  })
}

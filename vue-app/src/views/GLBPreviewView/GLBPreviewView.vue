<template>
  <div ref="container" class="glb-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default defineComponent({
  name: 'GlbViewer',
  setup() {
    const container = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      if (!container.value) return

      // Create the scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
      )
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.value.clientWidth, container.value.clientHeight)
      container.value.appendChild(renderer.domElement)

      // Add lighting
      const light = new THREE.AmbientLight(0x404040) // soft white light
      scene.add(light)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      scene.add(directionalLight)

      // Set up controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true // an option for smoother controls

      // Load the GLB model
      const loader = new GLTFLoader()
      loader.load(
        './model.glb',
        (gltf: GLTF) => {
          const model = gltf.scene
          scene.add(model)

          // Set up animation mixer
          const mixer = new THREE.AnimationMixer(model)
          if (gltf.animations.length) {
            const action = mixer.clipAction(gltf.animations[0])
            action.play()
          }

          // Animation loop
          const clock = new THREE.Clock()
          const animate = () => {
            requestAnimationFrame(animate)
            const delta = clock.getDelta()
            mixer.update(delta)
            controls.update() // Update controls
            renderer.render(scene, camera)
          }
          animate()
        },
        undefined,
        (error) => {
          console.error('An error happened', error)
        }
      )

      // Position the camera
      camera.position.z = 5
    })

    return {
      container
    }
  }
})
</script>

<style scoped>
.glb-container {
  width: 100%;
  height: 100%;
}
</style>

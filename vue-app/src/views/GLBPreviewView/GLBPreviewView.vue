<template>
  <div ref="container" class="w-1/2 h-screen"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js'

export default defineComponent({
  name: 'GlbViewer',
  setup() {
    const container = ref<HTMLDivElement | null>(null)

    const setupCamera = (): THREE.PerspectiveCamera => {
      const WIDTH = 50
      const HEIGHT = 30

      const camera = new THREE.PerspectiveCamera()
      camera.viewport = new THREE.Vector4(
        Math.floor(0),
        Math.floor(0),
        Math.ceil(WIDTH),
        Math.ceil(HEIGHT)
      )
      camera.position.z = 1.5
      camera.position.multiplyScalar(2)
      camera.lookAt(0, 0, 0)
      camera.updateMatrixWorld()

      return camera
    }

    function animate() {
      const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
      const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 })

      const mesh = new THREE.Mesh(geometryCylinder, materialCylinder)
      mesh.rotation.x += 0.005
      mesh.rotation.z += 0.01

      requestAnimationFrame(animate)
    }

    onMounted(() => {
      if (!container.value) return

      // Create the scene
      const scene = new THREE.Scene()
      const camera = setupCamera()
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.value.clientWidth, container.value.clientHeight)
      container.value.appendChild(renderer.domElement)

      // Add lighting
      const light = new THREE.AmbientLight(0xffffff) // soft white light
      scene.add(light)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
      scene.add(directionalLight)

      // Load the GLB model
      const loader = new GLTFLoader()
      loader.load(
        'https://models.readyplayer.me/664e08010a66ad6bdc2dad62.glb',
        (gltf: GLTF) => {
          const model = gltf.scene
          scene.add(model)
          renderer.render(scene, camera)
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('An error happened', error)
        }
      )

      // Position the camera
      camera.position.z = 5
      animate()
    })

    return {
      container
    }
  }
})
</script>

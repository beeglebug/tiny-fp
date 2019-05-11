import { PerspectiveCamera, WebGLRenderer } from 'three'
import createScene from './createScene'
import CharacterController from './CharacterController'
import Input from './input/Input'
import { HEIGHT, WIDTH } from './consts'
import loop from './loop'
import createWorld from './createWorld'
import findPlayerPosition from './findPlayerPosition'
import loadAssets from './loadAssets'

export default class Engine {

  constructor (canvas) {

    this.canvas = canvas
    this.scene = createScene()
    this.renderer = new WebGLRenderer({ canvas })
    this.camera = new PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000)
    this.controller = new CharacterController(this.camera)
    this.scene.add(this.controller)

    this.setupPointerLock(canvas)
  }

  load (game) {

    this.clear()

    return loadAssets(game)
      .then((assets) => {
        this.world = createWorld(game, assets)

        const [x, y, z] = findPlayerPosition(game)

        this.controller.position.set(x, y, z)
        this.controller.resetRotation(Math.PI, 0)
        this.controller.handlePhysics() // force update the 2d collider

        this.scene.add(this.world)
      })
  }

  start () {
    Input.bind(this.canvas)

    this.canvas.focus()
    this.canvas.requestPointerLock()

    this.cancelLoop = loop(this.tick)
  }

  clear () {
    if (!this.world) return
    // loop backwards to a void mid loop splice reindexing
    for (let i = this.world.children.length - 1; i >= 0; i--) {
      this.world.remove(this.world.children[i])
    }
  }

  stop () {
    Input.unbind(this.canvas)
    this.canvas.blur()
    this.cancelLoop()
    this.onStop()
  }

  tick = (deltaTime) => {

    this.controller.update(deltaTime)

    this.render()

    Input.clear()
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  setupPointerLock (domElement) {

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === domElement) {
        this.controller.enabled = true
      } else {
        this.controller.enabled = false
        this.stop()
      }
    }

    const handlePointerLockError = (error) => {
      return console.warn('Pointer Lock Error', error)
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('pointerlockerror', handlePointerLockError)
  }
}
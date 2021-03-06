import { TILE_SIZE } from '../consts'
import Rect from '../physics/geometry/Rect'

export default function createTiles (map, palette, assets) {

  const meshes = []

  for (let y = 0; y < map.height; y++) {

    for (let x = 0; x < map.width; x++) {

      const tileId = get(map, x, y)

      const dx = x * TILE_SIZE
      const dy = y * TILE_SIZE

      // empty space
      if (tileId === 0) continue

      const tile = palette.tiles.find(tile => tile.id === tileId)
      const mesh = assets.meshes[tile.mesh].clone()

      if (tile.collide === true) {
        mesh.collider = makeCollider(dx, dy)
      }

      // 2d to 3d
      mesh.position.set(dx, 0, dy)
      meshes.push(mesh)
    }
  }

  return meshes
}

function get (map, x, y) {
  const ix = (y * map.width) + x
  return map.data[ix]
}

// const offsets = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
//
// function getSurrounding (map, x, y) {
//   return offsets
//     .map(([ox, oy]) => [ox + x, oy + y])
//     .filter(([ox, oy]) => (ox >= 0 && ox < map.width && oy >= 0 && oy < map.height))
//     .map(([ox, oy]) => get(map, ox, oy))
// }

function makeCollider (x, y) {
  return new Rect(
    x - TILE_SIZE / 2,
    y - TILE_SIZE / 2,
    TILE_SIZE,
    TILE_SIZE
  )
}

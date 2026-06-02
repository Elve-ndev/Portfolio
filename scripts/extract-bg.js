// One-off: remove the near-white background from a portrait → transparent PNG.
// Uses border flood-fill so interior light tones (e.g. a cream coat) are KEPT —
// only white that is connected to the image edge is made transparent.
//
//   node scripts/extract-bg.js
import { Jimp } from 'jimp'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

async function removeWhiteBg(inFile, outFile, { thr = 222, sat = 30 } = {}) {
  const img = await Jimp.read(inFile)
  const { width: w, height: h, data } = img.bitmap

  const isBg = (idx) => {
    const r = data[idx],
      g = data[idx + 1],
      b = data[idx + 2]
    const mn = Math.min(r, g, b)
    const mx = Math.max(r, g, b)
    return mn > thr && mx - mn < sat // bright AND near-grey (low saturation)
  }

  const visited = new Uint8Array(w * h)
  const stack = []
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const p = y * w + x
    if (visited[p]) return
    if (!isBg(p * 4)) return
    visited[p] = 1
    stack.push(p)
  }
  for (let x = 0; x < w; x++) {
    push(x, 0)
    push(x, h - 1)
  }
  for (let y = 0; y < h; y++) {
    push(0, y)
    push(w - 1, y)
  }
  while (stack.length) {
    const p = stack.pop()
    const x = p % w
    const y = (p - x) / w
    data[p * 4 + 3] = 0 // transparent
    push(x + 1, y)
    push(x - 1, y)
    push(x, y + 1)
    push(x, y - 1)
  }

  // soft edge: pixels touching transparency that are still very light get reduced alpha
  const bg = Uint8Array.from(visited)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x
      if (bg[p]) continue
      let touch = false
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx,
          ny = y + dy
        if (nx < 0 || ny < 0 || nx >= w || ny >= h || bg[ny * w + nx]) touch = true
      }
      if (touch) {
        const idx = p * 4
        const mn = Math.min(data[idx], data[idx + 1], data[idx + 2])
        if (mn > thr - 20) data[idx + 3] = 130
      }
    }
  }

  let cleared = 0
  for (let i = 0; i < w * h; i++) if (bg[i]) cleared++
  await img.write(outFile)
  console.log(`${path.basename(outFile)} — ${w}x${h}, ${((cleared / (w * h)) * 100).toFixed(1)}% removed`)
}

await removeWhiteBg(
  path.join(root, 'public/assets/hiba.jpeg'),
  path.join(root, 'public/assets/hiba-cutout.png'),
)

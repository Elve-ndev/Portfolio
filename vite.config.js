import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// CyberFolio — Vite config
// publicDir defaults to "public": /assets/... resolves in dev and on Vercel.
export default defineConfig(({ mode }) => {
  // Load .env into process.env so the dev API middleware can read GEMINI_API_KEY.
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY

  return {
    plugins: [
      react(),
      // Runs the Vercel serverless function (api/chat.js) during `npm run dev`,
      // so the Gemini chatbot works locally exactly like in production.
      {
        name: 'dev-api-chat',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end('Method not allowed')
              return
            }
            let body = ''
            req.on('data', (c) => (body += c))
            req.on('end', async () => {
              req.body = body
              // shim the Vercel res helpers used by the handler
              res.status = (code) => {
                res.statusCode = code
                return res
              }
              res.json = (obj) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(obj))
              }
              try {
                const mod = await server.ssrLoadModule('/api/chat.js')
                await mod.default(req, res)
              } catch (e) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: String(e) }))
              }
            })
          })
        },
      },
    ],
    server: {
      port: 5173,
      open: true,
      // Don't watch the staging /assets folder or in-progress downloads (EBUSY).
      watch: {
        ignored: ['**/assets/**', '**/*.crdownload', '**/*.tmp', '**/*.part'],
      },
    },
    build: {
      outDir: 'dist',
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei'],
            motion: ['framer-motion', 'gsap'],
          },
        },
      },
    },
  }
})

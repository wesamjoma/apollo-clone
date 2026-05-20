import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const testsDir = path.resolve(__dirname, '../tests/frontend').replace(/\\/g, '/')
const nm = path.resolve(__dirname, 'node_modules')

const pkg = (name) => ({ [name]: path.join(nm, name) })

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...pkg('@testing-library/react'),
      ...pkg('@testing-library/user-event'),
      ...pkg('@testing-library/jest-dom'),
      ...pkg('react-router-dom'),
      ...pkg('react'),
      ...pkg('react-dom'),
      ...pkg('axios'),
    },
  },
  server: { fs: { allow: ['..'] } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    include: [`${testsDir}/**/*.test.{js,jsx}`],
    server: { fs: { allow: ['..'] } },
  },
})

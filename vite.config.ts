import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import changelogs from './plugins/changelogs.mjs'

export default defineConfig({ plugins: [react(), changelogs()] })

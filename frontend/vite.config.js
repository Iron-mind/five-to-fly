import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  //setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  //testEnvironment: "jsdom",

  plugins: [react()],
  preview: {
    host: true, // needed for the Docker Container port mapping to work
    port: 5173, // you can replace this port with any port
  },
  optimizeDeps: {
    include: ['@testing-library/jest-dom', '@testing-library/react'],
  },
})
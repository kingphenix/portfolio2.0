import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: '0.0.0.0', // Binds to all network interfaces (IPv4 and IPv6)
        port: 8080,
        strictPort: true,
        open: true
    }
})

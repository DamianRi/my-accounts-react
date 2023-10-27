import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: true },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
            },
            includeAssets: [
                "favicon.ico",
                "vite.svg",
                "apple-touch-icon-180x180.png",
            ],
            manifest: {
                name: "MisCuentas",
                short_name: "MC",
                description:
                    "Aplicación para la contabilidad de gastos personales.",
                theme_color: "#2c3e50",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});

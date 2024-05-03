import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import {viteMockServe} from "vite-plugin-mock";
import vuesetupExtend from "vite-plugin-vue-setup-extend"

// https://vitejs.dev/config/
export default defineConfig(({command,mode}) => {
    //获取各种环境对应的变量
    let env = loadEnv(mode,process.cwd())
    return {
        plugins: [
            vue(),
            vuesetupExtend(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
            //保证开发阶段可以使用mock
            viteMockServe({
                localEnabled: command === 'serve',
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve("./src")
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                        additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
        //代理跨域
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        }
    }
})

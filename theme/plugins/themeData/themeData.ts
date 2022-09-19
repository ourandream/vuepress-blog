import type { PluginFunction, App, PageData } from '@vuepress/core'
import type { GitPluginPageData } from '@vuepress/plugin-git'
import { myThemeData } from '../../types'

export let themeDataPlugin=(myThemeData:myThemeData):PluginFunction=>()=>({
    name:'vuepress-plugin-themeData',
    onPrepared:async app=>{
                await app.writeTemp('themeData.js',
        `export let themeData=${JSON.stringify(myThemeData)}`)
    }
})


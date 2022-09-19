import { path } from '@vuepress/utils'
import {defaultTheme, DefaultThemeData} from 'vuepress'
import type {myThemeData, themeOption} from './types'
import { ThemeData, themeDataPlugin } from '@vuepress/plugin-theme-data'
import {prismjsPlugin} from '@vuepress/plugin-prismjs'
import appendPages from './plugins/appendPages'
import { postsPlugin } from './plugins/posts/posts'
import {gitPlugin} from '@vuepress/plugin-git'

export default (options:themeOption) => {
  // returns a theme object
  return {
    name: 'vuepress-theme-temp',

    // path to the client config of your theme
    clientConfigFile: path.resolve(__dirname,'./client.ts'),
    
    // set custom dev / build template
    // if the template is not specified, the default template from `@vuepress/client` will be used

    // other plugin APIs are also available
    plugins: [
      // ...
      themeDataPlugin({
        themeData:{
          author:options.author,
          contactInfo:options.contactInfo
        } as ThemeData<myThemeData>
      }) as any,
      prismjsPlugin({
      }),
      appendPages,
      postsPlugin(),
      gitPlugin(),

      
    ],
  } 
}
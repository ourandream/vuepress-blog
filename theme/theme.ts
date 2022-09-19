import { path } from '@vuepress/utils'
import type {myThemeData, themeOption} from './types'
import {prismjsPlugin} from '@vuepress/plugin-prismjs'
import appendPages from './plugins/appendPages'
import { postsPlugin } from './plugins/posts/posts'
import {gitPlugin} from '@vuepress/plugin-git'
import {themeDataPlugin} from './plugins/themeData/themeData'

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
        
          author:options.author,
          contactInfo:options.contactInfo,
          comment:options.comment
          
      }) ,
      prismjsPlugin({
      }),
      appendPages,
      postsPlugin(),
      gitPlugin(),

      
    ],
  } 
}
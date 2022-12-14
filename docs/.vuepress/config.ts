import {  defaultTheme, defineUserConfig, viteBundler } from 'vuepress'
import myTheme from '../../theme/theme'
import {path} from '@vuepress/utils'

export default defineUserConfig({
  title: "Ouran's blog",
  description: 'The rest is silence',
  theme: myTheme({author:'ouran',contactInfo:{
    github:'https://github.com/ourandream',
    mail:'r008866@163.com',

  },
  comment:{
    appID:'tAWngVV5WoeaWSLSF3FKESDM-gzGzoHsz',
    appKey:'xAB723Rl3iWBvW2OnCnH89ab'
  }
}),
  bundler:viteBundler({
    viteOptions:{
      css:{
        preprocessorOptions:{
          scss:{
            additionalData: `@import "${path.resolve(__dirname,'../../theme/css/global.scss')}";`
          }
        }
      },
    }
  }),
  markdown:{
    headers:{
      level:[1,2,3]
    }
  },
  head: [['link', { rel: 'icon', href: '/img/head.jpg',type:"image/x-icon"}]]
})
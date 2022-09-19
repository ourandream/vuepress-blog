import { createPage ,App,Page} from '@vuepress/core'

export default {
  name: 'append-page',
  // all pages have been loaded after initialization
  async onInitialized(app:App) {
    // if the homepage does not exist
    if (app.pages.every((page:Page) => page.path !== '/')) {
      // create a homepage
      const homepage = await createPage(app, {
        path: '/',
        // set frontmatter
        frontmatter: {
          layout: 'HomePage',
        },
        // set markdown content
        content: ``,
      })
      // add it to `app.pages`
      app.pages.push(homepage)
    }

    const archive=await createPage(app,{
      path:'/archive',
      frontmatter:{
        layout:'Archive',
        title: 'Archive'
      },
      content:''
    })

    app.pages.push(archive)

    const categories=await createPage(app,{
      path:'/categories',
      frontmatter:{
        layout:'Categories',
        title:'Categories'
      }
    })
    app.pages.push(categories)
    for(let i=0;i<app.pages.length;++i){
      if(app.pages[i].path=='/about.html'){
        app.pages[i].frontmatter.layout='About'
      }
    }
    
    },
}
import type { PluginFunction, App, PageData } from '@vuepress/core'
import { Post } from '../../types'
import type { GitPluginPageData } from '@vuepress/plugin-git'

export let postsPlugin=():PluginFunction=>()=>({
    name:'vuepress-plugin-posts',
    onPrepared:async app=>{
        let posts:Post[]=[] 
        let temp:Post
        let pages=app.pages.filter((value)=>{
            return value.path!='/'&&value.path!='/404.html'
            && value.path!='/archive/' && value.path!='/categories/'
            && value.path!='/about.html'
        })
        for(let i=0;i<pages.length;++i){
            let summaryStart=pages[i].contentRendered.indexOf('<p>')
            let summaryEnd=pages[i].contentRendered.indexOf('</p>')
            temp={title:pages[i].title,
                date: pages[i].frontmatter.date as string || (pages[i].data as PageData<GitPluginPageData>).git.createdTime as unknown as string,
                path:pages[i].path,
                summary:pages[i].contentRendered.slice(summaryStart+3,summaryEnd)||'无',
                category:pages[i].frontmatter['categories'] as string||pages[i].frontmatter['category'] as string||'无分类'
            } 
            posts.push(temp)
        }
        posts=posts.sort((a,b)=>{
            let date1=new Date(a.date)
            let date2=new Date(b.date)
            return date2.getTime()-date1.getTime()
        
        })
        await app.writeTemp('posts.js',
        `export let posts=${JSON.stringify(posts)}`)
    }
})

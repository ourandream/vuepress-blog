type Valine=new (config:{el:string,appId: string,
    appKey: string})=>Object
let valine:Valine

declare module 'valine'{

    export default valine

    
}

declare module '@temp/posts' {
    export let posts:any[]
}

declare module '@temp/themeData' {
    export let themeData:any
}
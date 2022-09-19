type Valine=new (config:{el:string,appId: string,
    appKey: string})=>Object
let valine:Valine

declare module 'valine'{

    export default valine

    
}
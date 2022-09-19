interface contactInfo{
  github?:string,
  mail?:string
}

export interface themeOption{
    author:string,
    contactInfo:contactInfo,
    comment:{
      appID:string,
      appKey:string
    }
}

export interface myThemeData extends themeOption{
}

export interface NavbarItem{
  text:string,
  link:string,
  icon:string
}

export interface Post{
  title:string,
  path:string,
  date:string,
  summary:string
  category:string
}

export interface FinalPost{
  title:string,
  date:Date,
  path:string,
  summary:string
}

---
title: vue-router
categories: front-end
date: 2022-05-24 23:21:15
updated: 2022-05-25 00:40:46
---
[vue router](https://router.vuejs.org/)是vue官方推荐的管理单页应用路由的库.本文是对官网guide内容的总结.

## 基础

vue router的使用可简单的添加npm包,或使用`<script scr="url">`引入.

vue router提供了两个自定义的组件,`router-link`用于导航到某个界面,`router-view`显示导航到的界面.

使用:

```js
// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

// Now the app has started!
```

然后通过`this.$router`或在composition api中使用`useRouter` 或`useRoute`获得实例.

## Dynamic Route Matching with Params

route可以带参数(称作param):

```js
const User = {
  template: '<div>User</div>',
}

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon
  { path: '/users/:id', component: User },
]
```

然后通过`$route.params`获得参数:

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>',
}
```

还可以在一个route中有多个参数,如`/users/:username/posts/:postId`.

当匹配通过route但参数不同时,我们为了效率仍回使用相同的组件,此时需要使用一个watcher来观察参数的变换,或使用`beforeRouteUpdate`

## Routes' Matching Syntax

我们可以使用中则表达式来匹配:

```js
const routes = [
  // /:orderId -> matches only numbers
  { path: '/:orderId(\\d+)' },
  // /:productName -> matches anything else
  { path: '/:productName' },
]
```

可以匹配重复个`/`分隔的节:

```js
const routes = [
  // /:chapters -> matches /one, /one/two, /one/two/three, etc
  { path: '/:chapters+' },
  // /:chapters -> matches /, /one, /one/two, /one/two/three, etc
  { path: '/:chapters*' },
]
```

其中`+`匹配一个或多个,`*`匹配0个或多个.此时得到的参数chapter会是一个数组.

默认情况下,vue router对大小写不敏感,允许结尾的`/`,故`/users` 匹配 `/users`, `/users/`, 和 `/Users/`.我们可以通过`strict`和`sensitive`进行设置:

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // will match /users/posva but not:
    // - /users/posva/ because of strict: true
    // - /Users/posva because of sensitive: true
    { path: '/users/:id', sensitive: true },
    // will match /users, /Users, and /users/42 but not /users/ or /users/42/
    { path: '/users/:id?' },
  ]
  strict: true, // applies to all routes
})
```

我们可以用`?`让某个参数可选:

```js
const routes = [
  // will match /users and /users/posva
  { path: '/users/:userId?' },
  // will match /users and /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

注意要和`*`区分开,`?`不可匹配多个节.

几个特殊的规则:

```js
const routes = [
  // will match everything and put it under `$route.params.pathMatch`
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // will match anything starting with `/user-` and put it under `$route.params.afterUser`
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```

## Nested Routes

我们可以嵌套路由,即路由匹配的组件里也有`router-view`.

我们通过`children`设置子路由:

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        component: UserProfile,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

注意不要加`/`开头,不然不会自动添加`/user/:id/`的前缀作为路由.如果是`''`则会匹配所有,可作为默认界面.

children组件也可以继续嵌套.

## Programmatic Navigation

除了使用router-link,我们还可以使用router实例导航:

```js
// literal string path
router.push('/users/eduardo')

// object with path
router.push({ path: '/users/eduardo' })

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } })

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' })
```

`push`会加入一个新界面,注意如果使用了path参数,params会被忽略.

`push`会返回一个promise对象让可以可以异步处理.

router提供`router.push`, `router.replace` and `router.go`,于history api中的[`window.history.pushState`,`window.history.replaceState` and `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)相同.

## Named routes

我们还可以使用`name`来定义路由,这样就不用编写负责的url了.

定义:

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

使用:

```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

或

```js
router.push({ name: 'user', params: { username: 'erina' } })
```

## Named Views

有时候我们需要在同个界面显示多个view,此时我们需要给view提供`name`:

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

此时我们也需要多个组件:

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
    },
  ],
})
```

它可以于嵌套一起使用.

## Redirect and Alias

定义重定向:

```js
const routes = [{ path: '/home', redirect: '/' }]
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

我们还可以使用相对地址(不加`/`):

```js
const routes = [
  {
    // will always redirect /users/123/posts to /users/123/profile
    path: '/users/:id/posts',
    redirect: to => {
      // the function receives the target route as the argument
      // a relative location doesn't start with `/`
      // or { path: 'profile'}
      return 'profile'
    },
  },
]
```

注意navigation guard对重定向的路由无效.

添加别名:

```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // this will render the UserList for these 3 URLs
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

注意如果有参数在别名中也应该添加参数.

## Passing Props to Route Components

我们可以给路由对于的组件传props.

我们可以使用参数传给props:

```js
const User = {
  // make sure to add a prop named exactly like the route param
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]
```

当设为对象时,会自动传给对应的prop,这在参数是静态的时候很有用:

```js
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

对于Named view,需要分别定义:

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

我们还可以设为参数动态生成:

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

## Different History modes

我们有两种history mode,一种是`hash mode`:

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

这种模式下url会加一个`#`前缀,切换时不会向服务器发出请求.

另外还有`HTML5 Mode`:

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

这种情况下没有`#`前缀,但切换时会发出请求,我们需要配置服务器不是静态资源的所有链接都指向`index.html`.

## Navigation Guards

`navigation guards`用于验证跳转.

我们可以全局注册`navigation guards`:

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  return false
})
```

其中的参数意义:

- to:目标路由
- from:源路由

返回值意义:

- `false`: 取消跳转
- 路由: 重定位到该路由,格式如`{path:''}`.
- 不返回或true: 正常跳转

整个跳转流程:

1. Navigation triggered.
2. Call `beforeRouteLeave` guards in deactivated components.
3. Call global `beforeEach` guards.
4. Call `beforeRouteUpdate` guards in reused components.
5. Call `beforeEnter` in route configs.
6. Resolve async route components.
7. Call `beforeRouteEnter` in activated components.
8. Call global `beforeResolve` guards.
9. Navigation is confirmed.
10. Call global `afterEach` hooks.
11. DOM updates triggered.
12. Call callbacks passed to `next` in `beforeRouteEnter` guards with instantiated instances.

其中需要注意:

- `beforeEnter`直接在route设置(和`path`等并列)里填写,只会在从一个不同的路由跳转到时触发.它可以接受一个函数数组作为值.
- `afterEach`不可影响跳转,可以接受第三个参数failure对navigation failure进行处理.

我们还可以直接在组件中定义一些`navigation guards`:

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteUpdate(to, from) {
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, given a route with params `/users/:id`, when we
    // navigate between `/users/1` and `/users/2`, the same `UserDetails` component instance
    // will be reused, and this hook will be called when that happens.
    // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  },
  beforeRouteLeave(to, from) {
    // called when the route that renders this component is about to
    // be navigated away from.
    -- As with `beforeRouteUpdate`, it has access to `this` component instance.
  },
}
```

## Composition API

在composition中使用:

```js
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

navigation guards:

```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // same as beforeRouteLeave option with no access to `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!'
      )
      // cancel the navigation and stay on the same page
      if (!answer) return false
    })

    const userData = ref()

    -- same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  },
}
```

使用`router-link`的相关methods(和使用v-slot相同):

```js
import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AppLink',

  props: {
    // add @ts-ignore if using TypeScript
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props)

    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    )

    return { isExternalLink, href, navigate, isActive }
  },
}
```




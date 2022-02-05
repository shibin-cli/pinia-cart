# Pinia
[Pinia](https://pinia.vuejs.org)是一款全新的状态管理库（下一个版本的Vuex,   应该是Vuex5.0）。Pinia的作者(Eduardo)是vue.js的核心成员，目前Pinia已经被vue官方接管了

[Pinia](https://pinia.vuejs.org)最初是个实验，目的是重新设计Vue状态管理在composition api上的样子。

提案链接 https://github.com/vuejs/rfcs/pull/271

Vue3 将会在[ 2022 年 2 月 7 日](https://gist.github.com/yyx990803/bf9a625eeff8b471bf0701afb8e3fe75)发布，所以有必要了解下新的Vuex

在Vue3.x中使用状态管理，我们常见的可以使用
* Vuex4.0，存在很大缺陷，例如ts支持不是很友好
* Pinia

Pinia的特点
* 同时支持Vue2和Vue3
  * 除了安装和ssr配置外，两者的api都是相同的
  * 文档主要针对Vue3进行说明，必要的时候会对Vue2注释
* 支持Vue devtools
  * 跟踪action、mutations
  * 在使用容器的组件中就可以观察到容器本身
  * 支持time travel 调试功能
  * 在vue2中pinia使用vuex现有的接口，不能跟vuex同时使用
  * vue3中的调试工具还不够完美，比如还没有time-travel调试功能
* 模块热更新
  * 修改容器无须重新加载页面
  * 热更新的时候保持原有状态
* 支持使用插件拓展Pinia功能
* 比vuex有更好的typescript 支持
* 支持服务端渲染
* 使用方式跟vuex基本上相似
  * Pinia没有mutation，在action中既可以是异步，也可以是同步的。
  * 没有模块嵌套功能，没有命名空间模块
  * 不再需要注入、导入函数，调用他们享受自动补全
  * 无须动态添加store

## 使用Pinia
```bash
pnpm i pinia
```
将pinia挂载到vue实例上
```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

createApp(App)
.use(createPinia())
.mount('#app')
```
声明store
```ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    /**
     * 必须是函数，因为容器要兼容ssr服务端渲染，避免多个请求交叉污染
     * 必须是箭头函数，为了ts类型推断
     */
    state: () => {
        return {
            count: 0
        }
    },
    getters: {
      // 可以使用this.state,但必须手动标记返回值类型
        count2 (state) {
            return state.count * 2
        }
    },
    // 同步异步都支持
    actions: {

    }
})
```
在组件中使用，使用ts时，会自带提示，非常方便
```vue
<script setup lang="ts">
import { useStore } from '../store/index'

const store = useStore()
function changeCount() {
  store.count++
}
</script>

<template>
  <button type="button" @click="changeCount">count is: {{ store.count }}, count2 is : {{store.count2}}</button>
</template>
```
更新数据
```ts
store.count++
```
方式二
```ts
store.$patch({
  count: store.count + 1
})
```
方式三，现在store中声明action
```js
// store/index.ts
...
export const useStore = defineStore('main', {
  ...
    actions: {
        increment() {
            this.count++
        }
    }
})
```
在组件中调用
```ts
store.increment()
```

在浏览器中调试vue，可以在组件和pinia中切换。同时，在调试组件时，可以看到当前组件使用的的store，调试非常方便

解构store中的state，使用storeToRefs
```ts
import { storeToRefs } from 'pinia'
import { useStore } from '../store/product'
const store = useStore()
const { xxx } = storeToRefs(store)
```
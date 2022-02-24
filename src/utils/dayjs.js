import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 处理相对时间的插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// console.log(dayjs().format('YYYY-MM-DD'))

// 定义全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

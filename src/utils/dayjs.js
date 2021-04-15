import Vue from 'vue'
import dayjs from 'dayjs'
// dayjs默认语言是英文、我们这里配置中文
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// es6语法要写成
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入相对时间插件
// var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.locale('zh-cn') // 全局使用
// dayjs()获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// 配置使用 relativeTime 的插件
dayjs.extend(relativeTime)
/* dayjs().from(dayjs('1990-01-01')) // 31 年后
dayjs().from(dayjs('1990-01-01'), true) // 31 年
dayjs().fromNow()
dayjs().to(dayjs('1990-01-01')) // 31 年前
dayjs().toNow() */
// console.log(dayjs().to(dayjs('1990-01-01')))

// 定义一个全局可使用的过滤器 然后在任何组件模板中使用了、其实过滤器就是一个全局可使用的方法
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式： {{表达式 | 过滤器名称}}
// 管道符前面的表达式结果会作为参数传入过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

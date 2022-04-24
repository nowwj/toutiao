// 封装dayjs库
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 使用中文语言包
dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})


<template>
    <div class="channel-edit">
        <van-cell v-bind:border="false">
            <div class="title-text" slot="title">我的频道</div>
            <van-button @click="isEdit = !isEdit" class="edit-btn" type="danger" plain round size="small">{{ isEdit ? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid class="my-grid" :gutter="10">
            <van-grid-item
            class="grid-item"
            v-for="(channel,index) in myChannels"
            :key="index">
            <!-- 使用 v-show 的方式去做 -->
            <!-- :icon="isEdit ? 'clear' : ''" -->
            <!-- includes 方法就是 数组中包含某个元素 -->
                <van-icon slot="icon" name="clear" v-show="isEdit && !fixChannel.includes(channel.id)"></van-icon>
                <span @click="clickMyChannels(channel, index)" :class="{ active: index === active }" slot="text" class="text"> {{ channel.name }}</span>
            </van-grid-item>
        </van-grid>
        <!-- 频道推荐 -->
        <van-cell v-bind:border="false">
            <div class="title-text" slot="title">频道推荐</div>
        </van-cell>
        <van-grid class="recommend-grid" :gutter="10">
            <van-grid-item @click="addMyChannels(channel)" class="grid-item" icon="plus" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" />
        </van-grid>
    </div>
</template>
<script>
import { getAllChannels, addUserChannels, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    // 推荐列表
    // 如果计算属性依赖的数据发生变化后会重新执行一次
    recommendChannels () {
      // filter 方法用来过滤数组、把符合条件的元素存储到新数组中
      // filter内部自行创建数组并将新数组返回
      return this.AllChannels.filter(channel => {
        // 数组方法 find 遍历数组、把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => myChannel.id === channel.id)
      })
      /* const channels = []
      this.AllChannels.forEach(channel => {
        const isMyChannell = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // 如果我的频道不包含该频道、则收集到推荐频道列表
        if (!isMyChannell) {
          channels.push(channel)
        }
      })
      return channels */
    },
    ...mapState(['user'])
  },
  data () {
    return {
      AllChannels: [], // 所有频道列表
      isEdit: false, // 是否是编辑状态
      fixChannel: [0] // 固定不能删除的频道
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    //   获取所有频道列表
    async getAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.AllChannels = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    },
    // 点击推荐频道,添加到我频道中去
    async addMyChannels (channel) {
      try {
        console.log(channel)
        this.myChannels.push(channel)
        console.log(channel.id)
        console.log(channel.name)
        if (this.user) {
          // 用户已经登录
          // 此时接口有问题呢、无法成功进行我的频道线上持久化操作
          await addUserChannels({ id: channel.id, seq: this.myChannels.length })
          console.log('添加成功')
        } else {
          // 用户未登录
          console.log('用户还未登录')
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        console.log(error)
        this.$toast('添加失败，稍后再试。。。')
      }
    },
    // 点击我的频道列表的其中一个频道、执行删除或者跳转对应tabs的频道列表
    clickMyChannels (channel, index) {
      // console.log(channel)
      if (this.isEdit) {
        // isEdit 为 true 则编辑状态、执行删除操作
        if (this.fixChannel.includes(channel.id)) {
          // 如果是固定频道、则不能删除
          return this.$toast('固定频道不能删除')
        }
        if (index <= this.active) {
          // 如果被删除的索引在激活索引之间需要让激活索引同时减一 这样被激活的状态就保持不变
          this.$emit('update-active', this.active - 1, true)
        }
        // 第一个参数是删除的索引
        // 第二个参数是删除的个数 如果不指定、从参数1一直删除到最后
        this.myChannels.splice(index, 1)
        // 调用删除频道的方法
        this.deleteUserChannel(channel.id)
      } else {
        // console.log(index)
        // 非编辑状态、执行跳转操作
        // 通过自定义事件修改父组件中 active 状态
        // 这个自定义事件的名称一定要与父组件中一致、否则无法触发这个事件
        this.$emit('update-active', index, false)
      }
    },
    // 删除频道方法
    async deleteUserChannel (channelId) {
      try {
        if (this.user) {
          // 已经登录
          await deleteUserChannel(channelId)
        } else {
          // 删除可以使用重新存一份到本地、他会覆盖之前保存的
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
    .channel-edit {
        padding-top: 50px;
        .title-text {
            font-size: 22px;
            color: #333;
        }
        .edit-btn {
            width: 60px;
            height: 30px;
            color: #f85959;
            font-size: 16px;
            border: 1px solid #f85959;
        }
        // grid-item 这个是作用域样式 非更节点 因此需要添加 /deep/
        /deep/ .my-grid {
            .grid-item {
                width: 90px;
                height: 80px;
                // 这个一定要在根节点下才生效
                .van-grid-item__content {
                    background-color: #f4f5f6;
                    box-sizing: content-box;
                    .van-grid-item__text, .text {
                        font-size: 18px;
                        color: #222;
                    }
                    .active {
                        color: red;
                    }
                    .van-icon-clear {
                        position: absolute;
                        right: -8px;
                        top: -15px;
                        color: #cacaca;
                        z-index: 2;
                    }
                    .van-grid-item__icon-wrapper {
                      position: unset; // 让 清除图标 相对定位到祖先元素
                    }
                }
            }
        }
        /deep/ .recommend-grid {
            .grid-item {
                width: 90px;
                height: 86px;
                .van-grid-item__content {
                    white-space: nowrap; // 不要折行
                    flex-direction: row; // 排列方式水平
                    background-color: #f4f5f6;
                     box-sizing: content-box;
                    .van-icon-plus {
                        font-size: 18px;
                    }
                    .van-grid-item__text {
                        font-size: 18px;
                        color: #222;
                        margin-top: 0;
                    }
                }
            }
        }
    }
</style>

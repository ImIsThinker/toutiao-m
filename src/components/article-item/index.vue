<template>
    <div>
        <!--
            to 属性支持路由跳转，他和VueRouter中的routerLink组件的to属性用法一样的
            一种是:to="'/article/' + article.art_id"
            另一种是 :to="`/article/${article.art_id}`"
            这两种方式的实质就是拼字符串
            还有另一种用法就是给to属性一个对象
         -->
        <van-cell class="article-item"
        :to="{
            // 根据路由名称进行跳转
            name: 'article',
            // 传递路由动态参数
            params: {
                // 属性名：路由路径中设计的动态参数名称
                articleId: article.art_id
            }
        }"
        >
            <!-- van-multi-ellipsis--l2 最多显示两行 -->
            <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
            <div slot="label">
                <div class="cover-wrap" v-if="article.cover.type === 3">
                    <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
                        <van-image class="cover-item-img" fit="cover" :src="img" />
                    </div>
                </div>
                <div class="label-info-wrap">
                    <span>{{ article.aut_name}}</span>
                    <span>{{ article.comm_count}}</span>
                    <span>{{ article.pubdate | relativeTime}}</span>
                </div>
            </div>
            <div slot="default">
                <van-image
                v-if="article.cover.type === 1"
                class="right-cover"
                fit="cover"
                :src="article.cover.images[0]"
                />
            </div>
        </van-cell>
    </div>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
    .article-item {
        .title {
            font-size: 20px;
            color: #3a3a3a;
        }
        .van-cell__value {
            flex: unset; // 取消照片的flex布局 不参与空间分配
            // width: 110px;
            height: 100px;
            // padding-left: 15px;
        }
        .right-cover {
            // 固定照片的宽高
            width: 110px;
            height: 100px;
        }
        .label-info-wrap span {
            margin-right: 8px;
            font-size: 17px;
            color: #b4b4b4;
        }
        .cover-wrap {
            display: flex;
            padding: 13px 0;
            .cover-item {
                flex: 1;
                height: 100px;
                // 选择到不包含最后一个item的item
                &:not(:last-child) {
                    padding-right: 4px;
                }
            }
            .cover-item-img {
                width: 100%;
                height: 100px;
            }
        }
    }
</style>

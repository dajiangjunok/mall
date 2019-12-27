import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutations_type'

export default {
  addCart(context, payload) {
    /***
     * 1.遍历cartList 判断是否 已经存在这个商品数据，使用find数组函数
     * 2.如果已经存在，则find返回符合条件的item，并且修改这个item会将原数组一并修改
     * 3.拿到相同的item后  让他的 count 数量加一即可
     * 4.如果find找不到相同的项，则返回undefined ，判断下，如果找不到，则数组中还没有这块数据，我们先将传来的数据添加上count属性，并赋值为1
     * 5.然后将push进state的  cartList  对象中保存
     */
    let cart = context.state.cartList.find((item) => {
      return item.iid === payload.iid
    })
    if (typeof cart === 'undefined') {
      payload.count = 1
      payload.isClicked = true
      context.commit(ADD_TO_CART, payload)
    } else {
      context.commit(ADD_COUNT, cart)
    }
  }
}

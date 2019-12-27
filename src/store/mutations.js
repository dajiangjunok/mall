import {
  ADD_COUNT,
  ADD_TO_CART,
  SUB_COUNT,
  ADD_ITEM_COUNT
} from './mutations_type'

export default {
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  // 按钮减操作
  [SUB_COUNT](state, payload) {
    if (payload.count === 1) {
      state.cartList.find((item) => {
        return payload.iid == item.iid
      }).isClicked = false
    }
    state.cartList.find((item) => {
      return payload.iid == item.iid
    }).count--
  },
  // 按钮加操作
  [ADD_ITEM_COUNT](state, payload) {
    state.cartList.find((item) => {
      return payload.iid == item.iid
    }).count++
  }
}

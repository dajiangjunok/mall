export default {
  cartCount: state => {
    let cartCount = 0
    state.cartList.forEach((item) => {
      cartCount += item.count
    })
    return cartCount
  },
  cartList: state => {
    return state.cartList
  },
  collectCartCount: state => {
    let cartCount = 0
    state.cartList.forEach((item) => {
      if (item.isClicked) {
        cartCount += item.count
      }
    })
    return cartCount
  }
}

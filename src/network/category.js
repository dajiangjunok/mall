import {
  request
} from './request'

export function getCategory() {
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getSubcategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      // http://106.54.54.237:8000/api/w1/subcategory/detail?miniWallkey=10062603&type=pop
      type
    }
  })
}

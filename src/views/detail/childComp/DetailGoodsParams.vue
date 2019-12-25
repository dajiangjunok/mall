<template>
  <div class="params-info">
    <table class="info-size" v-for='(table,indez) in itemParams.sizes' :key='indez' align="center">
      <tr v-for='(item,index) in table' :key='index'>
        <td v-for='(i,j) in item' :key='j'>{{i}}</td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for='(info,index) in itemParams.infos' :key='index'>
        <td class="info-key">{{info.key}}</td>
        <td class="info-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img">
      <img :src="itemParams.img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsParams',
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {}
}
</script>

<style scoped>
.params-info {
  padding: 30px 15px;
  font-size: 13px;
  border-bottom: 4px solid #eee;
}
.info-size {
  box-sizing: border-box;
  width: calc(100vw - 30px);
}
.info-size tr {
  line-height: 35px;
  border: 1px solid #ccc;
}
.info-size td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-params {
  padding-top: 20px;
  box-sizing: border-box;
  width: calc(100vw - 30px);
}

.info-params tr {
  display: flex;
}
.info-params td:first-child {
  flex: 1;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 10px 0;
}
.info-params td:last-child {
  flex: 2;
  padding: 10px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 11px;
  color: var(--color-tint);
  vertical-align: middle;
}

/* .colectDataModfy .esentlInfor table{
    width: 100%;
    border-collapse:collapse;
    border:none;
}
.colectDataModfy .esentlInfor table tr{
    height: 48px;
}
.colectDataModfy .esentlInfor table td,.colectDataModfy .esentlInfor table th{
    border:solid #ebeef5 1px;
    padding:0px;
    margin: 0px;
    padding-left: 10px;
    
} */
</style>
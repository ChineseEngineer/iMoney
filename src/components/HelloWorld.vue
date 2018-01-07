<template>
  <div class="hello">
    <ve-pie :data="chartData" :settings="chartSettings" height="320px"></ve-pie>
    <div style="margin-bottom: 20px;">合计：{{total | formatMoney}} <i>CNY</i></div>
    <div>大写：{{total | smallToBig}}</div>
    <ul>
      <li v-for="(item, index) in coins" :key="index">
        <label>{{item.name}}: </label><input type="number" v-model="item.num"> * <input type="number" v-model="item.price"> = <input type="number" v-model="item.total">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        chartSettings: {
          dimension: 'type',
          metrics: 'money',
          width: '320px'
        },
        coins: [
          {'name': 'EOS', 'num': 6000, 'price': 73, 'total': 0},
          {'name': 'QTUM', 'num': 700, 'price': 487, 'total': 0},
          {'name': 'BTS', 'num': 50000, 'price': 5.8, 'total': 0},
          {'name': 'GXS', 'num': 3142, 'price': 70, 'total': 0},
          {'name': 'SC', 'num': 140987, 'price': 0.6, 'total': 0},
          {'name': 'SNT', 'num': 2000, 'price': 3.2, 'total': 0},
          {'name': 'WICC', 'num': 4450, 'price': 5.8, 'total': 0}
        ]
      }
    },
    computed: {
      total () {
        let result = 0
        this.coins.map(item => {
          item.total = parseInt(item.price * item.num)
          result += item.total
        })
        return parseInt(result)
      },
      chartData () {
        let rows = []
        this.coins.map(item => {
          rows.push({
            'type': item.name,
            'money': item.total
          })
        })
        return {
          columns: ['type', 'money'],
          rows: rows
        }
      }
    },
    filters: {
      /**
       * 金额格式化
       * @param val
       * @returns {string}
       */
      formatMoney (val) {
        return String(val).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      },
      /**
       * 金额小写转大写
       * @param n
       * @returns {string}
       */
      smallToBig (n) {
        let fraction = ['角', '分']
        let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
        let head = n < 0 ? '欠' : ''
        n = Math.abs(n)
        let s = ''
        for (let i = 0; i < fraction.length; i++) {
          s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n)
        for (let i = 0; i < unit[0].length && n > 0; i++) {
          let p = ''
          for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
      }
    },
    created () {
      this.$nextTick(() => {
  //      console.log(this.chartData)
      })
    },
    mounted () {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  .btn {
    /*min-width: 100px;*/
    text-align: center;
    background: lightcoral;
    color: #fff;
    border-radius: 50px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    outline: none;
    margin-right: 20px;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 20px;
    label {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
      text-align: right;
    }
    input[type=number] {
      width: 70px;
      padding: 5px;
    }
  }
  a {
    color: #42b983;
  }
  .scroll-wrapper {
    display: none;
    width: 500px;
    height: 800px;
    border: 1px solid red;
    overflow: hidden;
  }
</style>

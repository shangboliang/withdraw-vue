<template>
  <div>
    <el-input v-model="address" placeholder="输入地址"></el-input>
    <el-button @click="queryData">查询</el-button>
        <el-input v-model="contractAddress" placeholder="输入合约地址"></el-input>
    <el-button @click="filterData">过滤</el-button>
    <el-table :data="tableData" border>
      <el-table-column prop="blockHash" label="blockHash"></el-table-column>
      <el-table-column prop="contractAddress" label="contractAddress"></el-table-column>
      <el-table-column prop="nonce" label="nonce"></el-table-column>
      <el-table-column prop="status" label="status"></el-table-column>
      <el-table-column prop="receivedAt" label="receivedAt"></el-table-column>
      <el-table-column prop="amount" label="amount"></el-table-column>
        <el-table-column prop="fee" label="fee (ETH)"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
// const BigDecimal = require('bigdecimal');
import Web3 from 'web3';
        const web3 = new Web3();


export default {
  data() {
    return {
      address: '',
      tableData: [],
      contractAddress: '',
    };
  },
  methods: {
    queryData() {
      const url = 'https://zksync2-mainnet-explorer.zksync.io/transactions';
      const params = {
        limit: 100,
        direction: 'older',
        accountAddress: this.address
      };

      axios.get(url, { params })
        .then(response => {
          this.tableData = response.data.list.map(item => {
            const itemWithFee = this.convertWeiToEth(item);
            const chinaTime = this.convertUTCtoChinaTime(item.receivedAt);
            itemWithFee.receivedAt = chinaTime;
            return itemWithFee;
          });        
        })
        .catch(error => {
          console.error(error);
        });
    },
    convertUTCtoChinaTime(utcTime) {
    const localTime = new Date(utcTime);
    const chinaTime = localTime.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' });
    return chinaTime;
  },
    convertWeiToEth(item) {
        const result = web3.utils.fromWei(web3.utils.hexToNumberString(item.fee), 'ether');
      return {
        ...item,
        contractAddress:item.data.contractAddress,
        fee: result
      };
    },
    filterData(){
        this.tableData = this.tableData.filter(item => {
            return item.contractAddress === this.contractAddress
        })
        
    }

  },
  watch: {
    // 监听输入框的值变化，保存到本地存储中
    address(newVal) {
      localStorage.setItem('address', newVal)
    }
  },
    mounted() {
    // 从本地存储中读取输入框的值
    const address = localStorage.getItem('address')
    if (address) {
      this.address = address
    }
  },
};
</script>

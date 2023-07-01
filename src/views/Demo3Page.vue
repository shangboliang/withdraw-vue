<template>
    <div id="okx">
        <el-row :gutter="10">
            <el-col :span="4">
                <span>apiKey:&nbsp; </span>
                <el-input v-model="apiKey" @change="changeSecret" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="4">
                <span>secretKey:&nbsp; </span>
                <el-input v-model="secret"   @change="changeSecret"  placeholder="请输入内容" show-password ></el-input>
            </el-col>
            <el-col :span="4">
                <span>passphrase:&nbsp; </span>
                <el-input v-model="passphrase"   @change="changeSecret"   placeholder="请输入内容" show-password ></el-input>
            </el-col>
            <el-col :span="10">
                <span>执行间隔时间(ms):&nbsp;</span>
                <el-input v-model="startTime" placeholder="请输入内容" style="width: 20%;"></el-input>
                <span>~</span>
                <el-input v-model="endTime" placeholder="请输入内容" style="width: 20%;"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="10">
                coin
                <el-select v-model="coin"  filterable  @change="coinChagne" style="width:250px;"
                    placeholder="请输入关键词" >
                    <el-option v-for="item in coinList" :key="item.coin" :label="item.coin" :value="item.coin">
                              <span style="float: left">{{ item.coin }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.chain }}</span>
                    </el-option>
                </el-select>
                {{network}}
            </el-col>
            <el-col :span="4" >
                <span>数量</span>
                    <el-radio-group v-model="showFixed">
                    <el-radio-button label="fixed"  ><span>固定</span></el-radio-button>
                    <el-radio-button label="random" ><span>随机</span></el-radio-button>
                    </el-radio-group>
            </el-col>
            <el-col :span="4" v-if="showFixed=='fixed'" >
                <el-input v-model="fixedMoney"  placeholder="固定金额" @input="handleInput" ></el-input>
            </el-col>
            <el-col :span="4" v-if="showFixed=='random'">
                <el-input v-model="startMoney"  placeholder="min" @input="handleInput"></el-input>
            </el-col>
            <el-col :span="4" v-if="showFixed=='random'">
                <el-input v-model="endMoney" placeholder="max" @input="handleInput"></el-input>
            </el-col>
        </el-row>

        <el-row >
            <el-col :span="20">
              <span>地址（多个地址换行输入）</span>
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 5}"
                        placeholder="请输入内容"
                        v-model="addressText">
                    </el-input>
            </el-col>
            <el-col :span="4"  >
                <el-button type="primary" style="margin-top: 10%; height: 100%;" @click="handlerAddress"> 解 析</el-button>
                <el-button type="primary" style="margin-top: 10%; height: 100%;" @click="commitReq">开始提现</el-button>
            </el-col>
        </el-row>
 <template>
        <el-table
            :data="tableData" :row-class-name="tableRowClassName"
            border show-summary
            style="width: 100%">
        <el-table-column 
            prop="address"
            label="地址">
        <template slot-scope="{ row }">
            <el-input v-model="row.address"></el-input>
        </template>
        </el-table-column>
        <el-table-column 
            prop="quantity"
            label="数量">
        <template slot-scope="{ row }">
            <el-input v-model="row.quantity"></el-input>
        </template>
        </el-table-column>
                <el-table-column 
            prop="coin"
            label="币种">
        </el-table-column>
                <el-table-column 
            prop="network"
            label="网络">
        </el-table-column>
        <el-table-column 
            prop="waitTime"
            label="时间">
        </el-table-column>
        <el-table-column 
            prop="info"
            label="info">
        </el-table-column>
    </el-table>

    </template>
    </div>
</template>

<script>

const crypto = require('crypto');
import axios from 'axios';
const baseurl = '/okxapi'
export default {
    data() {
        return {
            apiKey: '',
            secret: '',
            randomTime: '',
            coinList: [],
            networkList:[],
            coin: '',
            network:'',
            moneyType:'',
            showFixed: true,
            // 默认保留4位小数
            fixedMoney:'',
            startMoney:'',
            endMoney:'',
            addressText:'',
            loading:'',
            tableData:[],
            startTime: 100,
            endTime: 100,
            coinDataList:[],
            withdrawFee:'',
            passphrase:'',
        
        }
    },
    methods: {
        getCoinAll(){

            let url = '/api/v5/asset/currencies'
            const timestamp = new Date().toISOString();
            const context = timestamp + "GET" + url
            console.log(context);

            const signature = crypto
                .createHmac('sha256', this.secret)
                .update(context)
                .digest('base64')
            axios.get(baseurl+url, {
                headers: {
                    'OK-ACCESS-KEY': this.apiKey,
                    'OK-ACCESS-TIMESTAMP': timestamp,
                    'OK-ACCESS-PASSPHRASE': this.passphrase,
                    'OK-ACCESS-SIGN': signature
                }
            }) 
            .then(response => {
                console.log(response);
                if(response.status===200){
                    this.coinDataList = response.data.data;
                    this.coinList = this.coinDataList.map(item => {return{coin:item.ccy,chain:item.chain,minFee:item.minFee}});
                }else{ 
                    this.$message.error(response.data.msg);
                }})
            .catch(error => {
                // console.log('Request URL:', error);
            });
        },
        changeSecret(value){
            if(this.apiKey.trim()!='' && this.secret.trim()!=''){
                this.getCoinAll()
            }
        },
        networkChagne(item){
            console.log(item);
            const obj = this.networkList.find(obj=>{return obj.network === item})
            this.withdrawFee=obj.withdrawFee
        },
        // 网络查询
        coinChagne(item) {
            this.network = item.chain
        },
        tableRowClassName({row, rowIndex}) {
            if (row.resStatus === 0) {
                return 'erroring-row';
            } else if (row.resStatus === 1) {
                return 'success-row';
            }
            return '';
        },
        getRandomNum(min, max) {
            return Math.random() * (max - min) + min;
        },
        // 解析地址
        handlerAddress(){
            if(this.addressText && this.addressText.trim() !== ''){
                if(this.showFixed !== 'fixed' && this.showFixed !== 'random'){
                    this.$message.error('请选择数量');
                }
                let fixedFlag = false
                if(this.showFixed === 'fixed'){
                    fixedFlag=true
                    if (this.fixedMoney == ''){
                        this.$message.error('请输入数量');
                    } 
                }else{
                   if(this.startMoney == '' || this.endMoney ==''){
                        this.$message.error('请输入数量');
                   }
                }
            
                if(this.startTime<100 || this.startTime > 1800000){
                    this.$message.error('不能超过30分钟');
                }

                const arr =  this.addressText.split("\n")
                const filteredArr = arr.filter(str => str.trim() !== '');

                this.tableData = filteredArr.map(item => {
                    let money = fixedFlag?this.fixedMoney:this.getRandomNum(this.startMoney,parseFloat(this.endMoney))
                    money = Math.floor(parseFloat(money) * 10000) / 10000;
                    const randomTime = this.getRandomNum(this.startTime,this.endTime)
                    return { address: item, quantity:money,waitTime:randomTime,info:'',resStatus:2,coin:this.coin,network:this.network};
                });
                console.log(this.tableData);
            }
        },
        // 保留四位小数
        handleInput(value) {
            // 过滤输入的值，只保留小数点后最多四位数的数字
            const reg = /^(\-)*(\d+)\.(\d{0,4}).*$/
            const newValue = value.replace(reg, '$1$2.$3')
            // 更新当前输入框的值
            this.$emit('input', newValue)
        },
        sendReq(item){
            const url = '/api/v5/asset/withdrawal' 
            let data  = {
                "ccy": this.coin,
                "amt": this.quantity,
                "dest": '4',
                "toAddr": item.address,
                "fee":'0',
                "chain": item.network,
            };

            const queryStr = JSON.stringify(data); 
            let contextStr = timestamp + "GET" + url + queryStr
            const signature = crypto
                .createHmac('sha256', this.secret)
                .update(contextStr)
                .digest('hex');
            data.signature=signature
            axios.post(url, null, { params:data,
                headers: {
                    'Content-Type': 'application/json', // 设置请求头的Content-Type
                    'OK-ACCESS-KEY': this.apiKey,
                    'OK-ACCESS-TIMESTAMP': timestamp,
                    'OK-ACCESS-PASSPHRASE': this.passphrase,
                    'OK-ACCESS-SIGN': signature
                }
            }).then(response => {
                // 请求成功的处理逻辑
                console.log(response.data);
            })
            .catch(error => {
                // 请求失败的处理逻辑
                console.error(error);
                item.resStatus=0
                this.$message.error(error.response.data);
            });
                
        },
        commitReq(){
            if(this.tableData.length<=0){
                this.$message.error('请先解析');
            }
            if(this.apiKey.trim()==''){
                this.$message.error('请输入apikey');
            }
            if(this.secret.trim()==''){
                this.$message.error('请输入secret');
            }
            if(this.passphrase.trim()==''){
                this.$message.error('请输入passphrase');
            }
            if(this.coin.trim()==''){
                this.$message.error('请选择币种');
            }
            if(this.network.trim()==''){
                this.$message.error('请选择网络');
            }
            if(this.quantity.trim()==''){
                this.$message.error('请输入quantity');
            }
            for (let i = 0; i < this.tableData.length; i++) {
                const obj = this.tableData[i];
                this.sendReq(obj)
            }
            // 请求拦截器
            axios.interceptors.request.use((config) => {
            console.log('请求信息:', config);
            return config;
            }, (error) => {
            console.error('请求错误:', error);
            return Promise.reject(error);
            });


        }
    },
    mounted() {
        // this.getCoinAll()
    },

}
</script>


<style>
  .el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}
  .el-col {
    border-radius: 4px;
  }
.el-input {
    width: 60%;
}
  .el-table .erroring-row {
    background: rgb(255, 3, 3);
  }

  .el-table .success-row {
    background: #6ed138;
  }
</style>

<template>
    <div id="okx">
        <el-row :gutter="10">
            <el-col :span="4">
                <span>apiKey:&nbsp; </span>
                <el-input v-model="apiKey" @change="changeSecret" @blur="changeSecret" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="4">
                <span>secretKey:&nbsp; </span>
                <el-input v-model="secret"   @change="changeSecret"   @blur="changeSecret" placeholder="请输入内容" show-password ></el-input>
            </el-col>
            <el-col :span="4">
                <span>passphrase:&nbsp; </span>
                <el-input v-model="passphrase"   @change="changeSecret"   @blur="changeSecret"  placeholder="请输入内容" show-password ></el-input>
            </el-col>
            <el-col :span="10">
                <span>执行间隔时间(ms):&nbsp;</span>
                <el-input v-model="startTime" placeholder="请输入内容" style="width: 20%;"></el-input>
                <span>~</span>
                <el-input v-model="endTime" placeholder="请输入内容" style="width: 20%;"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="5">
            <el-col :span="8">
                coin
                <el-select  v-model="coinAndChain" value-key="coin" filterable  @change="coinChagne" style="width: 100%;"
                    placeholder="请输入关键词" >
                    <el-option v-for="item in coinList" :key="item.coin" :label="item.coin" :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <span>提现费用</span>
                <el-input v-model="minFee"  @change="changeSecret" disabled @blur="changeSecret" placeholder="请输入内容"></el-input>
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
            coinAndChain:'',
            minFee:'',
        
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
                    this.coinList = this.coinDataList.map(item => {return{coin:item.ccy+'  '+item.chain,chain:item.chain,minFee:item.minFee,ccy:item.ccy}});
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
            this.coin = item.ccy
            this.network = item.chain
            this.minFee=item.minFee
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
                    const randomTime =Math.floor(this.getRandomNum(this.startTime,this.endTime)); 
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
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async sendReq(item){
            const url = '/api/v5/asset/withdrawal' 
            let data  = {
                "ccy": this.coin,
                "amt": item.quantity,
                "dest": '4',
                "toAddr": item.address,
                "fee":this.minFee,
                "chain": this.network,
            };

            const timestamp = new Date().toISOString();
            let contextStr = timestamp + "POST" + url + JSON.stringify(data)
            console.log(contextStr);
            const signature = crypto
                .createHmac('sha256', this.secret)
                .update(contextStr)
                .digest('base64');
            axios.post(baseurl+url, data, { 
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
                if(response.data!=null&&response.data!=0){
                    item.resStatus=0
                    item.info=response.data.msg;
                }
            })
            .catch(error => {
                // 请求失败的处理逻辑
                console.error(error);
                this.$message.error(error.response.data);
                item.info="网络异常"
            });
                
        },
        async commitReq(){
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
        
            for (let i = 0; i < this.tableData.length; i++) {
                const obj = this.tableData[i];

                console.log("睡眠中");
                console.log(new Date().toLocaleTimeString());
                await this.sleep(obj.waitTime)
                console.log("睡眠结束");
                console.log(new Date().toLocaleTimeString());

                await this.sendReq(obj)
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
        this.getCoinAll()
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

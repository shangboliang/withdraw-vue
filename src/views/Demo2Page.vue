<template>
    <div id="bian">
        <el-row :gutter="20" >
            <el-col :span="6">
                apiKey
                <el-input v-model="apiKey" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="6">
                secret
                <el-input v-model="secret" placeholder="请输入内容" show-password></el-input>
            </el-col>
            <el-col :span="6">
                执行间隔时间(ms)
                <el-input v-model="randomTime" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row >
        <el-row :gutter="20" type="flex" style="height: 6%;">
            <el-col :span="6">
                coin
                <el-select v-model="coin" multiple filterable :change="coinChagne" remote reserve-keyword popper-class="selectCls"
                          style="width:250px;"
                    placeholder="请输入关键词" :remote-method="queryCoinAndNetwork" :loading="loading">
                    <el-option v-for="item in coinList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                network
                <el-select v-model="value" filterable placeholder="请选择" popper-class="selectCls">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                金额类型
                <div>
                    <el-radio-group v-model="showFixed">
                    <el-radio-button label="fixed">固定</el-radio-button>
                    <el-radio-button label="random">随机</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col :span="8">
                <el-input v-model="FixedMoney" v-if="showFixed=='fixed'" placeholder="请输入金额" style="margin-top: 20px;"></el-input>
                <el-input v-model="startMoney" v-if="showFixed=='random'" placeholder="请输入最小金额"></el-input>
                <el-input v-model="endMoney" v-if="showFixed=='random'" placeholder="请输入最小金额"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//引入依赖

export default {
    data() {
        return {
            apiKey: '',
            secret: '',
            randomTime: '',
            coinList: [],
            coin: '',
            netwokrList: '',
            moneyType:'',
            showFixed: true,
            startMoney:'',
            endMoneyL:'',
        }
    },
    methods: {
        coinChagne(item) {

        },
        queryCoinAndNetwork(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    console.log('远程方法');
                    this.coinList = [];
                }, 200);
            } else {
                this.coinList = [];
            }
        }
    }
}
</script>

<style  >
.selectCls {
   max-height:200px;
}
.selectCls .el-scrollbar {
    max-height: 300px;
}

.el-row {
    margin-bottom: 20px;
    height: 12%;
}

.el-row:last-child {
    margin-bottom: 0;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

</style>

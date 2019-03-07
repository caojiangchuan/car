import React,{Fragment} from 'react';
import './writeCard.css'
import Fetch from '../com/fetch'
import Protect from "./protect";

let reg = /^[\u4E00-\u9FA5A-Za-z]+$/
// let idcard = new RegExp(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)
let phone = new RegExp(/^1\d{10}$/); //正则表达式
export default class WriteCard  extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            protocol:'wri-protocol',
            name:'',
            phone:'',
            idcard:'',
            code:'',
            count: 60, // 秒数初始化为60秒
            liked: true, // 文案默认为‘获取验证码‘
            getCode:'获取验证码',
            bankCard:'',
            bankList:[],
            bankName:'',
            bankCode:'',
            fowId:'',
            bank:false,
            loading:'loading',
            idcardGive:'',


        }
        this.protocol=this.protocol.bind(this)
        this.close=this.close.bind(this)
        this.inputOnBlur=this.inputOnBlur.bind(this)
        this.next=this.next.bind(this)
        this.name=this.name.bind(this)
        // this.idcard=this.idcard.bind(this)
        this.code=this.code.bind(this)
        this.phone=this.phone.bind(this)
        this.getCode=this.getCode.bind(this)
        this.bankCard=this.bankCard.bind(this)
    }
    componentDidMount(){
        if(sessionStorage.getItem('idnum')){
            this.setState({
                idcard:sessionStorage.getItem('idnum').substr(0,3)+'***********'+sessionStorage.getItem('idnum').substr(14,4),
                idcardGive:sessionStorage.getItem('idnum')
            })

        }
        this.setState({
            loading:'loading loading-show'
        })
        Fetch.post('/lease/gateway/getBankCardList',{
        }).then(json =>{
            if(json.resCode==='000000'){
                this.setState({
                    bankList:json.attachment,
                    loading:'loading'
                },()=>{
                    console.log(this.state.bankList)

                })

            }else{
                if(json.resMsg){

                    this.setState({
                        loading:'loading'
                    })
                    alert(json.resMsg)
                }else {

                    this.setState({
                        loading:'loading'
                    })
                    alert('服务超时')
                }

            }
        }).catch(e=>{
            if(e.resMsg){

                this.setState({
                    loading:'loading'
                })
                alert(e.resMsg)
            } else {

                this.setState({
                    loading:'loading'
                })
                alert('服务超时')
            }
        })

    }

    //查看协议页面
    protocol(){
        this.setState({
            protocol:'wri-protocol wri-protocolShow'
        })
    }
    //关闭协议页面
    close(){
        this.setState({
            protocol:'wri-protocol'
        })
    }
    inputOnBlur(){
        window.scrollTo(0,0);
    }
    //姓名
    name(e){
        this.setState({
            name:e.target.value

        },()=>{

            if(this.state.fowId!==''){
                this.setState({
                    fowId:''
                })

            }
        })

    }
    //银行卡号
    bankCard(e){
        this.setState({
            bankCard:e.target.value
        },()=>{

            if(this.state.fowId!==''){
              this.setState({
                  fowId:''
              })

            }
        })
    }
    //身份证
    // idcard(e){
    //     this.setState({
    //         idcard:e.target.value
    //     })
    // }
    //手机号码
    phone(e){
        this.setState({
            phone:e.target.value
        },()=>{

            if(this.state.fowId!==''){
                this.setState({
                    fowId:''
                })

            }
        })
    }
    //验证码
    code(e){
        this.setState({
            code:e.target.value
        })
    }
    //倒计时
    countDown=()=> {
        // liked is false 的时候，不允许再点击
        this.setState({
            liked:false,
            getCode:'重新发送'
        })
        if (!this.state.liked) {
            return
        }
        let count = this.state.count
        const timer = setInterval(() => {
            this.setState({
                count: count--,
            },()=>{
                if (count === -1) {
                    clearInterval(timer);
                    this.setState({
                        liked: true ,
                        count: 60
                    })
                }
            });
        }, 1000);


    }
    //获取验证码
    getCode(){
        if(this.state.bankName===''){
            alert('请选择银行')
            return
        }
        if(this.state.bankCard===''){
            alert('银行卡号不能为空')
            return
        }
        if(this.state.name===''){
            alert('姓名不能为空')
            return
        }
        // if(this.state.idcard===''){
        //     alert('身份证不能为空')
        //     return
        // }
        if(this.state.phone===''){
            alert('手机号不能为空')
            return
        }
        if(!reg.test(this.state.name)){
            alert('姓名格式错误')
            return
        }
        // if(!idcard.test(this.state.idcard)){
        //     alert('身份证格式错误')
        //     return
        // }
        if(!phone.test(this.state.phone)){
            alert('手机号格式错误')
            return
        }else {

            if (this.state.liked) {
                this.setState({
                    loading:'loading loading-show'
                })
                this.countDown()
                Fetch.post('/lease/gateway/bankCardSendSMS', {
                    name: this.state.name,
                    idnum: this.state.idcardGive,
                    mobile: this.state.phone,
                    account: this.state.bankCard,
                    bankName: this.state.bankName,
                    bankCode: this.state.bankCode

                }).then(json => {
                    if (json.resCode === '000000') {
                        alert('验证码已经发送')
                        this.setState({
                            fowId: json.attachment.flowId,
                            loading:'loading'
                        }, () => {

                        })

                    } else{
                        if(json.resMsg){
                            this.setState({
                                loading:'loading'
                            })
                            alert(json.resMsg)

                        }else {
                            this.setState({
                                loading:'loading'
                            })
                            alert('服务超时')

                        }

                    }
                }).catch(e=>{
                    if(e.resMsg){
                        this.setState({
                            loading:'loading'
                        })
                        alert(e.resMsg)

                    } else {
                        this.setState({
                            loading:'loading'
                        })
                        alert('服务超时')

                    }
                })
            }
        }
    }
    //点击下一步
    next(){
        if(this.state.bankName===''){
            alert('请选择银行')
            return
        }
        if(this.state.bankCard===''){
            alert('银行卡号不能为空')
            return
        }
        if(this.state.name===''){
            alert('姓名不能为空')
            return
        }
        // if(this.state.idcard===''){
        //     alert('身份证不能为空')
        //     return
        // }
        if(this.state.phone===''){
            alert('手机号不能为空')
            return
        }
        if(this.state.code===''){
            alert('验证码不能为空')
            return
        }
        if(!reg.test(this.state.name)){
            alert('姓名格式错误')
            return
        }
        // if(!idcard.test(this.state.idcard)){
        //     alert('身份证格式错误')
        //     return
        // }
        if(!phone.test(this.state.phone)){
            alert('手机号格式错误')
            return
        }
        if(this.state.fowId===''){
           alert('请重新获取验证码')
        } else {
            this.setState({
                loading:'loading loading-show'
            })
            Fetch.post('/lease/gateway/bindBankCard',{
                flowId:this.state.fowId,
                code:this.state.code,
            }).then(json =>{
                if(json.resCode==='000000'){
                    this.setState({
                        loading:'loading',
                        bank:true,
                    })
                    alert('绑卡信息已提交')
                    setTimeout(()=>{
                        // window.location='https://rzzlwg-test.zendaimoney.com/lease-gateway-web/pageForward/jumpWx' //测试地址
                        // window.location='https://rzzlwg-dev.zendaimoney.com/lease-gateway-web/pageForward/jumpWx'
                        this.props.history.push({
                            pathname: '/success'
                        })
                    },1000);
                }else{
                    if(json.resMsg){
                        this.setState({
                            bank:false,
                            loading:'loading'
                        })
                        alert(json.resMsg)
                    }else {
                        this.setState({
                            bank:false,
                            loading:'loading'
                        })
                        alert('服务超时')
                    }

                }
            }).catch(e=>{
                if(e.resMsg){
                    this.setState({
                        loading:'loading'
                    })
                    alert(e.resMsg)
                } else {
                    this.setState({
                        loading:'loading'
                    })
                    alert('服务超时')
                }
            })
        }
    }

    mySelect = (e) => {
        console.log(this.state.bankList[e.target.value],  'zheshishuju')

        this.setState({
            bankName: this.state.bankList[e.target.value].bankName,
            bankCode: this.state.bankList[e.target.value].bankCode,
            bankCard:''


        })
    }
    render() {
        let list;
        list = this.state.bankList.map((item,index) => {
            return (
                <option value={index} key={item.bankCode}>{item.bankName}</option>
            )
        })

        return (
            <Fragment>
              <div className='wri-include'>
                <div className="wri-kind"><span>卡类型</span>
                    <select  className="wri-bankName" onChange = {this.mySelect.bind(this)}  >
                        <option disabled selected  value ="请选择银行卡">请选择银行卡</option>
                        {list}
                    </select></div>
                <div className="wri-kind wri-idcard"><span>银行卡号</span><input type="tel"  className="wri-input" placeholder="持卡人银行卡号" value={ this.state.bankCard }  onBlur={this.inputOnBlur} onChange={this.bankCard} maxLength={19}  readOnly={this.state.bank}/></div>
              </div>
                <div className='wri-include wri-include2'>
                <div className="wri-name wri-kind"><span>姓名</span><input type="text"  className="wri-input" placeholder="持卡人姓名"  onBlur={this.inputOnBlur} onChange={this.name} maxLength={10} readOnly={this.state.bank}/></div>
                <div className="wri-kind wri-idcard"><span>身份证</span><input type="text"   className="wri-input" placeholder="持卡人身份证"  onBlur={this.inputOnBlur} value={this.state.idcard} maxLength={18} readOnly /></div>
                </div>
                <div className='wri-include wri-include2'>
                <div className="wri-kind wri-name" ><span>手机号</span><input type="text"  className="wri-input" placeholder="银行预留手机号" pattern="\d*" onBlur={this.inputOnBlur} maxLength={11} onChange={this.phone}  readOnly={this.state.bank} /></div>
                <div className="wri-kind wri-idcard "><span >验证码</span><input type="text"  className="wri-input" placeholder="请输入6位验证码" pattern="\d*"  onBlur={this.inputOnBlur} maxLength={6} onChange={this.code}/><span className="getNum" onClick={this.getCode}>{this.state.liked?this.state.getCode:this.state.count + 's' }</span></div>
                </div>
                <p className="wri-next">
                    点击绑定，即表示你已阅读并同意                    <span onClick={this.protocol}>《相关协议》</span></p>
                <div className="wri-nextBtn" onClick={this.next}>绑定</div>
                {/*协议*/}
                <div className={this.state.protocol}>
                    <div className="ass-close" onClick={this.close}><img src={require('../com/img/close.png')} alt=""/>
                    </div>
                    <Protect/>
                </div>
                <div className={this.state.loading}>
                    <div className='loading-tip' ><span style={{marginLeft:'10px'}}><img alt='' src={require('../com/img/loading.png')} width='15px' height='15px'/></span><span style={{color:'white', fontSize:'12px',position:'relative',top:'-2px',left:'10px'}}>读取中...</span></div>
                </div>
            </Fragment>
        );
    }

}

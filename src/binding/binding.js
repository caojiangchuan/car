import React,{Fragment} from 'react';
import './binding.css'
import Fetch from '../com/fetch'



export default class Binding extends React.Component {
    constructor(props) {
        super(props);
        this.state={
                phoneValue:'',
                password:'',
                openid:'',
                loading:'loading',
                idNum:''
        }
        this.binding=this.binding.bind(this)
        this.phone=this.phone.bind(this)
        this.password=this.password.bind(this)
        this.idNum=this.idNum.bind(this)
    }
//获取url参数
     GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    componentDidMount(){

       this.setState({
           openid:this.GetQueryString('openId')
       },()=>{

       })



    }

    //判断手机号
    phone(e){
         this.setState({
             phoneValue:e.target.value
         })
    }

    //判断密码
    password(e){
        this.setState({
            password:e.target.value
        })
    }
    //身份证
    idNum(e){
        this.setState({
            idNum:e.target.value
        })
    }

//点击绑定
    binding(){
        let tel = new RegExp(/^1\d{10}$/); //正则表达式
        var reg = new RegExp(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)

        if(this.state.idNum===''){
            alert('请输入身份证号')
            return
        }
        if(this.state.phoneValue===''){
            alert('请填写手机号')
            return
        }
        if(this.state.password===''){
            alert('请填写密码')
            return
        }
        if(!tel.test(this.state.phoneValue)){
            alert('手机格式不对')
            return
        }

        if(!reg.test(this.state.idNum)){
            alert('身份证格式不对')
            return
        }else {
            this.setState({
                loading:'loading loading-show'
            })
             Fetch.post('/lease/gateway/loginValidateCode',{
                 mobile:this.state.phoneValue,
                 code:this.state.password,
                 openId: this.state.openid,
                 idnum:this.state.idNum

            }).then(json =>{
               if(json.resCode==='000000'){
                   sessionStorage.setItem('idnum',this.state.idNum)
                   this.setState({
                       loading:'loading'
                   })
                   this.props.history.push({
                        pathname: '/writeCard',
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


    }

    inputOnBlur(){
        window.scrollTo(0,10);
    }
    render() {
        return (
            <Fragment>
                <div className='binding-top'>
                  <div className='binding-logo'><span><img src={require('../com/img/wx_logo.png')} alt="" width='28px' height='28px'/></span><span><img src={require('../com/img/jiantou.png')} alt="" width='16px' height='12px'/></span><span><img src={require('../com/img/logo.png')} alt="" width='25px' height='28px'/></span></div>
                    <div className='binding-allinput'>
                        <input type='tel' placeholder='请输入身份证号' className='binding-input' maxLength={18}  onChange={this.idNum} onBlur={this.inputOnBlur}/>
                        <input type='tel' placeholder='请输入手机号' className='binding-input' maxLength={11}  onChange={this.phone} onBlur={this.inputOnBlur}/>
                        <input type='tel' placeholder='请输入6位验证码' className='binding-input binding-input2' maxLength={6} onChange={this.password} onBlur={this.inputOnBlur}/>
                        <span className='binding-span'>身份证号</span>
                        <span className='binding-span2' >手机号</span>
                        <span className='binding-span3' >验证码</span>
                    </div>

                </div>
              <div className='binding-btn' onClick={this.binding} >绑定</div>

                <p className="binding-tip">如验证码失效，或其他问题需帮助，请联系<span ><a href="tel:021-68878163" style={{color:'#3385FF'}}>021-68878163</a></span></p>

          <div className={this.state.loading}>
              <div className='loading-tip' ><span style={{marginLeft:'10px'}}><img src={require('../com/img/loading.png')} width='15px' height='15px' alt=''/></span><span style={{color:'white', fontSize:'12px',position:'relative',top:'-2px',left:'10px'}}>读取中...</span></div>
          </div>
            </Fragment>
        )
    }
}


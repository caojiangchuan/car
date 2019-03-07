import React,{Fragment} from 'react';
import './associated.css'

export default class Associated extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bankList:'ass-bankList',
            cardValue:''
        }
        this.find=this.find.bind(this)
        this.close=this.close.bind(this)
        this.next=this.next.bind(this)
        this.card=this.card.bind(this)
    }

    //查看支持银行列表
    find(){
      this.setState({
          bankList:'ass-bankList ass-bankListShow'
      })
    }

    //关闭查看支持银行列表
    close(){
        this.setState({
            bankList:'ass-bankList'
        })
    }

    //银行卡内容
    card(e){
        this.setState({
            cardValue:e.target.value
        })
    }

    //点击下一步
    next(){
        let card = /\d{15}|\d{19}/
        if(this.state.cardValue===''){
            alert('请输入银行卡号')
            return
        }
        if(!card.test(this.state.cardValue)){
                alert('请输入格式正确的银行卡号')
        }else {
            // this.props.history.push({
            //     pathname:'/writecard'
            // })
        }


    }

    render() {
        return (
            <Fragment>
                <div className="ass-allinput">
                <input type="tel" placeholder="卡号          支持借记卡" className="binding-input" onChange={this.card} maxLength={19}  pattern="\d*" />
                    <p>暂不支持****银行，<span onClick={this.find}>查看目前支持的银行</span></p>
                </div>
                <div className="ass-next" onClick={this.next} >下一步</div>
                <div className={this.state.bankList}>
                    <div className="ass-close" onClick={this.close}><img src={require('../com/img/close.png')} alt=""/>
                    </div>
                    <p>目前支持的银行</p>
                    <ul className="ass-bankImg">
                        <li><img src={require('../com/img/zg-gd.gif')} alt=""/></li>
                        <li><img src={require('../com/img/jt-yh.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zx-yh.gif')} alt=""/></li>
                        <li><img src={require('../com/img/pf-yh.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zg-js.gif')} alt=""/></li>
                        <li><img src={require('../com/img/xy_yh.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zg-ny.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zg-yh.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zg-yz.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zs-yh.gif')} alt=""/></li>
                        <li><img src={require('../com/img/zg_gs.gif')} alt=""/></li>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

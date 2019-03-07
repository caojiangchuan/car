import React,{Fragment} from 'react';

const sucBg={
    width: '100%',
    height: '100%',
    background:'white',
    position:'fixed',
    top:'0'
}
const sucLogo = {
    width: "64px",
    height:'64px',
    margin: "0px auto",
    marginTop:'89px'

}
const sucFont={
       textAlign:'center',
       fontSize:'18px',
       marginTop: '25px',
       color:'#242424'
}
export default  class Success extends  React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <Fragment>
                <div style={sucBg}>
             <div style={sucLogo}><img src={require('../com/img/success.png')} alt="" width='64px' height='64px'/></div>
                <p style={sucFont}>绑卡成功!</p>
                </div>
            </Fragment>
        );
    }

}

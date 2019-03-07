import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import  Binding from './binding/binding'
import Associated from "./binding/associated";
import Success from "./com/success";
import './App.css';
import WriteCard from "./binding/writeCard";
import  wx from 'weixin-js-sdk';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Binding} />
                <Route  path="/login" component={Binding}/>
              <Route path="/associated" component={Associated}/>
              <Route path="/success" component={Success}/>
                <Route path="/writecard" component={WriteCard}/>
            </Switch>
        </BrowserRouter>


    );
  }
    componentWillMount() {
        // let _default_url ='http://cbre.4ait.com/zhaoshang/';
        let _default_img ="<img src={require('./com/img/logo.png')} />";
        let _default_title ='证大汽车融资租赁';
        let _default_desc='证大汽车融资租赁';
        wx.ready(function(){


            wx.onMenuShareTimeline({
                title: _default_desc,
                // link: _default_url,
                imgUrl: _default_img,
                success: function () {

                },
                cancel: function () {

                }
            });

            wx.onMenuShareAppMessage({
                title:  _default_title,
                desc: _default_desc,
                // link:_default_url,
                imgUrl: _default_img,
                type: '',
                dataUrl: '',
                success: function () {

                },
                cancel: function () {

                }

            });
            //qq
            wx.onMenuShareQQ({
                title: _default_title,
                desc: _default_desc,
                // link:_default_url,
                imgUrl: _default_img,
                success: function () {

                },
                cancel: function () {

                }
            });
            //weibo
            wx.onMenuShareWeibo({
                title: _default_title,
                desc: _default_desc,
                // link: _default_url,
                imgUrl: _default_img,
                success: function () {

                },
                cancel: function () {

                }
            });
        });
    }
  componentDidMount(){
      window.alert = function(name){
          var iframe = document.createElement("IFRAME");
          iframe.style.display="none";
          iframe.setAttribute("src", 'data:text/plain,');
          document.documentElement.appendChild(iframe);
          window.frames[0].window.alert(name);
          iframe.parentNode.removeChild(iframe);
      }
  }
}

export default App;

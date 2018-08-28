import React,{Component} from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import '../../css/nav.css'

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            date:new Date(),
            list:["标题一","标题二"],
            num:0,
            test:'111'
        }
        this.changeNum=this.changeNum.bind(this);
        this.getData=this.getData.bind(this);
    }
    render() {
        let {date,list,num,test}=this.state
        return (
            <div className="navs">
                <div className="nav">
                    <ul>{
                    list.map((value) =>{
                        return(
                            <li>{value.baddress}</li>
                        )
                    })
                    }</ul>
                </div>
                {test}
                {date.toString()}
                {test}
                <button onClick={this.getData}></button>
                <button onClick={this.changeNum}>{"当前的数据:"+num}</button>
            </div>
        )
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        const _this=this
        axios.get("http://localhost:8080/Spring/selectjsxx.action").then(function (response) {
            _this.setState({
                test:response.data.message,
                list:response.data.data
            })
        })
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    changeNum(){
        let {num}=this.state;
        let newNum=num+1;
        this.setState({
            num:newNum
        })
    }
    getData(){
        let {test}=this.state
        axios.get("http://localhost:8080/Spring/selectjsxx.action").then(function (response) {
            this.setState({
                test:response.data.message
            })
            console.log(response.data.message)
        })

    }
    // componentWillMount(){
    //     this.getData();
    // }
}
export default Nav;

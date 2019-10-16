import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { css } from '@emotion/core';
// First way to import
import { HashLoader } from 'react-spinners';
import Forecast from './Forecast';
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment';
import YouTube from 'react-youtube';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #09d3ac;
`;

class App extends React.Component {
  constructor(props) { //React.Component 를 상속한 컴포넌트의 생성자를 구현할때, 
    super(props); // 다른 구문에 앞서 super(props)를 호출해야함
    this.state = {
      weather: null, //초기값 설정
      loading: true,
      hasError: false,
      videoURL: 'https://youtu.be/uNCr7NdOJgw'
    }
  }
  componentDidMount() { // 이 안에서 다른 JavaScript 프레임워크를 연동
    this.getLocation() // 이 클래스 안에있는 getLocation()을 호출
  }

  getLocation = () => { //함수 정의
    navigator.geolocation.getCurrentPosition((post) => { //builtin function
      this.getData(post.coords.longitude, post.coords.latitude) //이 클래스 안에있는 getData를 호출
    })
  }


  getData = async (lon, lat) => {
    const api = process.env.REACT_APP_API;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${api}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok){
    this.setState({ //받은 데이터를 state에 넣어준다.
      weather: data // weather : null <-- data
        })
        console.log(data)
    }
    else{
      alert(' 404');
    }
  }
  
  Update = (event) => {
    window.location.reload(false);
  }


  render() {
    const date = new Date();
    if (!this.state.weather) // state.weather 이 없으면,
    return <div className="App App-header" style={{ color: 'white' }}>
      <HashLoader 
      css={override}
      sizeUnit={"px"}
      size={130}
      margin={"2px"}
      color={'#09d3ac'}
      loading={this.state.loading} />
      <h3>loading...</h3>
    </div>

    return (
      <div className="App-header container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-3 my-2 py-4">
              HOW'S THE WEATHER?
            </h1>
            <h3 className="col-12">{this.state.weather && this.state.weather.name}</h3>
            <h3 className="col-12 text-danger">Temp : {this.state.weather && this.state.weather.main.temp}°C</h3>
            <h5 className="col-12">{this.state.weather && this.state.weather.main.temp_max}°C | {this.state.weather && this.state.weather.main.temp_min}°C</h5>
            <h2 className="col-12"><img src = {`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} />{this.state.weather && this.state.weather.weather[0].description}</h2>
            <span>Updated as of &nbsp;
              <Moment format="HH:mm">
                {date}
              </Moment>&nbsp;</span>
              <FontAwesomeIcon 
              icon={faSyncAlt} spin 
              onClick={this.Update.bind(this)}
              style={{ cursor: 'pointer' }} />
                   
          </div>
        </div>
        <Forecast />
      </div>

      
    )
  }
}

export default App;
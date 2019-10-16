import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from 'react-bootstrap';

  export default function Forecast() {
  const [forecast, setForecast] = useState(null)
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      getData(post.coords.longitude, post.coords.latitude)
    })
  }

  useEffect(() => {
    getLocation()
  }, []) // [] means run once!!!!

  const getData = async (lon, lat) => {
    const api = process.env.REACT_APP_API
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${api}&units=metric`
    const response1 = await fetch(url)
    const data1 = await response1.json()
    setForecast(data1)
    console.log(data1)
  }
  return (
    <div className="container-fluid text-white my-auto">
       <div className="container mx-auto my-4 py-4">
         <div className="row justify-content-center text-center">
           <div className="d-flex col-12">
           {forecast && forecast.list.slice(2,7).map((weather)=>
           <Card bg="dark" border="danger" text="white" style={{ width: '18rem' }}>
           <Card.Body>
             <Card.Title><Moment format="D MMM HH:mm">
             {weather.dt_txt}
            </Moment>
            </Card.Title>
             <Card.Subtitle className="mb-2 text-danger"> 
             {weather.main.temp}°C</Card.Subtitle>
             <Card.Text>
             {weather.weather[0].description}
             <img src = {`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}></img>
             </Card.Text>
           </Card.Body>
         </Card>
           
 )}</div>
           {/* <h3 className="col-12 text-danger">Temperature {forecast && forecast.main.temp}°C</h3>
          <h3 className="col-12">Weather Description {forecast && forecast.weather[0].description}</h3> */}
         </div>
       </div>
     </div>
  )
  
  
//   <div>
//     <div className="container-fluid text-white my-auto">
//       <Carousel>
//   <Carousel.Item>
//   <Carousel.Caption>
//     <h3>First slide label</h3>
//     <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//   </Carousel.Caption>
//   <img src = {`http://openweathermap.org/img/w/${forecast.list.map((weather)=>weather.weather[0].icon)}.png`} />
//   <div className="row-12">asdsad</div>
//   <div className="row-12">asdsad</div>
//   <div className="row-12">asdsad</div>
// </Carousel.Item>
// <Carousel.Item>
// <Carousel.Caption>
//     <h3>Second slide label</h3>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//   </Carousel.Caption>
//   <div className="row-12">asdsad</div>
//   <div className="row-12">asdsad</div>
//   <div className="row-12">asdsad</div>
// </Carousel.Item>
// </Carousel>
//     </div>
//  </div>
}

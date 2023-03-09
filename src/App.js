import React, { useEffect, useState } from "react";


function WeatherDate(props){
   
    let date = new Date()
    
    return(
        <p>
            {date.toLocaleDateString()}
        </p>
    )
}

function City(props){
    return(
        <p>
            {props.city}
        </p>
    )
}

function Temp(props){
   
    if(props.err){
        return(
            <p>Ошибка</p>
        )
    }else if(props.answ === null){
        return(
            <p>Загрузка</p>
        )
    }else{
        let t  = props.answ.main.temp - 273.15;
        let c  = props.answ.weather[0].main;
        return(
            <p>
               {Math.round(t)} &deg;, {c}
            </p>
        )
    }
}

async function getCord(city){
   
    let res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6cc8447dbdf18663729ccee4064bc370
    `)
    let answ  = await res.json();
    return answ;
}


async function getData(lat, lon){
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6cc8447dbdf18663729ccee4064bc370`)

    let answ = await res.json()

    return answ
}



function App(){

    
    const [city, cityChange] = useState()
    const [err, errChange] = useState()
    const [answ, answChange] = useState(null)
    const [text, textChange] = useState()

   useEffect(()=>{
    errChange(null)
    let a;
    let b;
    if(city !== undefined && city !== null && city !== ""){
        getCord(city).then((result)=>{
           a = result[0].lat
           b = result[0].lon
           
        }).then(()=>{
            getData(a, b).then((result) =>{
                
                answChange(result)
            })
        }).catch((err)=>{
            errChange(err)
        })
    }
  

    
   }, [city])

    function handleChange(ev){
        
        textChange(ev.target.value)
    }

    function handleSubmit(ev){
        cityChange(text);
        ev.preventDefault()
    }
   
  return(
    <div className="wrapper">
    <form className="form" onSubmit={handleSubmit}>
        <label>
            Город:
            <input className="cityInput" value={text || ''} onChange={handleChange}></input>
        </label>
    
       <input type="submit" value="Запрос" className="form-btn"></input> 
    </form>
        
    <div className="weather-block">
        <div className="weather-block__about">
            <WeatherDate/>
            <City  city = {city}></City>
        </div>
       <div>
       <Temp answ = {answ} err ={err}></Temp>
       </div>
          
        </div>
</div>
  )
}







export default App;

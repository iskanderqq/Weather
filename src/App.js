import React from "react";


function WeatherDate(props){
    let date = new Date()
    let a = "asd"
    return(
        <p>
            {date.toLocaleDateString()}
        </p>
    )
}

function City(props){
    return(
        <p>
            Казань
        </p>
    )
}

// function Temp(props){
//     async fucn
//     return(
//         <p>

//         </p>
//     )
// }


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temp: 0,
        }
        
    }
    async temp(){
        let asd;
        let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=55.7823547&lon=49.1242266&appid=1ea38a5fe3d4112ce0838391dcd621e3")
        console.log(response)
        asd = await response.json()
        this.setState({
            temp: asd.main.temp
        })
    }


    render(){
        let tempo =  this.state.temp - 273.15
        this.temp()
        return(
        
            <div className="wrapper">

                <div className="weather-block">
                    <div className="weather-block__about">
                        <WeatherDate/>
                        <City ></City>
                    </div>
                   <div>

                   </div>
                        <p> {Math.round(tempo)}</p>
                    </div>
            </div>
        )
    }
}

export default App;

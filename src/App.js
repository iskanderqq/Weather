import React from "react";


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
            Казань
        </p>
    )
}

function Temp(props){
    if(props.error){
        return(
            <p>{props.error.message}</p>
        )
    }else if(!props.isLoaded){
        return(
            <p>
                Loading
            </p>
        )
    }else {
        return(
            <p>
                {Math.round(props.res - 273.15) }
            </p>
        )
    }
}




class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            res: null,
        };
        
    }
   
    componentDidMount(){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=55.7823547&lon=49.1242266&appid=6cc8447dbdf18663729ccee4064bc370")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    res: result.main.temp
                });
            },
            (error) =>{
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    render(){
      const {error, isLoaded, res} = this.state;
        return(
        
            <div className="wrapper">

                <div className="weather-block">
                    <div className="weather-block__about">
                        <WeatherDate/>
                        <City ></City>
                    </div>
                   <div>

                   </div>
                   <Temp error ={error} isLoaded = {isLoaded} res = {res}></Temp>
                    </div>
            </div>
        )
    }
}

export default App;

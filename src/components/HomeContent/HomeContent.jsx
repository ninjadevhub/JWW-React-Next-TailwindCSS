import React from "react"
import HomeCarusel from "../HomeCarusel/HomeCarusel"




const HomeContent = ({data}) => {
    const { home: carusel } = data.pageBy;

    console.log("------",carusel.slide)

    return(
        <div>
            <div className='flex '>

                {carusel.slide.map((index)=>(

                    <HomeCarusel 
                    data={data}
                    carsuel={index}
                    />
                ))}
                   
            </div>

        </div>
    )
}

export default HomeContent
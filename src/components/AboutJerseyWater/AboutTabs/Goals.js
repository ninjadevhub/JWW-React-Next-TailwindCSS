import { data } from "autoprefixer"
import React from "react"


const Goals = ({data}) => {
    
    return(

        <div className='flex flex-col'>
            <div className='flex justify-center mt-14'>
                <p className='text-2xl text-center text-brand-gray-typo'>{data.goalsTabHeading}</p>
            </div>
            <div className='flex justify-center mt-14'>
                <p className='text-xl text-center text-brand-gray-typo'>{data.goalsTabText}</p>
            </div>
            <div className='flex justify-center mt-2'>
                 <button  class="w-1/3 pt-2 bg-brand-orange font-nova text-base m-auto text-base text-white font-bold py-2 px-4 rounded">
                            {data.goalsTabButtonText}
                  </button>
            </div>
        </div>
    )
}

export default Goals
import React from 'react'
import { FaCheck } from "react-icons/fa";



 const Water101Municpalities= ({dataWater}) => {

    return (
        <div className='flex flex-row justify-between mt-16'>
        <div className='flex flex-col w-full'>
            <div className='bg-brand-navy h-32 flex items-center'>
                <button className='bg-brand-orange h-14 m-auto w-4/5'>
                    <p className='font-nova text-white'>{dataWater.municipalitiesButtonText}</p>
                </button>                            
            </div>
            <div className='bg-brand-blue h-4'>
            </div>
            <div className='flex flex-col pl-24'>
                <div>
                    <p className='font-nova text-3xl text-brand-gray-typo mb-4 mt-14'>{dataWater.individualsSubheading}</p>
                    <p className='font-museo text-4xl text-brand-gray-typo'>{dataWater.municipalitiesHeading}</p>
                </div>
                <div className='mt-20'> 
                    {dataWater.municipalitiesList.map((item)=>(
                        <ul>
                            <li className='flex flex-row '>
                                <div className=" border-4 border-brand-purple-icon rounded-3xl mr-8 mb-6  flex">
                                    <FaCheck
                                    color={"03a399"}
                                    />
                                </div>
                                {item.itemText}
                            </li>
                        </ul>
                    ))}

                </div>
            </div>

        </div>
        <div className='w-full'
              style={{backgroundImage:`url(${dataWater?.municipalitiesImage?.sourceUrl})`,
              width:'60%',
              height:'800px',
          }}
           
        >
            
        </div>
    </div>

    )

}

export default Water101Municpalities

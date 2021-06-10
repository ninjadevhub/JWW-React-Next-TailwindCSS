import React from "react"
import { FaAngleRight } from "react-icons/fa";

const Members = ({data}) => {

    return(
        <div className='flex flex-col'>
            <div className='flex w-4/5 m-auto mt-16 '>
                <p className='text-2xl text-center text-brand-gray-typo'>{data.membersHeading}</p>
            </div>
            
            <div className='flex flex-row justify-between w-3/5 m-auto mt-16'>
                <div className='w-2/5  bg-brand-orange justify-center  flex'>
                    <button  className="font-nova text-base m-auto text-base text-white   rounded">
                            {data.membersButton1Text}
                    </button>
                </div>
                <div className='w-2/5  bg-brand-orange justify-center  flex p-2'>
                    <button  className="font-nova text-base m-auto text-base text-white  rounded">
                            {data.membersButton2Text}
                    </button>
                </div>
            </div>

            <div className='flex w-4/5 m-auto mt-20 mb-20'>
                <p className='text-center font-museo text-xl text-brand-gray-typo'>Jersey Water Works is a collaborative effort of many diverse organizations and individuals who embrace the common 
                    purpose of transforming New Jersey’s inadequate water infrastructure. Members work together across boundaries to 
                </p>
            </div>

            <div className='flex border-2 border-brand-table'>
                <div className='w-full p-4'>
                    {data.members.map((item) => (
                        <div className='p-1 flex flex-row justify-between items-center bg-brand-table mb-2 mt-2 '>
                            <div>
                                <p className="text-2xl font-museo text-brand-gray-typo">{item.memberHeading}</p>
                            </div>
                            <div>
                                <FaAngleRight/>
                            </div>    
                            
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Members
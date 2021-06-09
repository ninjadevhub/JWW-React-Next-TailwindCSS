import React, { useState } from "react"
import { FaAngleRight,FaAngleDown } from "react-icons/fa";
import InvolvedSignupForom from "../InvolvedSignupForm/InolvedSignupForm";

const InvolvedMemberTable = ({data}) => {

    const [showForm,setShowForm] = useState(false)
    const iconHandler = () => {
        setShowForm(!showForm)
    }

    return (
        <div className='flex flex-col mt-12 border-brand-table border-4 w-full'>
            <div className=' w-11/12  bg-brand-table flex flex-row m-auto mt-8 '>
                <div className='w-11/12 flex-row flex justify-between items-center m-auto '>
                    <div>
                        <p className='font-museo text-2xl text-brand-gray-typo'>{data.accordionTab1Text}</p>
                    </div>
                    <div onClick={iconHandler}>
                        {showForm ?  <FaAngleDown className='cursor-pointer'/> : <FaAngleRight className='cursor-pointer'/>}
                    </div>
                </div>
            </div>
           {showForm ? <InvolvedSignupForom data={data}/> : ''} 
            <div className=' w-11/12  bg-brand-table flex flex-row m-auto mt-2 mb-8'>
                <div className='w-11/12 flex-row flex justify-between items-center m-auto '>
                    <div>
                        <p className='cursor-pointer font-museo text-2xl text-brand-gray-typo'>{data.accordionTab2Text}</p>
                    </div>
                    <div>
                        <FaAngleRight
                        className='cursor-pointer '
                        />
                    </div>
                </div>
            </div>

        </div>
    )

}

export default InvolvedMemberTable
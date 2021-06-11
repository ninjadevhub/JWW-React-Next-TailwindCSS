import React, { useState } from "react"
import { FaAngleRight,FaAngleDown } from "react-icons/fa";
import InvolvedCommitteeForm from "../InvolvedCommitteeForm/InvolvedCommitteeForm";
import InvolvedSignupForom from "../InvolvedSignupForm/InolvedSignupForm";

const InvolvedSignupTable = ({data}) => {

    const [showSignupMember,setShowSignupMember] = useState(false)
    const [showCommitMember,setShowCommitMember] = useState(false)
 

    const iconHandler = () => {
        setShowSignupMember(!showSignupMember)
    }
    const iconHandler2 = () => {
        setShowCommitMember(!showCommitMember)

    }
    return (
        <div className='flex flex-col mt-12 border-brand-table border-4 w-full'>
            <div className=' w-11/12  bg-brand-table flex flex-row m-auto mt-8 '>
                <div className='w-11/12 flex-row flex justify-between items-center m-auto '>
                    <div>
                        <p className='font-museo text-2xl text-brand-gray-typo'>{data.accordionTab1Text}</p>
                    </div>
                    <div onClick={iconHandler}>
                        {showSignupMember ? 
                         <FaAngleDown className='cursor-pointer'/> : <FaAngleRight className='cursor-pointer'/>}
                    </div>
                </div>
            </div>
           {showSignupMember ? <InvolvedSignupForom data={data} /> : ''} 


            <div className=' w-11/12  bg-brand-table flex flex-row m-auto mt-2 mb-8'>
                <div className='w-11/12 flex-row flex justify-between items-center m-auto '>
                     <div>
                        <p className='font-museo text-2xl text-brand-gray-typo'>{data.accordionTab2Text}</p>
                    </div>
                    <div onClick={iconHandler2}>
                     {showCommitMember ?  <FaAngleDown className='cursor-pointer'/> : <FaAngleRight className='cursor-pointer'/>}
                    </div>
                </div>
            </div>
            {showCommitMember ? <InvolvedCommitteeForm data={data} /> : ''} 
            

        </div>
    )

}

export default InvolvedSignupTable
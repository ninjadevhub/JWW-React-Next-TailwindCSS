import React from "react"
import { FaTimes,  FaCheck} from 'react-icons/fa'
import Image from '../../image/index'


const ModalEquity = ({data,onClose}) => {
    if(!data) {
        return null
    }
    //console.log("datamodal",data)

    return(
        <div className="relative flex flex-col "
        style={{zIndex: 10000}}
        >
            <div className='bg-brand-form-bg1 w-6/7 m-auto'>
                <div className='absolute right-0 -top-4 cursor-pointer' onClick={onClose}>
                    <FaTimes
                        color={"white"}
                        size={"50px"}
                        className="border bg-brand-orange rounded-full"
                    />
                </div>    
                <div className='flex flex-col items-center justify-center mt-12 mb-12'>
                    <div>
                       <Image sourceUrl= {data.modalIcon.sourceUrl}/>
                    </div>
                    <div className='flex items-center pt-8 '>
                        <p className='font-museo text-3xl text-brand-gray-typo'>{data.modalHeading}</p>
                    </div>
                    <div className='flex justify-center w-2/3 m-auto mt-8'>
                        <p className='font-nova text-center text-xl text-brand-gray-typo'>{data.modalText}</p>
                    </div>
                </div>

                <div className='w-2/3 m-auto'>
                    <div className='bg-brand-orange p-2'>
                        <p className='text-center text-white font-museo text-2xl'>{data.modalList1Heading}</p>
                    </div>

                    <div className='bg-brand-form-bg2  p-8 border-b-4 border-brand-orange'>
                        {data.modalList1.map((item) => (
                            <div className='flex flex-row w-10/12 m-auto mb-12'>
                                <div>
                                    <div className=" border-4 border-brand-purple-icon rounded-3xl mr-8 mb-6  flex">
                                        <FaCheck
                                        color={"03a399"}
                                        />
                                    </div>
                                </div>    
                                <div>
                                    <p className='font-nova  text-brand-gray-typo text-xl'>{item.item}</p>
                                </div>    
                            </div>    
                        ))}
                    </div>

                </div>

                <div className='w-2/3 m-auto pt-12'>
                    <div className='bg-brand-blue p-2'>
                        <p className='text-center text-white font-museo text-2xl'>{data.modalList2Heading}</p>
                    </div>

                    <div className='bg-brand-form-bg2  p-8 border-b-4 border-brand-blue'>
                        {data.modalList2.map((item) => (
                            <div className='flex flex-row w-10/12 m-auto mb-12 items-center'>
                                <div>
                                    <div className=" border-4 border-brand-purple-icon rounded-3xl mr-8 mb-6  flex">
                                        <FaCheck
                                        color={"03a399"}
                                        />
                                    </div>
                                </div>    
                                <div>
                                    <p className='font-nova  text-brand-gray-typo text-xl'>{item.item}</p>
                                </div>    
                            </div>    
                        ))}
                    </div>

                </div>


            </div>
            
           
            
            
               

        </div>

    )
}

export default ModalEquity
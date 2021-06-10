import React, { useState} from "react"
import InvolvedSignupTable from "./InvolvedSignupTable/InvolvedSignupTable"
import Image from 'next/image';


const GetInvolved = ({dataInvovled}) => {
    console.log("d",dataInvovled)


        return(
            <div className='flex flex-col items-center'>

                                     
                                           

                <div className="flex flex-col jutify-center items-center" 
                    style={{backgroundImage:`url(${dataInvovled?.headerImage?.sourceUrl})`,
                        width:'100%',
                        height:'430px',
                        backgroundRepeat:'no-repeat',
                        backgroundSize:'cover'
                    }}
                >   
                     <div className="flex flex-col items-center  justify-center  bg-white w-2/5  m-auto mr-20">
                        <p className='mt-6 mb-6 font-museo text-3xl text-brand-gray-typo '>{dataInvovled.headerTitle}</p>
                        <p className='text-xl mb-6 ml-2 font-nova text-brand-gray-typo'>
                           {dataInvovled.headerText}
                        </p>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center mt-12 mb-12'>
                    <div>
                        <p className='text-lg font-museo text-brand-gray-typo'>{dataInvovled.mainHeading}</p>
                    </div>
                </div>

                <div className="flex flex-row w-4/5">
                    <div className='flex flex-col'>
                        <div>
                             <img  className='w-full h-32' src = {`${dataInvovled.col1Image.sourceUrl}`} />
                        </div>
                        <div>
                             <img src = {`${dataInvovled.col1Icon.sourceUrl}`} />
                        </div>
                        <div className='flex '>
                            <p className='ml-16 -mt-4 text-xl text-brand-gray-typo font-nova'>{dataInvovled.col1Text}</p>
                        </div>
                       
                    </div>
                    <div className='flex flex-col'>
                        <div >
                             <img className='w-full h-32' src = {`${dataInvovled.col2Image.sourceUrl}`} />
                        </div>
                        <div>
                             <img src = {`${dataInvovled.col1Icon.sourceUrl}`} />
                        </div>
                        <div className='flex  h-12 '>
                            <p className='ml-16 -mt-4 text-xl text-brand-gray-typo font-nova'>{dataInvovled.col2Text}</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div>
                             <img className='w-full h-32' src = {`${dataInvovled.col3Image.sourceUrl}`} />
                        </div>
                        <div>
                             <img src = {`${dataInvovled.col1Icon.sourceUrl}`} />
                        </div>
                        <div className='flex  h-12 '>
                            <p className='ml-16 -mt-4 text-xl text-brand-gray-typo font-nova'>{dataInvovled.col3Text}</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div>
                             <img className='w-full h-32' src = {`${dataInvovled.col4Image.sourceUrl}`} />
                        </div>
                        <div>
                             <img src = {`${dataInvovled.col1Icon.sourceUrl}`} />
                        </div>
                        <div className='flex  h-12'>
                            <p className='ml-16 -mt-4 text-xl text-brand-gray-typo font-nova'>{dataInvovled.col4Text}</p>
                        </div>
                    </div>
                </div>
                
                <InvolvedSignupTable data={dataInvovled}/>
                <div className='mt-8'>
                          <Image
                            src="/images/blue-circle-with-orange-circle-drop.png"
                            width={151}
                            height={151}
                            alt="purple-circle"
                            />
                </div>
            </div>
        )


}

export default GetInvolved
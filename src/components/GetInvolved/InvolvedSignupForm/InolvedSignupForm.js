import React from 'react'


const InvolvedSignupForom = ({data}) => {

    return(
        <div className= "bg-brand-form-bg1 flex flex-col m-auto w-11/12 justify-center mt-12">
            <div className='flex '>
                <button class="w-72 bg-brand-blue font-nova text-base m-auto text-white font-bold py-2 px-4 rounded">
                     {data.accordionTab1ButtonText}
                </button>
            </div>

            <div className='flex flex-col w-11/12 m-auto bg-brand-form-bg2 mt-12'>
                    <div className='flex justify-center'>
                        <p className='font-museo text-lg text-brand-gray-typo'>{data.form1Heading}</p>
                    </div>

                    <div className='flex flex-row m-auto w-3/4'>
                                <form className="rounded grid  grid-cols-2 gap-4 px-8 pt-8 pb-8 mb-4">

                                    {data.form1Fields.map((item) => (
                                        <div className="mb-4  ">
                                            <input className="w-full py-4 px-8 text-black-500 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={`${item.label}`}/>
                                        </div>
                                    ))}
                                
                                </form>
                    </div>

                    <div className='w-2/3 m-auto '>
                        <div className='flex justify-center items-center pt-4 pb-4'>
                            <p className='font-museo text-brand-gray-typo text-base'>{data.form1CheckboxesHeading}</p>
                        </div>
                        <div>
                            <p className='font-nova text-brand-gray-typo text-sm'>{data.form1CheckboxesIntroText}</p>
                        </div>
                    </div>

                    <div className=" w-2/3 m-auto grid  grid-cols-2 gap-4 pt-4">
                        {data.form2Checkboxes.map((item) => (
                            <label className="flex items-center">
                            <input type="checkbox" class="form-checkbox"/>
                            <span className="ml-2 font-nova text-brand-gray-typo text-sm">{item.labelAndValue}</span>
                        </label>
                        ))}
                        
                    </div>

                    <div className='w-3/4 m-auto bg-brand-form-bg-footer mt-12 flex flex-col items-center justify-center'>
                            <div className='mt-8' >
                                <p className="font-museo text-brand-gray-typo text-base">{data.form1FooterHeading}</p>
                            </div>
                            <div className='w-3/4 m-auto mt-4'>
                                <p className='font-nova text-brand-gray-typo text-base'>{data.form1FooterText}</p>
                            </div>

                    </div>
                    <div className='flex m-auto mt-12 mb-12'>
                        <button class="w-48 bg-brand-blue font-nova text-base m-auto text-white font-bold py-2 px-4 rounded">
                            {data.form1SubmitButtonText}
                        </button>
                    </div>
             </div>

        </div>
    )
}

export default InvolvedSignupForom
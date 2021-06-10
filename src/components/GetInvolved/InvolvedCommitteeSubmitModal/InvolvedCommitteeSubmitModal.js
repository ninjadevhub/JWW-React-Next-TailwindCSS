import Link from 'next/link'
import { FaTimes,  FaAngleRight,FaAngleDown} from 'react-icons/fa'



 const InvolvedCommitteeSubmitModal = ({data,onClose}) => {
    if(!data) {
        return null
    }

    return(
        <div className="relative flex flex-col "
        style={{zIndex: 10000}}
        >
            <div className='absolute right-0 -top-4 cursor-pointer' onClick={onClose}>
                <FaTimes
                    color={"white"}
                    size={"50px"}
                    className="border bg-brand-orange rounded-full"
                />
            </div>   
                <div className='flex flex-col items-center'>
                    <div className="justify-center items-center mt-32">
                        <p className="font-museo text-3xl text-brand-gray-typo">{data.form2ThankYouPopupHeading}</p>
                    </div>
                    <div className='w-2/3 m-auto mt-8'>
                        <div className="flex justify-center"
                            style={{backgroundImage:`url(${data.form2ThankYouPopupImage.sourceUrl})`,
                            width:'100%',
                            height:'250px',
                            backgroundRepeat:'no-repeat',
                            backgroundSize:'cover'
                        }}
                        >
                        </div>
                    </div>
                <div className='border-b-2 border-brand-green w-2/3 bg-brand-form-bg2 flex flex-col justify-center items-center'>
                    <div className='mt-8 mb-8 flex justify-center items-center w-2/3'>
                        <p className="font-museo text-xl text-brand-gray-typo">{data.form2ThankYouPopupText}</p>

                    </div>
                </div>
            </div> 
            
           
        </div>

    )
}

export default InvolvedCommitteeSubmitModal
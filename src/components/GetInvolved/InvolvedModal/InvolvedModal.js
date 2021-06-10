import { FaTimes,  FaAngleRight,FaAngleDown} from 'react-icons/fa'



 const InvolvedModal = ({data,onClose}) => {
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
            <div className='flex flex-col items-center justify-center mt-12 mb-12'>
                <div className='flex items-center '>
                    <p className='font-museo text-3xl text-brand-gray-typo'>{data.membersPopupHeading}</p>
                </div>
                <div className='flex justify-center w-2/3 m-auto mt-12'>
                    <p className='font-nova text-xl text-brand-gray-typo'>{data.membersPopupIntroText}</p>
                </div>
            </div>
            
            {data.membersPopupAccordion.map((item) => (
                <div className='flex flex-col w-3/4 m-auto mb-1'>
                    <div className='flex flex-row  items-center  bg-brand-table '>
                        <div className='flex w-11/12 m-auto '>
                            <p className='pt-2 pb-2 font-museo text-2xl text-brand-gray-typo'>{item.tab}</p>
                        </div>
                        <div className='flex pr-4'>
                           <FaAngleRight
                           />

                        </div>
                    </div>    
                    
                </div>
            ))}
               

        </div>

    )
}

export default InvolvedModal
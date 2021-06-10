import React,{useState} from 'react'
import Modal from 'react-modal';
import InvolvedCommitteeSubmitModal from '../InvolvedCommitteeSubmitModal/InvolvedCommitteeSubmitModal';
import InvolvedModal from '../InvolvedModal/InvolvedModal';
import InvolvedSubmitModal from '../InvolvedModalSubmit/InvolvedSubmitModal';


Modal.setAppElement('#__next')

const customStyles = {
    content: {
        position: 'fixed',
        border: '0',
        borderRadius: '4px',  
        width: '1250px',
        padding: '1rem',
        top: '4%',
        margin: '0 auto',
        zIndex: '1000'
    }
  };



const InvolvedCommitteeForm = ({data}) => {

    const [showModal, setShowModal] = useState(false)
    const [showModalSubmit, setShowModalSubmit] = useState(false)

    const openModalSubmit = ()  => {
        setShowModalSubmit(true)
    }
    const closeModalSubmit = () => {
        setShowModalSubmit(false)
    }


    const openModal = ()  => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }



    return(
        <div className= "bg-brand-form-bg1 flex flex-col m-auto w-11/12 justify-center mt-12">
                    <Modal
                        isOpen={showModal}
                        //  onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                   >
           
                    <InvolvedModal 
                        data={data}
                        onClose={closeModal}
                    />
                   </Modal>
                   <Modal
                        isOpen={showModalSubmit}
                        //  onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalSubmit}
                        style={customStyles}
                        contentLabel="Example Modal"
                   >
           
                    <InvolvedCommitteeSubmitModal 
                        data={data}
                        onClose={closeModalSubmit}
                    />
                   </Modal>
                 

            <div className='flex flex-col w-11/12 m-auto bg-brand-form-bg2 mt-12 pt-8'>
                    <div className='flex justify-center'>
                        <p className='font-museo text-lg text-brand-gray-typo'>{data.form2Heading}</p>
                    </div>

                    <div className='flex flex-row m-auto '>
                                <form className="rounded grid  grid-cols-2 gap-4 px-8 pt-8 pb-8 mb-4">

                                    {data.form2Fields.map((item) => (
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
                            <input type="checkbox" className="form-checkbox"/>
                            <span className="ml-2 font-nova text-brand-gray-typo text-sm">{item.labelAndValue}</span>
                        </label>
                        ))}
                        
                    </div>

                    <div className='w-3/4 m-auto bg-brand-form-bg-footer mt-12 flex flex-col items-center justify-center'>
                            <div className='w-3/4 m-auto mt-4'>
                                <p className=' pb-4 font-nova text-brand-gray-typo text-base'>{data.form2FooterText}</p>
                            </div>

                    </div>
                    <div className='flex m-auto mt-12 mb-12'>
                        <button onClick={openModalSubmit} class="w-48 bg-brand-blue font-nova text-base m-auto text-white font-bold py-2 px-4 rounded">
                          {data.form1SubmitButtonText}
                        </button>
                    </div>
             </div>

        </div>
    )
}

export default InvolvedCommitteeForm
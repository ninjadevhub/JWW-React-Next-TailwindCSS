import React,{useState} from "react";
import Link from 'next/link';
import AboutTab from "./AboutTabs/AboutTab";
import Goals from "./AboutTabs/Goals";
import History from "./AboutTabs/History";
import Leaders from "./AboutTabs/Leaders";
import Members from "./AboutTabs/Members";
import Backbone from "./AboutTabs/Backbone";

import Modal from 'react-modal';
import ModalEquity from "./ModalEquity/ModalEquity";


const tabs = {
    about: 'About',
    goals: 'Goals',
    theCollaborative: 'The Collaborative',
    history:'History',
    members:"Members",
    leaders:'Leaders',
    backbone:"Backbone"
}


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
        zIndex: '1000',
        overflow: 'visible'
    }
};


const AboutJerseyWater = ({data, dataLeadersSteering, activeTab}) => {

    const [showModal, setShowModal] = useState(false)

    const openModal = ()  => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
  
    return(
        <div className='flex flex-col'>
            <Modal 
                isOpen={showModal}
                //onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {<ModalEquity 
                    data={data}
                    onClose={closeModal}
                />}
            </Modal>
            
            <div className="flex flex-col jutify-center items-center" 
                style={{backgroundImage:`url(${data?.headerImage?.sourceUrl})`,
                    width:'100%',
                    height:'325px',
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover'
                }}
            >
                <div className='flex flex-col border-b-4 border-brand-blue justify-center items-center bg-white w-1/2 m-auto'>
                    <div>
                        <p className="pt-6 font-museo text-brand-gray-typo text-base text-3xl">{data.headerTitle}</p>
                    </div>
                    <div>
                        <p className='pr-4 pl-4 pt-8 font-nova text-brand-gray-typo text-lg'>{data.headerText}</p>
                    </div>
                    <div className='-mb-6'>
                        <button onClick={openModal}  class="w-48 pt-4 bg-brand-blue font-nova text-base m-auto text-base text-white font-bold py-2 px-4 rounded">
                            {data.headerButtonText}
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-row justify-around items-center bg-brand-gray h-12 w-full font-nova text-base'>
                <div>
                    <Link href="/about/">
                        <a className='cursor-pointer'>ABOUT</a>
                    </Link>
                </div>
                <div>
                    <Link href="/about/goals/">
                        <a className='cursor-pointer'>GOALS</a>
                    </Link>
                </div>
                <div>
                    <Link href="/about/the-collaborative/">
                        <a className='cursor-pointer'>THE COLLABORATIVE</a>
                    </Link>
                </div>
                <div>
                    <Link href="/about/history/">
                        <a className='cursor-pointer'>HISTORY</a>
                    </Link>
                </div>
                <div>
                    <Link href="/about/members/">
                        <a className='cursor-pointer'>MEMBERS</a>
                    </Link>
                </div>
                <div>
                    <Link href="/about/leaders/">
                        <a className='cursor-pointer'>LEADERS</a>
                    </Link>
                </div>
                <div>
                    <Link href="/about/backbone-staff/">
                        <a className='cursor-pointer'>BACKBONE STAFF</a>
                    </Link>
                </div>
            </div>

            {activeTab === tabs.about && <AboutTab data={data}/>}
            {activeTab === tabs.goals && <Goals data={data} /> }
            {activeTab === tabs.history && <History data={dataLeadersSteering} />}
            {activeTab === tabs.members && <Members data={data} />}
            {activeTab === tabs.leaders && <Leaders data={data} dataLeadersSteering={dataLeadersSteering} />}
            {activeTab === tabs.backbone && <Backbone data={data}  dataLeadersSteering={dataLeadersSteering} />}

        </div>
    )
}


export default AboutJerseyWater
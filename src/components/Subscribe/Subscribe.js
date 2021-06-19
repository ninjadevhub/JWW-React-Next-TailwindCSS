import * as React from "react"

const SubscribeIcon = (props) => {
  return (
    <svg
      height={24}
      viewBox="0 0 512 512"
      width={50}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M504.32 162.519L421 106.972V85c0-8.284-6.716-15-15-15h-40.459L264.32 2.519a15 15 0 00-16.641 0L146.459 70H106c-8.284 0-15 6.716-15 15v21.973L7.68 162.52A14.996 14.996 0 001 175v260c0 8.284 6.716 15 15 15h191.827l35.569 55.132c5.908 9.158 19.301 9.158 25.209 0L304.174 450H496c8.284 0 15-6.716 15-15V175c0-5.015-2.507-9.699-6.68-12.481zM287.494 305L481 200.184v209.631zm179.469-131.331L421 198.565v-55.538zM256 33.027L311.459 70H200.541zM391 100v114.816L256 287.94l-135-73.125V100zM91 198.565l-45.963-24.897L91 143.027zM296 420a15 15 0 00-12.604 6.868L256 469.331l-27.396-42.463A14.998 14.998 0 00216 420H31V200.184L436.813 420z" fill='#fff'/>
    </svg>
  )
}

const Subscribe = () => {
  return (
    <button
      type="button"
      className="fixed left-0 top-52 z-50 border-none bg-brand-green rounded-r-lg pl-1 pr-1.5 py-2.5"
    >
      <SubscribeIcon />
      <span className="text-white block mt-0.5" style={{fontSize: '10px'}}>SUBSCRIBE</span>
    </button>
  )
 
}

export default Subscribe
import React from 'react'

const Logo = ({size}:{ size?:number}) => {
  return (
    <div className='logo p-1'>
        <div className="logo-items flex items-center">
            <div className="logo-img">
                <img width={size|| 45} src="https://medial.app/image/medial-purple-logo.png" alt="logo" />
            </div>
    
        </div>
    </div>
  )
}

export default Logo
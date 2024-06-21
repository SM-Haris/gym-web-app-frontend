import { MailOutlined, MobileOutlined, PushpinOutlined } from '@ant-design/icons'
import React from 'react'
import ContactComponent from './contactComponent'

const Footer: React.FC = () => {
  return (
      <div className='footer'>
        <div className='contact-div'>
          <ContactComponent text='333 Middle Winchendon Rd, Rindge, NH 03461' icon={<PushpinOutlined className='contact-icon'/>}/>
          <ContactComponent text='+92 333 1900996' icon={<MobileOutlined className='contact-icon'/>}/>
          <ContactComponent text='dev.muhammad.haris@gmail.com' icon={<MailOutlined className='contact-icon'/>}/>
        </div>
        <div className='footer-details'>
          <div className='footer-gym-details'>
            <h3>GYM UP</h3>
            <p>Simplify member management, boost attendance, and gain valuable revenue insights. Run your gym smarter, not harder, with our all-in-one gym management solution.</p>
            <div>
              
            </div>
          </div>
          <div className='footer-support'>
            <h4>Support</h4>
              <h6 style={{margin:'5px 10px 0 0px'}}>Login</h6>
              <h6 style={{margin:'5px 10px 0 0px'}}>SignUp</h6>
              <h6 style={{margin:'5px 10px 0 0px'}}>Contact Us</h6>
              <h6 style={{margin:'5px 10px 0 0px'}}>Subscription</h6>
          </div>
        </div>
        <div className='copyrights-div' style={{color:'#FFFFFF'}}>
        Copyright ©2024 All rights reserved | Syed Mohammad Haris
        </div>
      </div>
  )
}

export default Footer

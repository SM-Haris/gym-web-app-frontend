import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { message } from 'antd'
import { Props } from '../interfaces/dashboard'
import './style.scss'

message.config({ maxCount: 2 })

function LayoutView({ children }: Props): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default LayoutView

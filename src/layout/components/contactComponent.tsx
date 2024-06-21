export interface ContactComponentProps {
    text: string;
    icon:any
}

const ContactComponent:React.FC<ContactComponentProps>= ({text,icon}) => {
    return (
        <div className='contact-component'>
        {icon}
        <p style={{color:'#FFFFFF'}}>{text}</p>
        </div>
    )
}

export default ContactComponent
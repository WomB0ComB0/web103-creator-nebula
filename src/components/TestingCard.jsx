import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultImage from '../assets/NoImage.jpg';
import { supabase } from '../client';
import Modal from 'react-modal';
import Truncate from './Truncate';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import '@picocss/pico';
const Card = ({name, imageURL, url, description, id, twitter, instagram, youtube}) => {
  const deleteCreator = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id) 
        if (error) console.log(error);
        window.location = "/"
    }
  const goToYouTube = () => {
    window.open(`https://www.youtube.com/${youtube}`, '_blank');
  };
  const goToTwitter = () => {
    window.open(`https://www.twitter.com/${twitter}`, '_blank');
  };
  const goToInstagram = () => {
    window.open(`https://www.instagram.com/${instagram}`, '_blank');
  };
  const socialsArray = [
      { text: 'YouTube', icon: 'fa-brands fa-youtube', onClick: goToYouTube, youtube, link: `https://www.youtube.com/${youtube}` },
      { text: 'Twitter', icon: 'fa-brands fa-twitter', onClick: goToTwitter, twitter, link: `https://www.twitter.com/${twitter}`  },
      { text: 'Instagram', icon: 'fa-brands fa-instagram', onClick: goToInstagram, instagram, link: `https://www.instagram.com/${instagram}` },
    ];
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = (text) => {
    copyToClipboard(text);
  };
  Modal.setAppElement('#root');
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => { setIsOpen(true); };
  const afterOpenModal = () => {};
  const closeModal = () => { setIsOpen(false); };
  const Buttons = () => {
    const buttonsArray = [
      { text: 'Edit', icon: 'fa-solid fa-pen', link: `/edit/${id}/${name}}` },
      { text: 'Delete', icon: 'fa-solid fa-trash', onClick: deleteCreator },
      { text: 'More', icon: 'fa-solid fa-circle-info', onClick: openModal },
    ];
    return (
      <>
      <div style={{display:"flex", gap:"20px",}}>
      {buttonsArray.map((button) => (
          <div key={button.text} className={`card-icons ${button.text === 'Delete' ? 'hover' : ''}`}>
              {button.link ? (
              <Link to={button.link} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-tooltip={button.text}>
                <FontAwesomeIcon style={{ cursor: 'pointer', marginRight: '13px' }} icon={button.icon} />
              </Link>
            ) : (
              <Link onClick={button.onClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-tooltip={button.text}>
                <FontAwesomeIcon style={{ cursor: 'pointer', marginRight: '13px' }} icon={button.icon} />
              </Link>
            )}
          </div>
        ))}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Creator Modal"
          style={ModalStyles}
        >
          <article>
            <div 
              style={{display:"flex",gap:"20px"}}>
              <img src={imageURL ? imageURL : defaultImage} alt={name} style={{ borderRadius: '12px', height: '200px', width: '200px'}} />
              <div style={{display:"flex",flexDirection:"column"}}>
                <h1 style={{marginBottom:"1px"}}>{name}</h1>
                <Link  to={url}  target={`_blank`}  rel={`noopener noreferrer`} style={{marginBottom:"9px"}}>{url}</Link>
              <>
              {socialsArray.map((social) => (
                social.youtube || social.twitter || social.instagram ? (
                  <div key={social.text} style={{width:"100%", backgroundColor:"transparent", marginBottom:"5px",height:"30px",justifyContent:"space-between",borderRadius:"6px",display:"flex", alignItems:"center",}}>
                    <FontAwesomeIcon style={{ cursor: 'pointer', marginLeft: '13px', marginRight:"10px" }} icon={social.icon} size={`lg`} />
                    <Link onClick={social.onClick}  data-tooltip={social.text} rel={`noopener noreferrer`} style={{fontWeight:"bold",marginRight:"auto",textDecoration:"none"}} >
                        {'@' + social.link
                          .replace(/(^\w+:|^)\/\//, '')
                          .replace(/\/$/, '')
                          .replace(/www./, '')
                          .replace(/@/g,'')
                          .replace(/youtube.com\//, '')
                          .replace(/twitter.com\//, '')
                          .replace(/instagram.com\//, '')}
                    </Link>
                    <FontAwesomeIcon icon={`fa-solid fa-clipboard`} color={`${isCopied ? 'red' : ''}`} onClick={() => {handleCopyToClipboard(social.link); }} style={{marginRight:"10px",textDecoration:"none",cursor:"pointer"}} title='Copy to clipboard'/>
                  </div>) : null ))}
                </>
              </div>
            </div>
            <p style={{marginTop:"10px", width:""}}>
              <Truncate maxLength={200}>
                {description}
              </Truncate>
            </p>
            <button onClick={closeModal} style={{marginBottom:"0",marginTop:"10px"}}>close</button>
          </article>
        </Modal>
      </div>
    </>
    )
  }
  return (
    <>
      <article className='card-container'   style={{ height:  "100px", paddingBlock: "0",  display: "flex", flexDirection:  "row", justifyContent:   "space-between", paddingInline:   "14px", alignItems: "center"}}>
        <div style={{ display: "flex",  justifyContent:"center",   alignItems:"center",width:""}}>
          <img src={imageURL ? imageURL :   defaultImage} alt={name} style= {{ borderRadius: "10%",  height:"75px",width:"75px" }} />
          <div style={{gap:"5px",display:"flex", flexDirection:"column"}}>
            <h3 style={{ fontSize: "23px",  marginBottom:"0", marginLeft:"15px" }}>
              <Link to={url !== null  &&  url !== ''? url : "/"} target={`_blank`}>{name}  </Link>
            </h3>
            <>
            <ul style={{ justifyContent: "space-between", display: "flex",marginBottom:"0"}} >
              {socialsArray.map((social) => (
                social.youtube || social.twitter || social.instagram ? (
                  <Link onClick={social.onClick} key={social.text} data-tooltip={social.text} data-placement="bottom" rel={`noopener noreferrer`}>
                    <FontAwesomeIcon style={{ cursor: 'pointer', marginRight: '13px' }} icon={social.icon} size={`xl`} />
                  </Link>) : null))}
            </ul>
            </>
          </div>
        </div>
        <Buttons />
      </article>
    </>
  )
}
Card.propTypes = {
  name: PropTypes.string.isRequired,
  youtube: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageURL: PropTypes.string,
  url: PropTypes.string,
};
const ModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        borderRadius: '15px',
        padding: '0',
        border: 'none',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        minWidth:"270px",
        maxWidth: '800px',
        marginInline: 'auto',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};
export default Card
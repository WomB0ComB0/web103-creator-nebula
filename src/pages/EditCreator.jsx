/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import Modal from 'react-modal';
import '@picocss/pico';
import axios from 'axios';
Modal.setAppElement('#root');
const EditCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState({
    id: null,
    name: '',
    youtube: '',
    twitter: '',
    instagram: '',
    description: '',
    imageURL: '',
    url: '',
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => { setIsOpen(true); };
  // Finish this later
  const afterOpenModal = () => {};
  const closeModal = () => { setIsOpen(false); };
  const [channelName, setChannelName] = useState('');
  const getChannelName =  useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels`,
        {
          params: {
            part: 'snippet',
            id: creator.youtube,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
        }
      );
     const channel = response.data.items[0].snippet;
      setChannelName(channel.title);
    } catch (error) {
      console.error('Error fetching channel name:', error);
    }
  }, [creator.youtube]);
  useEffect(() => {
    const fetchCreatorData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setCreator(data);
      }
      await getChannelName();
    };
    fetchCreatorData();
  }, [id, getChannelName]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateCreator = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        youtube: creator.youtube,
        twitter: creator.twitter,
        instagram: creator.instagram,
        description: creator.description,
        imageURL: creator.imageURL,
        url: creator.url,
      })
      .eq('id', id);
    if (error) console.log(error);
    window.location = '/';
  };
  const deleteCreator = async (event) => {
    event.preventDefault();
    const { error } = await supabase
    .from('creators')
    .delete()
    .eq('id', id);
    if (error) {
      console.log(error);
    }
    window.location = '/';
  };

  return (
    <div>
      <form>
        <label>Name</label>
        <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />

        <label>
          Website
          <p>Provide a link to the creator's website. Be sure to include the http://</p>
        </label>
        <input type="url" id="url" name="url" value={creator.url} onChange={handleChange} required />

        <label>
          Image
          <p>Provide a link to an image of your creator. Be sure to include the http://</p>
        </label>
        <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} onChange={handleChange} required />

        <label>
          Description
          <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
        </label>
        <textarea name="description" rows="3" cols="50" id="description" value={creator.description} onChange={handleChange} required maxLength={500}/>
        <p>Characters remaining: {500 - creator.description.length}</p>

        <h3>Social Media Links</h3>
        <p>Provide at least one of the creator's social media links.</p>

        <label>
          <span className="fa-brands fa-youtube"></span> YouTube
          <p>The creator's YouTube handle (without the @)</p>
        </label>
        <input type="text" id="youtube" name="youtube" value={creator.youtube} onChange={handleChange} />
        <p>Channel Name: {channelName}</p>
        <label>
          <span className="fa-brands fa-twitter"></span> Twitter
          <p>The creator's Twitter handle (without the @)</p>
        </label>
        <input type="text" id="twitter" name="twitter" value={creator.twitter} onChange={handleChange} />

        <label>
          <span className="fa-brands fa-instagram"></span> Instagram
          <p>The creator's Instagram handle (without the @)</p>
        </label>
        <input type="text" id="instagram" name="instagram" value={creator.instagram} onChange={handleChange} />
      </form>

      <div className="submit-or-delete">
        <button type="submit" onClick={updateCreator}>
          Submit
        </button>
        <button onClick={openModal}>
          Delete
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={ModalStyles}
        contentLabel="Delete Creator Modal"
      >
        <article style={{width:"100%",height:"100%",margin:"0"}}>
            <Link to={`/edit/${id}`} data-target="delete-button" onClick={closeModal} style={{right:"10px", position:"absolute", top:"10px"}}>
                <span role="img" aria-label="Close">❌</span>
            </Link>
            <h2 style={{}}>
                <span role="img" aria-label="Warning">⚠️</span>{' '}WAIT!!!!{' '}
                <span role="img" aria-label="Warning">⚠️</span>
            </h2>
            <p>Are you sure you want to delete {creator.name}???</p>
            <footer>
                <button onClick={closeModal} data-target="delete-button">Nah, never mind</button>
                <button data-target="delete-button" onClick={()=> {deleteCreator(); closeModal()}}>YES! Totally sure</button>
            </footer>
        </article>
      </Modal>
    </div>
  );
};
const ModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        borderRadius: '10px',
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
export default EditCreator;
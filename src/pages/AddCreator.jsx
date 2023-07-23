/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useParams } from 'react-router-dom'
import axios from 'axios';
const AddCreator = () => {
    const { id } = useParams();
  const [creator, setCreator] = useState({
    name: '',
    youtube: '',
    twitter: '',
    instagram: '',
    description: '',
    imageURL: '',
    url: '',
  });
    const [channelName, setChannelName] = useState('');
    const getChannelName = async () => {
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
  };
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
  }, [id]);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCreator( (prev) => { return { ...prev, [name]:value, } })
    }
    const addCreator = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('creators').insert([creator]);
      if (error) {
        console.log(error);
      } else {
        console.log('Creator added successfully: ', data);
        window.location = '/';
      }
    } catch (error) {
      console.log('Error adding creator:', error);
    }
  };
    return (
        <>

            <form id="addCreatorForm" autoComplete='on'>
                <label>Name
                    <p>Provide the creator's name/pseudonym/stage-name</p>
                </label>
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />
                <label>Website
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
                <textarea name="description" rows="3" cols="50" id="description" value={creator.description} onChange={handleChange} required maxLength={500} placeholder={`Enter description hre...`}/>
        <p>Characters remaining: {500 - creator.description.length}</p>

                <h3>Social Media Links</h3>
                <p>Provide at least one of the creator's social media links.</p>

                <label>
                    <span className="fa-brands fa-youtube"></span> YouTube
                    <p>The creator's YouTube handle (without the @)</p>
                </label>
                <input type="text" id="youtube" name="youtube" value ={creator.youtube.replace(/@/g,'')} onChange={handleChange} />
                <p>Channel Name: {channelName}</p>

                <label>
                    <span className="fa-brands fa-twitter"></span> Twitter
                    <p>The creator's Twitter handle (without the @)</p>
                </label>
                <input type="text" id="twitter" name="twitter" value ={creator.twitter.replace(/@/g,'')} onChange={handleChange} />

                <label>
                    <span className="fa-brands fa-instagram"></span> Instagram
                    <p>The creator's Instagram handle (without the @)</p>
                </label>
                <input type="text" id="instagram" name="instagram" value ={creator.instagram.replace(/@/g,'')} onChange={handleChange} />

                <button type="submit" onClick={addCreator}>Submit</button>
            </form>

        </>
    )
}
export default AddCreator
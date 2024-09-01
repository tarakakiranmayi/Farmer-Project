import React, { useEffect } from 'react';
import '../profile/Profile.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
  let data = useSelector((state) => state.userFarmer);
  //(data);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      setFormData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (data.currentUser.photoAdded) {
      async function fetchUserPhoto() {
        try {
          let res = await axios.get(`http://localhost:3030/userapi/user/${data.currentUser._id}`);
          const base64Image = res.data.photo;
          //(base64Image)
          setImageData(`data:image/jpeg;base64,${base64Image}`);
          setImage(true);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
      fetchUserPhoto();
    }
  }, [data.currentUser.photoAdded, data.currentUser._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append('image', file);
      Object.keys(formData).forEach((key) => {
        formDataWithFile.append(key, data[key]);
      });

      const response = await axios.put(
        `http://localhost:3030/userapi/userUpdate/${data.currentUser.email}`,
        formDataWithFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.message === 'User profile updated successfully' && response.data.user.photo) {
        const base64Image = response.data.image;
        setImageData(`data:image/jpeg;base64,${base64Image}`);
        setImage(true);
      }
    } catch (error) {
      console.error('Error uploading product image:', error);
    }
  };

  return (
    <div className="profile-overlay" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'absolute', top: '150px', alignItems: 'center', justifyContent: 'center', maxWidth: '400px' }}>
        <div className="card" style={{ backgroundColor: 'white', minWidth: '360px' }}>
          <div className="card-img">
            {!image && (
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  <img
                    className="mx-auto d-block"
                    src="https://global.discourse-cdn.com/bubble/original/3X/1/2/12e944afd917d123319c9074a7e72581785a3b38.png"
                    alt=""
                    style={{ borderRadius: '50%' }}
                    width="120px"
                  />
                  <label>Upload Image:</label>
                  <input type="file" name="image" onChange={handleFileChange} required />
                  <button type="submit" className="mx-auto d-block">Upload Image</button>
                </div>
              </form>
            )}
          </div>
          {image && <img className="mx-auto d-block" src={imageData} alt="" width="120px" style={{ backgroundColor: 'white', borderRadius: '50%' }} />}
          <div className="card-body text-center">
            <h6>{data.currentUser.name}</h6>
            <h6>{data.currentUser.contact_number}</h6>
            <h6>{data.currentUser.address}</h6>
            <h6>{data.currentUser.email}</h6>
            <p>About</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

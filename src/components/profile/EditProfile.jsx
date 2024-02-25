import Profile from '../../assets/images/profile.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Topnav from '../layout/Topnav';
import moment from 'moment';
import AvatarEditor from 'react-avatar-editor';

export default function EditProfile() {
  const [myUser, setMyUser] = useState({});
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    gradeLevel: '',
    phoneNumber: '',
    birthdate: '',
    gender: '',
    profileImage: null,
  });
  const fileInputRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  
  // const handleUploadImage = () => {
    //   fileInputRef.current.click();
    // };
    
    const handleImageClick = () => {
      fileInputRef.current.click();
    };
    
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setFormValue({
        ...formValue,
        profileImage: file,
      });

      setIsEditingImage(true);
    }
  };

  const handleSaveImage = () => {
    if (editor) {
      const canvas = editor.getImage();
      canvas.toBlob((blob) => {
        setIsEditingImage(false);

        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          saveProfileImageToLocalStorage(imageUrl);
          setProfileImageUrl(imageUrl);
        };
        reader.readAsDataURL(blob);
        
        setFormValue({
          ...formValue,
          profileImage: blob,
        });
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/profile`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        );
        
        setMyUser(response.data.user);
        setFormValue(response.data.user);
        
        const userProfileImage = response.data.user.profileImage;
        
        if (userProfileImage) {
          setProfileImageUrl(`http://localhost:5000/static/${userProfileImage}`);
        } else {
          setProfileImageUrl(null);
        }
      } catch (error) {
        seterror(error.message);
        console.error('Error getting user profile:', error);
      }
    };
    
  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    fetchData();
    const storedImageUrl = getProfileImageFromLocalStorage();
    if (storedImageUrl) {
      setProfileImageUrl(storedImageUrl);
    }
    return () => {};
  }, []);

  const getInputValue = (e) => {
    if (e.target.name === 'profileImage') {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.files[0],
      });
      setIsEditingImage(true);
    } else if (e.target.name === 'birthdate') {
      setFormValue({
        ...formValue,
        [e.target.name]: moment(e.target.value).format(
          'YYYY-MM-DDTHH:mm:ss.SSSZ'
        ),
      });
    } else {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    }
  };
  
  const saveProfileImageToLocalStorage = (imageUrl) => {
    localStorage.setItem('profileImageUrl', imageUrl);
  };
  
  const getProfileImageFromLocalStorage = () => {
    return localStorage.getItem('profileImageUrl');
  };
  
  useEffect(() => {
    if (formValue.profileImage) {
      if (
        formValue.profileImage instanceof File ||
        formValue.profileImage instanceof Blob
        ) {
          const reader = new FileReader();
          reader.onload = () => {
            setProfileImageUrl(reader.result);
          };
          reader.readAsDataURL(formValue.profileImage);
        } else {
          // Assuming that the profileImage is a string (URL)
          setProfileImageUrl(formValue.profileImage);
        }
      } else {
        setProfileImageUrl(null);
      }
    }, [formValue.profileImage]);

    const formOperation = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
      
      for (const key in formValue) {
        if (key === 'birthdate' || key === 'profileImage') {
          formData.append(key, formValue[key] === '' ? null : formValue[key]);
        } else {
          formData.append(key, formValue[key]);
        }
      }
      
      try {
        await axios.put('http://localhost:5000/api/v1/users/profile', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate(`/dashboard/profile`);
      console.log(myUser, error);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <Topnav />
      <div className='rounded-4 Scroller'>
        <div className='m-auto col-md-10'>
          <form
            onSubmit={formOperation}
            className='form bg-light rounded-4 px-5 py-4 col-md-10'
            encType='multipart/form-data'
          >
            <div className='formLogo d-flex justify-content-center align-items-center my-5 text-center'>
              {isEditingImage && (
                <div className='avatar-container'>
                  <AvatarEditor
                    ref={(editor) => setEditor(editor)}
                    image={formValue.profileImage || ''}
                    width={150}
                    height={150}
                    border={50}
                    borderRadius={75}
                    color={[255, 255, 255, 0.6]}
                    scale={1.2}
                    rotate={0}
                  />
                </div>
              )}
              {!isEditingImage && (
                <>
                  <img
                    src={profileImageUrl || Profile}
                    alt='Profile'
                    className='rounded-circle profile-image'
                    width={150}
                    height={150}
                    onClick={handleImageClick}
                  />
                  <input
                    id='profileImage'
                    type='file'
                    ref={fileInputRef}
                    className='form-control p-3 rounded-4'
                    name='profileImage'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </>
              )}
              {isEditingImage && (
                <button type='button' onClick={handleSaveImage}>
                  Save Image
                </button>
              )}
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='firstName mb-3'>
                  <label htmlFor='firstName' className='form-label'>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='form-control p-3 rounded-4 '
                    id='firstName'
                    name='firstName'
                    onChange={getInputValue}
                    value={formValue.firstName}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='lastName mb-3'>
                  <label htmlFor='lastName' className='form-label'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='form-control p-3 rounded-4'
                    id='lastName'
                    name='lastName'
                    onChange={getInputValue}
                    value={formValue.lastName}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='gender mb-3'>
                  <label htmlFor='gender' className='form-label'>
                    Gender
                  </label>
                  <select
                    className='form-select p-3 rounded-4'
                    name='gender'
                    onChange={getInputValue}
                    value={formValue.gender}
                  >
                    <option value='0'>Select your gender</option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                  </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='birthdate mb-3'>
                  <label htmlFor='birthdate' className='form-label'>
                    Birthdate
                  </label>
                  <input
                    type='datetime-local'
                    className='form-control p-3 rounded-4 p-3'
                    name='birthdate'
                    onChange={getInputValue}
                    value={moment(formValue.birthdate).format(
                      'YYYY-MM-DDTHH:mm:ss'
                    )}
                  />
                </div>
              </div>

              <div className='phoneNumber mb-3'>
                <label htmlFor='phoneNumber' className='form-label'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  className='form-control p-3 rounded-4'
                  id='phoneNumber'
                  name='phoneNumber'
                  onChange={getInputValue}
                  value={formValue.phoneNumber}
                />
              </div>

              <div className='bio mb-3'>
                <label htmlFor='email' className='form-label'>
                  Bio
                </label>
                <textarea
                  className='form-control p-3 rounded-4'
                  id='bio'
                  name='bio'
                  onChange={getInputValue}
                  value={formValue.bio}
                />
              </div>
              { myUser.role == 'STUDENT' && <div className='gradeLevel mb-3'>
              <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Grade level
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="gradeLevel"
                  onChange={getInputValue}
                  value={formValue.gradeLevel}
                >
                  <option value="">Select your gradeLevel</option>
                  <option value="PRIMARY_ONE">Grade 1</option>
                  <option value="PRIMARY_TWO">Grade 2</option>
                  <option value="PRIMARY_THREE">Grade 3</option>
                  <option value="PRIMARY_FOUR">Grade 4</option>
                  <option value="PRIMARY_FIVE">Grade 5</option>
                  <option value="PRIMARY_SIX">Grade 6</option>
                  <option value="PREP_ONE">Grade 7</option>
                  <option value="PREP_TWO">Grade 8</option>
                  <option value="PREP_THREE">Grade 9</option>
                  <option value="SECONDARY_ONE">Grade 10</option>
                  <option value="SECONDARY_TWO">Grade 11</option>
                  <option value="SECONDARY_THREE">Grade 12</option>
                </select>
              </div>}

              <NavLink
                type='submit'
                className='quizButton text-center rounded-4 m-auto p-3 my-4 w-75 fs-5'
              >
                Change Password
              </NavLink>
              <button
                type='submit'
                className='quizButton text-center rounded-4 m-auto p-3 mb-4 w-75 fs-5'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

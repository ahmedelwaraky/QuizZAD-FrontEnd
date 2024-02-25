import Profile from '../../assets/images/profile.png';
import { useContext, useEffect } from 'react';
import '../../assets/css/Profile.css';
import Topnav from '../layout/Topnav';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Contex/UserContext';

export default function ProfileView() {
  const { fetchUserProfile , myUser ,imageURL} = useContext( UserContext )

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <div>
        <Topnav />
      </div>
      <section className='profile-view'>
        <div className='container '>
          <div className='view-card bg-light rounded-5'>
            <h1 className='text-center pt-5 fw-bold '>View Profile</h1>
            <div className='row'>
              <div className='col-md-5 py-5'>
                <div className='profile-img  d-flex justify-content-center align-items-center rounded-circle'>
                  <img
                    src={imageURL || Profile}
                    className='rounded-circle'
                    alt=''
                  />
                </div>
                <div className='profile-name my-4  text-center'>
                  <h2 className='h5'>
                    {myUser.firstName} {myUser.lastName}
                  </h2>
                </div>
                <div className='formBtn col-4 text-center m-auto rounded-5 w-50 profile-view-btn'>
                  <NavLink
                    type='submit'
                    className='nav-link w-100 py-2 text-white fs-bold'
                    to='./edit'
                  >
                    Edit Profile
                  </NavLink>
                </div>
              </div>
              <div className='col-md-7 p-5'>
                <div className='d-flex my-4'>
                  <i
                    className='fa fa-solid fa-user fs-3 me-2'
                    style={{ color: '#89288F' }}
                  />
                  <p>Bio : {myUser.bio}</p>
                </div>
                <div className='d-flex my-4'>
                  <i
                    className='fa fa-solid fa-cake-candles fs-3 me-2'
                    style={{ color: '#89288F' }}
                  />
                  <p>
                    BirthDate :{' '}
                    {new Date(myUser.birthdate).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div className='d-flex my-4'>
                  <i
                    className='fa fa-brands fa-artstation fs-3 me-2'
                    style={{ color: '#89288F' }}
                  />
                   {myUser.role != 'STUDENT' &&<p> Specialization : {myUser.specialization}</p>}
                   {myUser.role == 'STUDENT' &&<p> Grade Level : {myUser.gradeLevel}</p>}
                </div>
                <div className='d-flex my-4'>
                  <i
                    className='fa fa-solid fa-phone fs-3 me-2'
                    style={{ color: '#89288F' }}
                  />
                  <p>Phone Number : {myUser.phoneNumber}</p>
                </div>
                <div className='d-flex my-4'>
                  <i
                    className='fa fa-solid fa-envelope fs-3 me-2'
                    style={{ color: '#89288F' }}
                  />
                  <p>Email : {myUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

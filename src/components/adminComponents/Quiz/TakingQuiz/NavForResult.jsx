import '../../../../assets/css/quiz.css';
import vector from '../../../../assets/images/teacher.png';
import logo from '../../../../assets/images/logo.png';
import PropTypes from 'prop-types';

function NavForResult({quizName}) {
  return (
    <div>
        <nav className="navbar mx-4 px-4" id='navForResult'>
        <div className="d-flex justify-content-between w-100">
            <div className='d-flex w-100 '>

            <img src={logo} alt="" width={"55rem"} height={"49rem"} className='pt-1 ms-1'/>
          <h1 className="navbar-brand text-light fs-4 mt-2 mx-auto px-4 fw-bold">{quizName}</h1>            
            </div>
            <div className="student text-center mt-1">
              <img className='profileImage' src={vector} alt="student" />
            </div>
          </div>        
      </nav>
    </div>
  )
}
NavForResult.propTypes = {
   
  quizName:PropTypes.string.isRequired

};
export default NavForResult
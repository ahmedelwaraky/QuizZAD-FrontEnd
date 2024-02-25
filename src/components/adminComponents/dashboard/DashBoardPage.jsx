import { useContext, useEffect, useState } from 'react';
import WelcomeSide from '../../layout/WelcomeSide';
import MiniDash from '../../layout/MiniDash';
import Topnav from '../../layout/Topnav';
import backgroundImage from '../../../assets/images/college-students-bro.svg';
import { UserContext } from '../../../Contex/UserContext';
import { TeacherUsersContex } from '../../../Contex/TeacherUsersContex';
import { StudentUsersContex } from '../../../Contex/StudentUsersContex';
import { ClassContext } from '../../../Contex/ClassContex';
import { QuizContext } from '../../../Contex/QuizContext';

export default function DashBoardPage() {
  const [myClass , setMyClass ] = useState({})
  const [quiz, setQuiz] = useState([]);
  const { myUser , fetchUserProfile , fetchAllUsers } = useContext(UserContext);
  const { TeacherUsers , fetchTeacherData } = useContext(TeacherUsersContex);
  const { StudentUsers , fetchStudentData} = useContext(StudentUsersContex);
  const { getAllClasses , myClasses} = useContext(ClassContext);
  const { getAllQuizzes , getMyQuiz} = useContext(QuizContext)
  
  const classQuiz = async () => {
    try {
      
      let classResponse ;
      let quizResponse ;
      if(myUser.role == 'ADMIN'){
        classResponse = await getAllClasses()
        quizResponse = await getAllQuizzes()

      } else {
        classResponse = await myClasses()
        quizResponse = await getMyQuiz()
      }
      setMyClass(classResponse.data);
      setQuiz(quizResponse.data.quizzes);

    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() =>{
    fetchUserProfile()
    classQuiz()
    if (myUser.role === 'ADMIN') {
      fetchTeacherData()
      fetchStudentData()
      fetchAllUsers()
  }},[])

  return (
    <div>
      <section>
        <Topnav />
        <WelcomeSide />
        <div className='d-flex me-0 flex-wrap justify-content-around px-2'>
          {myUser.role == 'ADMIN' && ( <div className='col-md-4'>
            <MiniDash
              icon={'fa-solid fa-graduation-cap fs-3 ms-2'}
              name={'Student'}
              number={StudentUsers.length}
            ></MiniDash>
          </div>)}
          {myUser.role == 'ADMIN' && (<div className='col-md-4'>
            <MiniDash
              icon={'fa-solid fa-person-chalkboard fs-3 ms-2'}
              name={'Teacher'}
              number={TeacherUsers.length}
            ></MiniDash>
          </div> )}
          <div className='col-md-4'>
            <MiniDash
              icon={'fa-solid fa-vial-virus fs-3 ms-2'}
              name={'Quizzes'}
              number={quiz.length}
            ></MiniDash>
          </div>
          <div className='col-md-4'>
            <MiniDash
              icon={'fa-solid fa-school fs-3 ms-2'}
              name={'Classes'}
              number={myClass.length}
            ></MiniDash>
          </div>
          { myUser?.role == 'ADMIN' && <div className='col-md-4'>
            <MiniDash
              icon={'fa-solid fa-calendar-check fs-3 ms-2'}
              name={'New Requests'}
              number={3}
            ></MiniDash>
          </div>}

          <div className='col-md-10 text-center'>
            <img className='ImageBack' src={backgroundImage} alt='name' />
          </div>
        </div>
      </section>
    </div>
  );
}

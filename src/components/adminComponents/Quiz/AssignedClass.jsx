import { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { ClassContext } from '../../../Contex/ClassContex';
import { gradeLevelMap } from '../../../controls/gradeLevel';
import { QuizContext } from '../../../Contex/QuizContext';
import { UserContext } from '../../../Contex/UserContext';
import toast from 'react-hot-toast';

export function AssignedClass() {
  const { id } = useParams();
  const { getAllClasses , myClasses} = useContext(ClassContext);
  const { quizToClass , quizOutClass, getQuiz } = useContext(QuizContext);
  const { myUser } = useContext(UserContext);
  const [myClass, setMyClass] = useState([]);
  const [myQuiz, setMyQuiz] = useState([]);
  
  const fetchData = async () => {
    try {
      let response ;
      if(myUser.role == 'ADMIN'){
        response = await getAllClasses()
      } else {
        response = await myClasses()
      }
      const quizResponse = await getQuiz(id);
      setMyQuiz(quizResponse.data.quiz);
      setMyClass(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const AssignClass = async (classId) => {
    try {
      await quizToClass(id, classId);
      const quizResponse = await getQuiz(id);
      setMyQuiz(quizResponse.data.quiz);
      toast.success('Quiz assigned to class successfully', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: '#fff',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const deleteClass = async (classId) => {
    try {
      await quizOutClass(id, classId);
      const quizResponse = await getQuiz(id);
      setMyQuiz(quizResponse.data.quiz);
      toast.success('Quiz deleted from class successfully', {
        style: {
        backgroundColor:'#53057B',
         padding: '16px',
         color: 'white',
       },
       iconTheme: {
         primary: 'white',
         secondary: '#53057B',
       },})
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };



  return (
    <div className='m-2 mt-3'>
      <section className='rounded-4 py-4 bg-light Scroller'>
        <div>
          <h1 className='text-center my-4'>Assign Class</h1>
        </div>

        <div className='row p-4'>
          <div className='col-md-6'>
            <div className='teacher'>
              <div className='input-group row'>
                <label
                  htmlFor='className'
                  className='form-label px-3 text-center fs-3'
                >
                  All Classes
                </label>
              </div>
            </div>
            <div>
              <Table hover responsive className='mt-2 userTable'>
                <thead className='custom-thead'>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>grade level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className='userBodyTable'>
                  {myClass.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.className}</td>
                      <td>{gradeLevelMap[data.gradeLevel]}</td>
                      <td>
                        <div className='p-0 pt-1'>
                          <i
                            className='fa-solid fa-plus mx-3 fs-5 text-success border-0'
                            onClick={() => AssignClass(data.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='teacher'>
              <div className='input-group row'>
                <label
                  htmlFor='className'
                  className='form-label px-3 text-center fs-3'
                >
                  Quiz Classes
                </label>
              </div>
            </div>
            <Table hover responsive className='mt-2 userTable'>
              <thead className='custom-thead'>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='userBodyTable'>
                {myQuiz.classes &&
                  myQuiz.classes.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.className}</td>
                      <td>{gradeLevelMap[data.gradeLevel]}</td>
                      <td>
                        <div className='p-0 pt-1'>
                          <i className='fa-solid fa-trash-can mx-3 fs-5 text-danger border-0'
                          onClick={() => deleteClass(data.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className='my-3 m-auto col-md-6'>
          <NavLink
            type='submit'
            className='quizButton text-center rounded-4 p-2 fs-5'
            to={`/dashboard/quiz/${id}`}
          >
            <i className='fa-solid fa-arrow-left me-3' />
            Save Changes
          </NavLink>
        </div>
      </section>
    </div>
  );
}

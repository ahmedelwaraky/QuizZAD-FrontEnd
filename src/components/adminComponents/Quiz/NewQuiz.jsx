import { useContext, useEffect, useState } from "react";
import "../../../assets/css/quiz.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { QuizContext } from "../../../Contex/QuizContext";
import toast from "react-hot-toast";

export function NewQuiz() {
  let { id } = useParams();
  id = parseInt(id) || 0;
  const [myQuiz, setMyQuiz] = useState({});
  const { getQuiz, EditQuiz } = useContext(QuizContext);
  const navigate = useNavigate();

  // Form Operation

  const [formValue, setFormValue] = useState({
    title: "",
    subject: "",
    description: "",
    gradeLevel: "",
    term: "",
    unit: "",
    quizImage: "",
    chapter: "",
    lesson: "",
    passingScore: "",
    difficultyLevel: "",
    quizType: "",
    duration: "",
    deadlineDate: "",
    immediateFeedback: "",
    numOfAllowedAttempts: "",
    isPublic: "",
  });

  useEffect(() => {
    if (id !== 0) {
      const fetchData = async () => {
        try {
          const response = await getQuiz(id);
          setMyQuiz(response.data.quiz);
          setFormValue(response.data.quiz);
        } catch (error) {
          console.log("Error getting quiz by id:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const getInputValue = (e) => {
    if (e.target.name === "quizImage") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.files[0], // Update the file property
      });
    } else if (e.target.name === "deadlineDate") {
      setFormValue({
        ...formValue,
        [e.target.name]: moment(e.target.value).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ",
        ),
      });
    } else {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    }
  };

  const formOperation = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    if (id !== 0) {
      EditQuiz(id, formData)
        .then(() => {
          toast.success('Edit quiz successfully', {
            style: {
              border: '1px solid #53057B',
              padding: '16px',
              color: '#53057B',
            },
            iconTheme: {
              primary: '#53057B',
              secondary: '#FFFAEE',
            },
          });
          navigate(`/dashboard/quiz/${id}`);
        })
        .catch((error) => {
          console.error("Error updating quiz:", error);
        });
    } else {
      axios
        .post("http://localhost:5000/api/v1/quizzes", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const quiz = response.data.quiz;
          toast.success('Create quiz successfully', {
            style: {
              border: '1px solid #53057B',
              padding: '16px',
              color: '#53057B',
            },
            iconTheme: {
              primary: '#53057B',
              secondary: '#FFFAEE',
            },
          });
          if( (quiz.teacherId || quiz.adminId) && quiz.isPublic == false){
              navigate(`/dashboard/quiz/${quiz.id}/class`)
              console.log(myQuiz);
          } else { 
            navigate(`/dashboard/quiz/${quiz.id}`)
          }
        })
        .catch((error) => {
          console.error("Error creating quiz:", error);
        });
    }
  };
  return (
    <div className="m-2 mt-3">
      <section className="rounded-4 py-4 bg-light Scroller">
        <form
          className="mx-2 m-auto rounded-4"
          onSubmit={formOperation}
          encType="multipart/form-data"
        >
          <div className="container p-0">
            <div className="row mb-4">
              <div className="col-md-4 col-xl-10 text-center m-auto p-2 mt-1 rounded-4">
                <h3 className="p-2">Create New Quiz</h3>
              </div>
            </div>
          </div>

          <div className="row ">
            {/*---------------------- quiz details--------------------------*/}
            <div className="col-md-5 mx-auto ">
              <div>
                <h4 className="mb-5 text-center">Quiz Details</h4>
              </div>

              <div className="title mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label px-3 fs-5"
                >
                  Quiz name
                </label>
                <input
                  type="text"
                  className="form-control rounded-4 p-3"
                  id="title" // Ensure that the "id" matches the "htmlFor" in the label
                  name="title"
                  onChange={getInputValue}
                  value={formValue.title}
                />
              </div>

              <div className="subject mb-3">
                <label htmlFor="Subject" className="form-label px-3">
                  Subject
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="subject"
                  onChange={getInputValue}
                  value={formValue.subject}
                >
                  <option value="0">Select your Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div className="description mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Description
                </label>
                <input
                  type="menu"
                  className="form-control rounded-4 p-3"
                  id="description" // Ensure that the "id" matches the "htmlFor" in the label
                  name="description"
                  onChange={getInputValue}
                  value={formValue.description}
                />
              </div>

              <div className="gradeLvl mb-3">
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
              </div>

              <div className="Term mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Term
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="term"
                  onChange={getInputValue}
                  value={formValue.term}
                >
                  <option value="0">Select your Term</option>
                  <option value="FIRST">First term</option>
                  <option value="SECOND">Second term</option>
                </select>
              </div>

              <div className="unit mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Unit
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="unit"
                  onChange={getInputValue}
                  value={formValue.unit}
                >
                  <option value="0">Select your Unit</option>
                  <option value="Unit 1">Unit 1</option>
                  <option value="Unit 2">Unit 2</option>
                  <option value="Unit 3">Unit 3</option>
                  <option value="Unit 4">Unit 4</option>
                </select>
              </div>

              <div className="Chapter mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Chapter
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="chapter"
                  onChange={getInputValue}
                  value={formValue.chapter}
                >
                  <option value="0">Select your Chapter</option>
                  <option value="Chapter 1">Chapter 1</option>
                  <option value="Chapter 2">Chapter 2</option>
                  <option value="Chapter 3">Chapter 3</option>
                  <option value="Chapter 4">Chapter 4</option>
                </select>
              </div>

              <div className="Lesson mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Lesson
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="lesson"
                  onChange={getInputValue}
                  value={formValue.lesson}
                >
                  <option value="0">Select your Lesson</option>
                  <option value="Lesson 1">Lesson 1</option>
                  <option value="Lesson 2">Lesson 2</option>
                  <option value="Lesson 3">Lesson 3</option>
                  <option value="Lesson 4">Lesson 4</option>
                </select>
              </div>
            </div>
            {/*---------------------- quiz spec--------------------------*/}

            <div className="col-md-5 mx-auto">
              <div>
                <h4 className="mb-5 text-center">Quiz Specification</h4>
              </div>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fs-5 px-3"
              >
                Quiz Cover Image
              </label>
              <div className="input-group mb-2">
                <input
                  type="file"
                  className="form-control p-3 rounded-4"
                  name="quizImage"
                  accept="image/*"
                  onChange={getInputValue}
                />
              </div>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fs-5 px-3"
              >
                No. Attempts
              </label>
              <div className="input-group mb-2">
                <input
                  type="number"
                  className="form-control rounded-4 p-3"
                  id="numOfAllowedAttempts" // Ensure that the "id" matches the "htmlFor" in the label
                  name="numOfAllowedAttempts"
                  onChange={getInputValue}
                  value={formValue.numOfAllowedAttempts}
                />
              </div>

              <div className="title mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Passing Score
                </label>
                <input
                  type="number"
                  className="form-control rounded-4 p-3"
                  id="passingScore" // Ensure that the "id" matches the "htmlFor" in the label
                  name="passingScore"
                  onChange={getInputValue}
                  value={formValue.passingScore}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Difficulty level
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="difficultyLevel"
                  onChange={getInputValue}
                  value={formValue.difficultyLevel}
                >
                  <option value="0">Select Difficulty level</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Intermediate</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>

              <div className="Duration mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Quiz duration
                </label>
                <div className="input-group mb-3 d-flex">
                  <input
                    type="number"
                    className="form-control rounded-4 p-3"
                    aria-describedby="button-addon2"
                    placeholder="enter Quiz time in minutes"
                    name="duration"
                    onChange={getInputValue}
                    value={formValue.duration}
                  />
                </div>
              </div>

              <div className="Deadline mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  Quiz deadline date
                </label>
                <input
                  type="datetime-local"
                  className="form-control rounded-4 p-3"
                  name="deadlineDate"
                  onChange={getInputValue}
                  value={moment(formValue.deadlineDate).format(
                    "YYYY-MM-DDTHH:mm:ss",
                  )}
                />
              </div>

              <div className="Privacy mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label px-3">
                  privacy
                </label>
                <select
                  className="form-select rounded-4 p-3"
                  name="isPublic"
                  onChange={getInputValue}
                  value={formValue.isPublic}
                >
                  <option value="0">Select Quiz Privacy</option>
                  <option value={true}>Public</option>
                  <option value={false}>Private class</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-8 m-auto">
            <hr />
          </div>
          <div className="m-3 m-auto col-md-6">
            <button
              type="submit"
              className="quizButton rounded-4 fs-4 p-3 w-100"
            >
              {id == 0 ? "Create New Quiz" : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

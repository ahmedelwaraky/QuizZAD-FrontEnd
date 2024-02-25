import "../../../assets/css/quiz.css";
import "../../../assets/css/class.css";
import { NavLink } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { gradeLevelMap } from "../../../controls/gradeLevel";
import { UserContext } from "../../../Contex/UserContext";
import { QuizContext } from "../../../Contex/QuizContext";
import { getBadgeClass } from "../../../controls/difficultyLevel";
export function PublicQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState([]);
  const { myUser } = useContext(UserContext);
  const { DeleteQuiz, getPublicQuizzes } = useContext(QuizContext);
  
  const fetchData = async () => {
    try {
      const response = await getPublicQuizzes()
      setQuiz(response.data.quizzes);

      const imageName = response.data.quizzes.map(
        (image) => (image.quizImage = `http://localhost:5000/static/${image.quizImage}`),);
      setImageURL(imageName);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-100" style={{marginLeft:"50%"}}>
        <Circles
          height={500}
          width={60}
          color="#89288F"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  const DeleteAction = (quizId) => {
    DeleteQuiz(quizId);

    setQuiz((prevList) => prevList.filter((x) => x.id !== quizId));
    console.log(imageURL);
  };

  return (
    <div className="background rounded-4 m-2">
      <section className="py-1 Scroller">
        <div className="container p-0">
          <div className="row mb-2">
            <div className="col-md-11 text-center m-auto bg-light px-3 rounded-4 mt-2">
              <h3 className="py-2">Explore Public Quizzes</h3>
              <nav className="navbar bg-light py-3 ">
                <div className="container-fluid">
                  <div className="row w-100">
                    <div className="col-md-7">
                      <form className="d-flex">
                        <input
                          className="form-control me-1 rounded-5"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="rounded-5 p-2 searchBtn"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                    <div className="col-md-5">
                      <div className="row">
                        
                        <div className="col-md-4">
                          <div className="dropdown">
                            <button
                              className="btn dropdown-toggle filterBtn"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i
                                className="fa-solid fa-book px-1 fs-6"
                                style={{ color: "#89288F" }}
                              />
                              Subject
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button className="dropdown-item" type="button">
                                  Action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Another action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Something else here
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="dropdown">
                            <button
                              className="btn dropdown-toggle filterBtn"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i
                                className="fa-solid fa-arrow-up-right-dots px-1 fs-6"
                                style={{ color: "#89288F" }}
                              ></i>
                              Difficulty
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button className="dropdown-item" type="button">
                                  Action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Another action
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" type="button">
                                  Something else here
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="quizlist">
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 ">
                {quiz.map((card) => (
                  <div className="col-mb-4 p-2" key={card.id}>
                    <div className="bg-light border p-4 rounded-5">
                      <div className="text-center">
                        <a href="#">
                          <img
                            className="rounded-5 img-fluid shadow"
                            src={card.quizImage}
                            alt="card Image"
                            style={{
                              width: "1000px",
                              height: "140px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      </div>
                      <div className="p-2">
                      <span className={`badge ${getBadgeClass(card?.difficultyLevel)} fw-normal fs-6 rounded-5 fw-bold`}>
                          {card?.difficultyLevel}
                        </span>
                        <h4 className="pt-2" style={{ maxWidth: "100%" }}>
                          {card.title}
                        </h4>
                      </div>
                      <div className="d-flex ">
                        <div>
                          <i
                            className="fa fa-brands fa-artstation fs-5 me-2"
                            style={{ color: "#89288F" }}
                          />
                        </div>
                        <div>
                          <p style={{ maxWidth: "100%" }}>{card.subject}</p>
                        </div>
                      </div>
                      <div className="d-flex spec d-wrap">
                        <div className="d-flex me-3">
                          <div>
                            <i
                              className="fa fa-solid fa-user-graduate fs-5 me-2"
                              style={{ color: "#89288F" }}
                            />{" "}
                          </div>
                          <div>
                            <p className="" style={{ maxWidth: "100%" }}>
                              {gradeLevelMap[card.gradeLevel]}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex ">
                          <div>
                            <i
                              className="fa-solid fa-layer-group fs-5 me-2"
                              style={{ color: "#89288F" }}
                            />
                          </div>
                          <div>
                            <p className="" style={{ maxWidth: "100%" }}>
                              {card.isPublic ? "Public" : "Private"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {myUser.role == "ADMIN" &&
                        <div className="d-flex justify-content-center">
                          <NavLink
                            className="fa fa-solid fa-eye mx-3 fs-3 text-warning"
                            to={`/dashboard/quiz/${card.id}`}
                          />
                          <NavLink
                            className="fa-solid fa-pen-to-square mx-3 fs-3 text-info"
                            to={`/dashboard/quiz/${card.id}/edit`}
                          />
                          <i
                            className="fa-solid fa-trash-can mx-3 fs-3 text-danger"
                            onClick={() => DeleteAction(card.id)}
                          />
                        </div>
                      }
                      {myUser.role != "ADMIN" &&
                        <div className="d-flex">
                          <NavLink
                            className="p-2 rounded-5 quizButton fs-5 text-center"
                            to={`/dashboard/quiz/${card.id}`}
                          >
                            View Quiz
                          </NavLink>
                        </div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

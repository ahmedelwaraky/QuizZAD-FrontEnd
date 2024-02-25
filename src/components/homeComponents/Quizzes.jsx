import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import QuizCard from "./QuizCard";
import "../../assets/css/Home.css";
import a from '../../assets/images/show/1.png'
import b from '../../assets/images/show/2.png'
import c from '../../assets/images/show/3.png'
import d from '../../assets/images/show/4.png'
import e from '../../assets/images/show/5.png'
import f from '../../assets/images/show/6.png'
function Quizzes() {
  return (
    <div id="quizzes" className="smooth-scroll">
      <Container className="d-flex flex-column justify-content-center align-items-center h-100 py-5">
        <Row className="text-center pb-4    ">
          <h1> Explore Our Quizzes</h1>
          <p>
            Quizzes provide an opportunity for real-time engagement and
            interactive learning experiences for all grades
          </p>
        </Row>
        <Row className="justify-content-center align-items-center">
          <QuizCard
            imgSrc={a}
            info={"TRAKE GRADES"}
          />
          <QuizCard
            imgSrc={b}
            info={"MINI EXAM"}
          />
          <QuizCard
            imgSrc={c}
            info={"CREATE QUIZZES"}
          />
          <QuizCard
            imgSrc={d}
            info={"ASSIG QUIZ AT CLASS"}
          />
          <QuizCard
            imgSrc={e}
            info={"TAKE CLASS QUIZ "}
          />
          <QuizCard
            imgSrc={f}
            info={"TRACK STUDENT PROGRESS"}
          />
        </Row>
      </Container>
    </div>
  );
}

export default Quizzes;

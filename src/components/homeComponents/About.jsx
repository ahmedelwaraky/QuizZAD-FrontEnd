import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "../../assets/css/Home.css";

function About() {
  return (
    <section className="about">
      <Container className="h-100 pt-5">
        <Row className="h-100 w-100 flex-column text-center align-items-center ">
          <Col
            lg={8}
            md={12}
            className="d-flex flex-column justify-content-center align-items-center h-100" // Added align-items-center class
          >
            <h1 className="pb-4 text-white" style={{ fontSize: "2.9rem" }}>
              About Us
            </h1>
            <p
              className="pb-4 text-white"
              style={{ fontSize: "1.25rem", }}
            >
              At its core, our Online Examination System is a comprehensive platform designed to streamline the examination process in educational institutions. Whether you are a university managing large-scale exams or a school looking for a user-friendly solution, our system has got you covered.
            </p>
          </Col>
          <Col lg={4} md={0}></Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;

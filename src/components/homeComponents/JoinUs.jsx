import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "../../assets/css/landingPage.css";
function JoinUs() {
  return (
    <div style={{}}>
      <section className="join-us">
        <Container>
          <Row
            style={{
              paddingTop: "5%",
              paddingLeft: "1%",
              color: "white",
            }}
          >
            <Col lg={6} sm={12} id="JoinUsMain">
              <h1 className="text-light" style={{ paddingBottom: "3%" }}>
                Your pathway to smarter learning
              </h1>
              <h3 className="text-light" style={{ paddingBottom: "3%" }}>
                Engage, learn, and grow with our Quizzes platform
              </h3>
              <Col>
                <button
                  className="text-light"
                  style={{
                    borderRadius: "100px",
                    border: "none",
                    padding: "1.8% 4.5%",
                    marginRight: "3% ",
                    marginTop: "2%",
                    backgroundColor: "#872991",
                  }}
                >
                  Test yourself
                </button>
                <button
                  className="text-light"
                  style={{
                    borderRadius: "100px",
                    border: "none",
                    padding: "1.8% 4.5%",
                    backgroundColor: "#872991",
                  }}
                >
                  Join Us Now
                </button>
              </Col>
            </Col>
            <Col lg={6} id="joinUsImg">
              <img
                src="../src/assets/images/lap.png"
                alt="img"
                style={{
                  position: "absolute",
                  bottom: "-4.2rem",
                  right: "1rem",
                  width: "43rem",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default JoinUs;

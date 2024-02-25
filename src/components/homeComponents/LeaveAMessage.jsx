import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

function LeaveAMessage() {
  return (
    <Container className="p-5" id="contactUs">
      <Row className="my-5 text-center">
        <h1>LET’S ANSWER YOUR QUERIES</h1>
      </Row>
      <Row>
        <Col lg={5} className="d-flex flex-column me-5">
          <label className="ms-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            style={{
              borderRadius: "15px",
              border: "1px solid rgba(171, 152, 186, 0.50)",
              background: "#FFF",
              padding: "1.5% 0",
              marginBottom: "3%",
              width: "100%",
            }}
          />
          <label className="ms-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            style={{
              borderRadius: "15px",
              border: "1px solid rgba(171, 152, 186, 0.50)",
              background: "#FFF",
              padding: "1.5% 0",
              marginBottom: "3%",
              width: "100%",
            }}
          />
          <label className="ms-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            style={{
              borderRadius: "15px",
              border: "1px solid rgba(171, 152, 186, 0.50)",
              background: "#FFF",
              padding: "1.5% 0",
              marginBottom: "3%",
              width: "100%",
            }}
          />
        </Col>

        <Col>
          <textarea
            id="message"
            rows="7 "
            placeholder="LEAVE A MESSAGE FOR US"
            style={{
              width: "100%",
              borderRadius: "20px",
              border: " 1px solid rgba(171, 152, 186, 0.50)",
              background: " #FFF",
              padding: "2.1%",
              // marginLeft:"1rem",
              marginTop: "4%",
            }}
          />
        </Col>
      </Row>
      <Row
        lg={4}
        sm={12}
        className="d-flex ms-2 mt-4"
        style={{ paddingRight: "8.5%" }}
      >
        <button
          className="themedButton"
          style={{
            border: "none",
            borderRadius: "100px",
            width: "9rem",
            padding: "1% 0",
          }}
        >
          {" "}
          SUBMIT
        </button>
      </Row>
    </Container>
  );
}

export default LeaveAMessage;

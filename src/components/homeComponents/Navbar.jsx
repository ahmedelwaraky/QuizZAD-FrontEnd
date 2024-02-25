import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import "../../assets/css/Navbar.css";
import PropTypes from "prop-types";

function SmoothScrollLink({ targetId, children }) {
  const handleClick = (e) => {
    e.preventDefault();

    const target = document.querySelector(targetId);
    target.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Link
      href={targetId}
      className="text-decoration-none"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

SmoothScrollLink.propTypes = {
  targetId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function Navbar() {
  return (
    <div>
      <NavBar bg="none" expand="lg" id="navForHome">
        <Container>
          {" "}
          {/*Container */}
          <Row className="w-100">
            <Col lg={2} className="d-flex justify-content-between">
              {" "}
              {/*Logo */}
              <NavBar.Brand>
                <div className="my-2 ms-1">
                  <img src={logo} alt="logo" width={"60px"} />
                </div>
              </NavBar.Brand>
              <NavBar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ border: "none" }}
              />
            </Col>
            <Col style={{ fontSize: "1.3rem", textAlign: "center" }}>
              <NavBar.Collapse>
                <Col lg={8} id="linksForHome">
                  <Nav className="d-flex justify-content-between ps-5">
                    {" "}
                    {/*Links */}
                    <SmoothScrollLink className="text-light" targetId="#home">
                      <div className="text-light">
                      Home
                      </div>
                    </SmoothScrollLink>
                    <SmoothScrollLink className="text-light" targetId="#quizzes">
                      <div className="text-light">
                      Quizzes
                      </div>
                    </SmoothScrollLink>
                    <SmoothScrollLink className="text-light" targetId="#aboutUs">
                    <div className="text-light">
                      About Us
                      </div>
                    </SmoothScrollLink>
                    <SmoothScrollLink className="text-light" targetId="#contactUs">
                    <div className="text-light">
                    Contact Us
                      </div>
                    </SmoothScrollLink>
                  </Nav>
                </Col>
                <Col lg={4} style={{ marginLeft: "2.79rem" }} id="signInLink">
                  {" "}
                  {/*SignIn */}
                  <Link to={"/login"} className="text-decoration-none text-light">
                    Sign in
                  </Link>
                </Col>
              </NavBar.Collapse>
            </Col>
          </Row>
        </Container>
      </NavBar>
    </div>
  );
}

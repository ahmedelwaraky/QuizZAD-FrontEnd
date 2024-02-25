import PropTypes from "prop-types";

function QuizCard({ imgSrc, info }) {
  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
        <div className="port-card card  border-0 shadow-lg  mb-5 bg-body rounded mx-2">
          <div className="port-img">
            <img src={imgSrc} className="card-img-top" alt="work-1" />
          </div>
          <div className=" card-body bg-light  my-3 d-flex justify-content-between b">
            <div className="port-info">
              <h4>{info}</h4>
              <h5>
                <span>QuizZAD </span>/ 5 Sep. 2023
              </h5>
            </div>
            <div className="port-icon border rounded-circle mx-2 d-flex justify-content-center align-items-center">
              <i className="fas fa-plus" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

QuizCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};

export default QuizCard;

import "../assets/css/Notfound.css";

export default function Notfound() {
  return (
    <>
      <div id="notFound" className="text">
        <div>ERROR</div>
        <h1>404</h1>
        <hr />
        <div className="page">Page Not Found</div>
      </div>
      <div className="astronaut">
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className="src"
        />
      </div>
    </>
  );
}

const AboutMe = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">About Me</h1>
              <p className="card-text">
                ¡Hola! Esto es una página en desarrollo. Soy aún Juniorr y poco a poco me voy desarrollando en este sector. Espero que te guste este proyecto, gracias por tu tiempo.
              </p>
              <img className="card-img" src="../../public/img/fo.jpg" alt="" width={480}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
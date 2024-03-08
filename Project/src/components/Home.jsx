import { Carousel } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.stampaprint.net/es/blog/wp-content/uploads/2018/02/ORFHM81-770x360.jpg"
                                alt="First slide"
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.imprentaluque.es/files/subscribers/4849805d-db47-45a1-b5f9-3ceca639c1a4/sites/952c3d1f-ed71-47d9-933c-d43681e2b028/products/9a7f8fe0-19c2-49d5-82a5-1dc29d566a42/CUADERNOTAPABLANDA3_xlarge.png?stamp=636972308882349174"
                                alt="Second slide"
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.imprimir24horas.es/static/img/blocs_notas/bloc_notas.jpg"
                                alt="Third slide"
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col-md-6">
                    <h1 className='fs-2 mb-4'>¡Bienvenido a mi pequeño blog de notas!</h1>
                    <p className='mb-5'>Este es un lugar donde puedes organizar tus ideas, pensamientos y notas importantes de manera fácil y rápida. Espero que os guste toda su funcionalidad, pronto más novedades.</p>
                    <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzcyd2VpNjJ4cDc4bHN2anJ2M2dyOGU5aTdpY3d6cGZwM2czcXZ5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1QhkRAFtcjO90zNZFi/giphy.gif" alt="Blog Note" className="img-fluid mt-3 w-50 mx-auto d-block mt-3" />
                </div>
            </div>
        </div>
    );
};

export default Home;
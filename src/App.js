import React, { useState, useEffect } from 'react';
import images_hireme from "./assets/img/hireme.png";
import images_banner from "./assets/img/char-full.png";
import char_services from "./assets/img/char-services.png";
import images_produk from "./assets/img/produk-icon.png";
import images_loading from "./assets/img/loading.gif";
import image_facebook from "./assets/img/facebook-icon.png";
import image_instagram from "./assets/img/instagram-icon.png";
import image_youtube from "./assets/img/youtube-icon.png";
import image_github from "./assets/img/github-icon.png";

import Slider from 'react-slick';
import Aos from "aos";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { createClient } from "contentful";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import "./assets/css/Style_default.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "aos/dist/aos.css";

const Home = () => {
  Aos.init({ duration: 1000 });
  const [websites, setWebsites] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(false);

  const client = createClient({
    space: "38v5evtkgftl",
    accessToken: "kDgiFMQFZAObsWasOixfK8UYG5Ij7E8wmj-UE88zl8Y",
  });

  const settings = {
    dots: true,
    infinite: true,
    pauseOnHover: true,
    slidesToShow: 3,
    rows: 2,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1,
        },
      },
    ],
  };

  const fetchWebsite = () => {
    client
      .getEntries({
        content_type: "blogPost",
        'fields.tags': "website",
        //limit: 6,
        //skip: 2
      })
      .then(({ items }) => {
        setWebsites(items);
        // console.log(items);
      })
      .catch(console.error);
  }

  const fetchMobile = () => {
    client
      .getEntries({
        content_type: "blogPost",
        'fields.tags': "mobile",
        //limit: 6,
        //skip: 2
      })
      .then(({ items }) => {
        setMobiles(items);
        //console.log(items);
      })
      .catch(console.error);
  }

  const getPortfolios = (slug) => {
    setLoading(true);
    if(portfolio == ''){
      client
        .getEntries({
          content_type: "blogPost",
          'fields.slug': slug,
        })
        .then((portfolio) => {
          setPortfolio(portfolio.items[0]);
          setArticle(false)
          setLoading(false);
          console.log(portfolio);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
      }
    setModal(true);
  }

  const Article = () => {
    const {slug} = useParams();
    useEffect(() => {
      // console.log('tes')
       getPortfolios(slug);
    }, []);
    return (
      <>
        <div className="container-fluid">
          {/* main-1 */}
          <div className="row padding-main">
            {/* menu dan logo */}
            <Nav details={true} />
          </div>
        </div>
        <header class="masthead" style={{ backgroundImage: `url('https://startbootstrap.github.io/startbootstrap-clean-blog/assets/img/post-bg.jpg')` }}>
          <div class="container position-relative px-4 px-lg-5">
            <div class="drow gx-4 gx-lg-5 justify-content-center">
              <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="post-heading">
                  <h1>{portfolio == "" ? "" : portfolio.fields.title}</h1>
                  <h2 class="subheading">Problems look mighty small from 150 miles up</h2>
                  <span class="meta">
                    Posted by
                    <a href="#!">Start Bootstrap</a>
                    on August 24, 2021
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <article class="mb-4">
          <div class="container px-4 px-lg-5">
          <ul class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">Fruit</a></li>
            <li class="active">Pears</li>
          </ul>
            <div class="drow gx-4 gx-lg-5 justify-content-center">
              <div class="col-md-10 col-lg-8 col-xl-7">
                <p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>
                <p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>
                <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>
                <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>
                <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>
                <h2 class="section-heading">The Final Frontier</h2>
                <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
                <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
                <blockquote class="blockquote">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>
                <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>
                <h2 class="section-heading">Reaching for the Stars</h2>
                <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>
                <a href="#!"><img class="img-fluid" src="assets/img/post-sample-image.jpg" alt="..." /></a>
                <span class="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span>
                <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>
                <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>
                <p>
                  Placeholder text by
                  <a href="http://spaceipsum.com/">Space Ipsum</a>
                  &middot; Images by
                  <a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>
                </p>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }

  const Modal = () => {
    const showHideClassName = modal ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName} onClick={() => {
        setModal(false)
        setPortfolio('')
        }}>
        <div className="modal-main" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setPortfolio('')
                setModal(false)
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h2 className="title_portfolio">
              {loading == true ? "Getting Title ..." : portfolio.fields.title}
            </h2>
          </div>

          <div className="modal-body">
            <div className="card">
              <div className="d-flex flex-row mb-3 pb-3r">
                <img
                  className="image_portfolio"
                  src={
                    loading == true
                      ? images_loading
                      : portfolio.fields.heroImage.fields.file.url
                  }
                  alt={portfolio == "" ? "" : portfolio.fields.title}
                ></img>
              </div>
              <p className="text_body_portfolio text-center">
                {loading == true
                  ? "Getting Description ..."
                  : portfolio.fields.body}
              </p>
              <Link
                className="posts__post"
                // key={portfolio.fields.body}
                to={portfolio == "" ? "/" : "/" + portfolio.fields.slug}
              >
                <button
                  type="button"
                  className="btn btn-custom"
                  aria-label="Description"
                >
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Footer = () => {
    return (
      <div>
        <section
          className="container-fluid footer-bg1 pt-5r padding-lr0"
          id="contact"
        >
          {/* <div className="row"> */}
          <div className="container pb-5r">
            <div className="row">
              <div className="col-lg-12">
                <div className="col-lg-3 footer-icon link_hoverfooter">
                  <a href="https://www.facebook.com/reggi49/">
                    <img
                      src={image_facebook}
                      width="42"
                      height="42"
                      className="d-flex pt-2 pb-2"
                      alt="facebook"
                    ></img>
                    <span
                      className="float-left pt-2 pl-1r "
                      style={{ fontSize: "18px", color: "#939393" }}
                    >
                      {" "}
                      Facebook
                    </span>
                  </a>
                </div>
                <div className="col-lg-3 footer-icon link_hoverfooter">
                  <a href="https://www.instagram.com/reggimuhamad">
                    <img
                      src={image_instagram}
                      width="42"
                      height="42"
                      className="d-flex pt-2 pb-2"
                      alt="instagram"
                    ></img>
                    <span
                      className="float-left pt-2 pl-1r "
                      style={{ fontSize: "18px", color: "#939393" }}
                    >
                      {" "}
                      Instagram
                    </span>
                  </a>
                </div>
                <div className="col-lg-3 footer-icon link_hoverfooter">
                  <a href="https://youtube.com/user/reggi49">
                    <img
                      src={image_youtube}
                      width="42"
                      height="42"
                      className="d-flex pt-2 pb-2"
                      alt="youtube"
                    ></img>
                    <span
                      className="float-left pt-2 pl-1r "
                      style={{ fontSize: "18px", color: "#939393" }}
                    >
                      {" "}
                      Youtube
                    </span>
                  </a>
                </div>
                <div className="col-lg-3 footer-icon link_hoverfooter">
                  <a href="https://github.com/reggi49">
                    <img
                      src={image_github}
                      width="42"
                      height="42"
                      className="d-flex pt-2 pb-2"
                      alt="twitter"
                    ></img>
                    <span
                      className="float-left pt-2 pl-1r "
                      style={{ fontSize: "18px", color: "#939393" }}
                    >
                      {" "}
                      Github
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid bg-logo-footer">
            <div className="container ">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="jargon-footer1">Reggi © 2022</h5>
                  <h5 style={{ fontSize: "10px" }}>
                    <a href="http://www.freepik.com">
                      Cartoon Art Designed by pikisuperstar / Freepik
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/ulg/popper.min.js"
          integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          crossOrigin="anonymous"
        ></script>
      </div>
    );
  }

  const Nav = ({ details }) => {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-transparent p-0"
        role="navigation"
      >
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse menu-header">
            <ul
              className="nav navbar-nav navbar-right"
              id="navbarNavDropdown"
            >
              {/* <li className="active">
            <a href="#">
              About <span className="sr-only">(current)</span>
            </a>
          </li> */}
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="https://reggi49.medium.com/" target="_blank">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  useEffect(() => {
    fetchWebsite();
    fetchMobile();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}>
            <div className="container-fluid" id="home">
              {/* Modal */}
              {modal && <Modal onClose={() => setModal(false)} show={modal} />}
              {/* main-1 */}
              <div className="row padding-main">
                {/* menu dan logo */}
                <Nav />
                <div className="col-lg-12 banner">
                  <div className="col-lg-3 col-xs-12 img-hp1">
                    <img
                      className="img-fluid img-char pb-2r"
                      src={images_banner}
                      alt="Image Banner E-Catalog"
                    ></img>
                  </div>
                  <div className="col-lg-8 text-justify pl-5r">
                    <h2 className="banner-title text-center pt-3r">Hi I'm Reggi</h2>
                    <h3 className="banner-subtitle text-center">
                      Software Engineer Consultant
                    </h3>
                    <br></br>
                    <div style={{ font: 18, color: "#ffffff" }}>
                      <p className="text_main1_1">
                        Living in Jakarta, Indonesia. My Strenght in website
                        application and mobile application. If you want to know about
                        me, feel free to contact me.
                        <br></br>
                      </p>
                      <br></br>
                      <div className="row">
                        <div className="col-lg-12 col-xs-12 p-0 text-center">
                          <a href="mailto:reggimuhamad@yahhoo.com">
                            <img
                              className="img-fluid pb-3r"
                              src={images_hireme}
                              alt="hire me reggi"
                            ></img>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid" id="blank-mobile-1">
              <div className="col-lg-12 p-0" style={{ height: "100px" }}></div>
            </div>

            {/* main-2 */}
            <div className="container-fluid padding-0">
              <div className="col-lg-12 pb-1r pt-2r" id="portfolio">
                <h5 className="title-fitur">MY PORTFOLIO</h5>
              </div>
            </div>
            <div className="container-fluid" id="qrcode">
              <div className="row padding-all2">
                <div className="col-lg-12 pt-4 pb-4">
                  <section className="row" data-aos="fade-up">
                    <div className="col-lg-3 qr-code">
                      <h3 className="text-center">Website Application </h3>
                      <p
                        className="text-justify text-center pl-2r pr-2r pb-4r"
                        style={{ color: "#000" }}
                      >
                        Builts website with newest technology.
                        <br></br>
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="col-lg-12 img-qrcode pl-5r">
                        <div className="row">
                          <Slider {...settings}>
                            {websites.map((item, key) => (
                              <div key={key} className="col-md-4">
                                <div className="panel" style={{ border: "none" }}>
                                  <div className="d-flex flex-row mb-3">
                                    <a onClick={() => {
                                      getPortfolios(item.fields.slug);
                                      }} >
                                      <img
                                        className="image_portfolio"
                                        src={item.fields.heroImage.fields.file.url}
                                        alt={item.fields.title}
                                      ></img>
                                    </a>
                                    <div className="d-flex flex-column ml-2">
                                      <p className="text_portfolio">
                                        {item.fields.title}
                                      </p>
                                    </div>
                                  </div>
                                  <h6 className="text_desc_portfolio text-center">
                                    <p>{item.fields.description}</p>
                                  </h6>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* main 3 */}
            <div className="container-fluid" id="detail">
              <div className="row locator-askmbtech">
                <div className="col-lg-12"></div>
              </div>
            </div>
            <div className="container-fluid" id="qrcode">
              <div className="row padding-all2">
                <div className="col-lg-12 pt-4 pb-4">
                  <section className="row" data-aos="fade-up">
                    <div className="col-lg-3 qr-code">
                      <h3 className="text-center">Mobile Application </h3>
                      <p
                        className="text-justify pl-2r pr-2r pb-4r"
                        style={{ color: "#000" }}
                      >
                        Builts Mobile Application with newest technology.
                        <br></br>
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="col-lg-12 img-qrcode pl-5r">
                        <div className="row">
                          <Slider {...settings}>
                            {mobiles.map((item, key) => (
                              <div key={key} className="col-md-4">
                                <div className="panel" style={{ border: "none" }}>
                                  <div className="d-flex flex-row mb-3">
                                    <a onClick={() => getPortfolios(item.sys.id)}>
                                      <img
                                        className="image_portfolio"
                                        src={item.fields.heroImage.fields.file.url}
                                        alt={item.fields.title}
                                      ></img>
                                    </a>
                                    <div className="d-flex flex-column ml-2">
                                      <p className="text_portfolio">
                                        {item.fields.title}
                                      </p>
                                    </div>
                                  </div>
                                  <h6 className="text_desc_portfolio text-center">
                                    <p>{item.fields.description}</p>
                                  </h6>{" "}
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="container-fluid white-zonk">
              <div className="row">
                <div className="col-lg-12 p-0"></div>
              </div>
            </div>

            <div className="container-fluid bg-detail-product mt-5 mb-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <img
                      className="img-fluid w-60 img-services pb-3rem"
                      src={char_services}
                      alt="Image Banner E-Catalog"
                      id="services"
                    ></img>
                  </div>
                  <div className="col-lg-8 float-right padding-lr-m30 pb-1r pb-3rem">
                    <h2 className="title-detail-produk text-center pb-2r">
                      Services
                    </h2>
                    <p className="text_main1 text-justify text-white pb-3r">
                      I have skill levels how to code for over a years. Simplifying
                      complex topics into relatable analogies and demos. For over a
                      years I had many opportunities to work in a vast spectrum of web
                      technologies what let me gather a significant amount of various
                      experience. Working for companies and individuals around the
                      globe I met and learnt from amazing and creative people.
                      <br></br>
                    </p>
                    <a href="#">
                      <img
                        className="img-fluid width-100"
                        src={images_produk}
                        alt="icon produk"
                      ></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid white-zonk">
              <div className="row">
                <div className="col-lg-12 p-0"></div>
              </div>
            </div>

            {/* footer */}
            <Footer />
          </Route>
          <Route exact path="/:slug" component={Article}>
            <Article />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Home;

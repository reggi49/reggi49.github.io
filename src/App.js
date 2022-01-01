import React, { useState, useEffect } from 'react';
import images_android from "./assets/img/google_play.png";
import images_ios from "./assets/img/app_store.png";
import images_banner from "./assets/img/handphone_banner.png";
import images_detail from "./assets/img/detail_produk.png";
import images_produk from "./assets/img/produk-icon.png";
import image_facebook from "./assets/img/facebook-icon.png";
import image_instagram from "./assets/img/instagram-icon.png";
import image_youtube from "./assets/img/youtube-icon.png";
import image_twitter from "./assets/img/twitter-icon.png";

import Slider from 'react-slick';
import Aos from "aos";
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
  };

  const fetchWebsite = () => {
    client
      .getEntries({
        content_type: "blogPost",
        'fields.tags':  "website" ,
        //limit: 6,
        //skip: 2
      })
      .then(({ items }) => {
        setWebsites(items);
        console.log(items);
      })
      .catch(console.error);
  }

  const fetchMobile = () => {
    client
      .getEntries({
        content_type: "blogPost",
        'fields.tags':  "mobile" ,
        //limit: 6,
        //skip: 2
      })
      .then(({ items }) => {
        setMobiles(items);
        console.log(items);
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchWebsite();
    fetchMobile();
  },[]);

  return (
    <div className="App">
      <div className="container-fluid" id="home">
        {/* main-1 */}

        <div className="row padding-main">
          {/* menu dan logo */}
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
                  <li className="active">
                    <a href="#">
                      About <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#portfolio">Portfolio</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="col-lg-12 banner">
            <div className="col-lg-3 col-xs-12 img-hp1">
              <img
                className="img-fluid"
                src={images_banner}
                alt="Image Banner E-Catalog"
              ></img>
            </div>
            <div className="col-lg-8 text-justify pl-5r">
              <h2 className="banner-title text-center pt-3r">Hi I'm Reggi</h2>
              <h3 className="banner-subtitle text-center">Software Engineer</h3>
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
                  <div className="col-lg-6 col-xs-6 p-0 text-right">
                    <a href="/">
                      <img
                        className="img-fluid pr-3 ico"
                        src={images_android}
                        alt="google play e-catalog"
                      ></img>
                    </a>
                  </div>
                  <div className="col-lg-6 col-xs-6 p-0 text-left">
                    <a href="/">
                      <img
                        className="img-fluid pr-3 ico"
                        src={images_ios}
                        alt="app store e-catalog"
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
                  className="text-justify pl-2r pr-2r pb-4r"
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
                            <img
                              className="image_portfolio"
                              src={item.fields.heroImage.fields.file.url}
                              alt={item.fields.title}
                            ></img>
                            <div className="d-flex flex-column ml-2">
                              <p className="text_portfolio">
                                {item.fields.title}
                              </p>
                            </div>
                          </div>
                          <h5 className="text_desc_portfolio">
                            {item.fields.description}
                          </h5>{" "}
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
                            <img
                              href=""
                              className="image_portfolio"
                              src={item.fields.heroImage.fields.file.url}
                              alt={item.fields.title}
                            ></img>
                            <div className="d-flex flex-column ml-2">
                              <p className="text_portfolio">
                                {item.fields.title}
                              </p>
                            </div>
                          </div>
                          <h5 className="text_desc_portfolio">
                            {item.fields.description}
                          </h5>{" "}
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
                className="img-fluid w-100 img-detail"
                src={images_detail}
                alt="Image Banner E-Catalog"
                id="services"
              ></img>
            </div>
            <div className="col-lg-8 float-right pl-15-rm padding-lr-m30 pb-1r pb-3rem">
              <h2 className="title-detail-produk text-center">Services</h2>
              <p className="text_main1 text-justify text-white">
                MBtech - The Best & The Original Automotive Synthetic Leather
                dirancang dan diproduksi khusus menggunakan teknologi terkini
                dengan kualitas standar internasional. MBtech berinovasi
                menghadirkan berbagai varian produk unggulan yang dapat
                digunakan untuk berbagai aplikasi seperti Automotive (mobil dan
                motor), Home Interior dan berbagai aplikasi menarik lainnya.
                <br></br>
              </p>
              <a href="/">
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
      <section
        className="container-fluid footer-bg1 pt-5r padding-lr0"
        id="contact"
      >
        {/* <div className="row"> */}
        <div className="container pb-5r">
          <div className="row">
            <div className="col-lg-12">
              <div className="col-lg-3 footer-icon link_hoverfooter">
                <a href="/">
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
                    Faceebook
                  </span>
                </a>
              </div>
              <div className="col-lg-3 footer-icon link_hoverfooter">
                <a href="/">
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
                <a href="/">
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
                <a href="/">
                  <img
                    src={image_twitter}
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
                    Twitter
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
                <h5 className="jargon-footer1">Muhamad Reggi © 2022</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> */}
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

export default Home;

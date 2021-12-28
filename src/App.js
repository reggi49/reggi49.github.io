import React, { useState, useEffect } from 'react';
import images_logo from "./assets/img/logo_mbtech.png";
import images_android from "./assets/img/google_play.png";
import images_ios from "./assets/img/app_store.png";
import images_banner from "./assets/img/handphone_banner.png";
import images_locator from "./assets/img/handphone-locator.png";
import images_askmbtech from "./assets/img/handphone-askmbtech.png";
import images_iconlocator from "./assets/img/location-icon.png";
import images_iconconsultation from "./assets/img/icon-consultation.png";
import images_detail from "./assets/img/detail_produk.png";
import images_produk from "./assets/img/produk-icon.png";
import images_smakerloc from "./assets/img/seatmkr-loc-icon-500.png";
import images_cleaning from "./assets/img/cleaning-icon-500.png";
import images_color from "./assets/img/colour-icon-500.png";
import images_cleanmethod from "./assets/img/clean-method.png";
import images_collection from "./assets/img/color-collection.png";
import images_smakerlocator from "./assets/img/seatmaker-locator.png";
import images_qrcode from "./assets/img/icon-scan-qr.png";
import images_handqrcode from "./assets/img/hand-qrcode.png";
import images_profilesmaker from "./assets/img/profile-seatmaker.png";
import image_facebook from "./assets/img/facebook-icon.png";
import image_instagram from "./assets/img/instagram-icon.png";
import image_youtube from "./assets/img/youtube-icon.png";
import image_twitter from "./assets/img/twitter-icon.png";
import image_whatsapp from "./assets/img/whatsapp-icon.png";
import image_hotline from "./assets/img/hotline-icon.png";
import image_email from "./assets/img/email-icon.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import "./assets/css/Style_default.css";
// import { findDOMNode } from ' react-dom';
import Aos from "aos";
import "aos/dist/aos.css";

import { createClient } from "contentful";
import axios from 'axios';

const Home = () => {
  Aos.init({ duration: 1000 });
  const [articles, setArticles] = useState([]);

  const client = createClient({
    space: "38v5evtkgftl",
    accessToken: "kDgiFMQFZAObsWasOixfK8UYG5Ij7E8wmj-UE88zl8Y",
  });

  const fetchPost = () => {
    client
      .getEntries({
        content_type: "blogPost",
      })
      .then(({ items }) => {
        setArticles(items);
        console.log(items);
      })
      .catch(console.error);
  }
  useEffect(() => {
    fetchPost();
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
              <h2 className="banner-title text-center pt-3r">
                MBtech E-Catalog
              </h2>
              <br></br>
              <div style={{ font: 18, color: "#ffffff" }}>
                <p className="text_main1_1">
                  MBtech E-Catalog hadir untuk memudahkan Anda menemukan
                  inspirasi desain jok dan seatmaker. Aplikasi ini memiliki
                  berbagai fitur untuk menjangkau lokasi seatmaker terdekat.
                  Cukup aktifkan sinyal GPS atau dengan scan QR Code di
                  smartphone Anda.
                  <br></br>
                  <br></br>
                  Aplikasi MBtech E-Catalog juga tersedia dalam versi smartphone
                  (Android dan iOS). Ayo, segera download aplikasinya.
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
              <div className="col-lg-5 qr-code">
                <div className="col-lg-12 pt-1r">
                  <img
                    className="img-fluid"
                    src={images_qrcode}
                    alt="img_qrcode"
                  ></img>
                </div>
                <h3 className="text-center">SCAN QR CODE </h3>
                <p
                  className="text-justify pl-2r pr-2r pb-4r"
                  style={{ color: "#000" }}
                >
                  Scan QR Code (Quick Responsive) merupakan layanan dari MBtech
                  dalam bentuk sebuah stiker. Inovasi berupa kode unik ini
                  memudahkan seatmaker menjelaskan keaslian produk MBtech.
                  Seatmaker tinggal menunjukkan QR Code untuk dipindai oleh
                  konsumen.
                  <br></br>
                  <br></br>
                  QR Code berisikan seputar informasi seatmaker, seperti nama,
                  alamat, kategori seatmaker, nomor telepon/HP, peta lokasi dan
                  galeri foto jok.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="col-lg-12 img-qrcode pl-5r">
                  <div className="row">
                    <div className="col-lg-4 col-xs-6 padding-0">
                      <img
                        className="img-fluid"
                        src={images_handqrcode}
                        alt="hand_qrcode"
                      ></img>
                    </div>
                    <div className="col-lg-6 col-xs-6 padding-0">
                      <img
                        className="img-fluid"
                        src={images_profilesmaker}
                        alt="profile-seatmaker"
                      ></img>
                    </div>
                    <div className="col-lg-2"></div>
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
          <div className="col-lg-12">
            <div className="row">
              <section className="col-lg-12 pb-3" data-aos="fade-up">
                <ul class="slides image-box hotel listing-style1 box-portfolio"></ul>
                {articles.map((item, key) => (
                  <li classs="box-portfolio">
                    <article class="box">
                      <figure>
                        <a href="#" class="hover-effect popup-gallery">
                          <img
                            width="270"
                            height="160"
                            alt=""
                            src="https://i.imgur.com/JN2wkb6.jpg"
                            draggable="false"
                          ></img>
                        </a>
                      </figure>
                      <div class="details">
                        <h4 class="box-title">{item.fields.title}</h4>
                        <p class="description">{item.fields.description}</p>
                        <div class="action">
                          <a class="button btn-small" href="#">
                            BOOK
                          </a>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </section>
            </div>
          </div>
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
              <h2 className="title-detail-produk text-center">
                DETAIL PRODUK MBTECH
              </h2>
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

      <div className="container-fluid padding-fitur-ccs" id="">
        <div className="row locator-askmbtech-last">
          <div className="col-lg-12">
            <div className="row">
              <section className="col-lg-4 pb-3" data-aos="fade-up">
                <div className="col-lg-12">
                  <img
                    className="img-fluid icon-fitur"
                    src={images_cleaning}
                    alt="images_iconlocator"
                  ></img>
                  <p
                    className="m-0 pt-3"
                    style={{
                      fontSize: "20px ",
                      fontWeight: "bold",
                      color: "#8d7b4d",
                    }}
                  >
                    CLEANING METHOD
                  </p>
                  <img
                    className="img-fluid"
                    src={images_cleanmethod}
                    alt="images_iconlocator"
                  ></img>
                  <p
                    className="pt-1 text-center"
                    style={{ color: "#000", fontSize: "14px" }}
                  >
                    Memberikan panduan lengkap cara membersihkan dan perawatan
                    produk MBtech.
                  </p>
                </div>
              </section>
              <section className="col-lg-4 pb-3" data-aos="fade-up">
                <div className="col-lg-12">
                  <img
                    className="img-fluid icon-fitur"
                    src={images_color}
                    alt="images_iconconsultation"
                  ></img>
                  <p
                    className="m-0 pt-3"
                    style={{
                      fontSize: "20px ",
                      fontWeight: "bold",
                      color: "#8d7b4d",
                    }}
                  >
                    COLOUR COLLECTION
                  </p>
                  <img
                    className="img-fluid "
                    src={images_collection}
                    alt="images_iconlocator"
                  ></img>
                  <p
                    className="pt-1 text-center"
                    style={{ color: "#000", fontSize: "14px" }}
                  >
                    Menampilkan koleksi warna varian produk MBtech. Anda juga
                    bisa membuat kreasi warna personal dengan memadupadankan
                    pilihan warna.
                  </p>
                </div>
              </section>
              <section className="col-lg-4 pb-3" data-aos="fade-up">
                <div className="col-lg-12">
                  <img
                    className="img-fluid icon-fitur"
                    src={images_smakerloc}
                    alt="images_iconconsultation"
                  ></img>
                  <p
                    className="m-0 pt-3"
                    style={{
                      fontSize: "20px ",
                      fontWeight: "bold",
                      color: "#8d7b4d",
                    }}
                  >
                    SEATMAKER LOCATOR
                  </p>
                  <img
                    className="img-fluid"
                    src={images_smakerlocator}
                    alt="images_iconlocator"
                  ></img>
                  <p
                    className="pt-1 text-center"
                    style={{ color: "#000", fontSize: "14px" }}
                  >
                    Memudahkan Anda mencari lokasi seatmaker yang dituju.
                  </p>
                </div>
              </section>
            </div>
          </div>
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

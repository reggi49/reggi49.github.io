import React, { Component } from "react";

import { Redirect } from "react-router-dom";
// import AuthService from "../services/auth.service";
import "react-upload-gallery/dist/style.css";
import $ from 'jquery';
import SeatmakerDataService from "../services/smaker.service";
import powered_images from '../assets/img/Powered-By-Mbtech.png';

const APP_URL_IMAGES = 'http://mbtech.info/newoffice/images/';
// const APP_URL_IMAGES = process.env.REACT_APP_API_URL+'/images/';
const APP_URL_TEMP = process.env.REACT_APP_API_URL+'static/tmp/';

export default class Seatmaker extends Component {
  constructor(props) {
    super(props);
    this.infoSeatmaker = this.infoSeatmaker.bind(this);
    this.selectFiles = this.selectFiles.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = {
      seatmaker: [],
      currentSeatmaker: {
        id: null,
        toko: "",
        alamat: "",
        description: "",
        deleteSuccess: false,
        acceptSuccess: false,
        pendingSuccess: false,
        published: false,
      },
      paramId: atob(this.props.match.params.id).split("-")[0],
      idseatmaker: atob(this.props.match.params.id).split("-")[1],
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      deleteSuccess: false,
      submitSuccess: false,
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
      fileInfos: [],
    };
  }

  componentDidMount() {
    this.infoSeatmaker();
    // const currentUser = AuthService.getCurrentUser();
    // if (!currentUser) this.setState({ redirect: "/home" });
    // this.setState({ currentUser: currentUser, userReady: true })

    $(document).ready(function () {
      let imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
          let i;
          let filesAmount = input.files.length;
          for (i = 0; i < filesAmount; i++) {
            let reader = new FileReader();
            reader.onload = function (event) {
              $($.parseHTML("<img>"))
                .attr("src", event.target.result)
                .attr("style", "width:100%;height:100%")
                .appendTo(placeToInsertImagePreview);
            };
            reader.readAsDataURL(input.files[i]);
          }
        }
      };
      $("#input-images").on("change", function () {
        imagesPreview(this, "div.preview-images");
      });
    });
  }

  infoSeatmaker() {
    var today = new Date();
    var dateId = this.state.paramId;
    // console.log(today.getDate())
    // console.log(dateId)
    // eslint-disable-next-line eqeqeq
    if (today.getDate() == dateId)
      SeatmakerDataService.getProfile(this.state.idseatmaker)
        .then((response) => {
          this.setState({
            seatmaker: response.data,
          });
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    else console.log("gak valid");
  }

  selectFiles(event) {
    this.setState({
      progressInfos: [],
      selectedFiles: event.target.files,
    });
  }

  upload(idx, file) {
    let _progressInfos = [...this.state.progressInfos];

    SeatmakerDataService.upload(file, this.state.idseatmaker, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      this.setState({
        _progressInfos,
      });
    })
      .then((response) => {
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Uploaded the file successfully: " + file.name,
          ];
          return {
            message: nextMessage,
          };
        });
        this.infoSeatmaker();
        return SeatmakerDataService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          let nextMessage = [
            ...prev.message,
            "Could not upload the file: " + file.name,
          ];
          return {
            progressInfos: _progressInfos,
            message: nextMessage,
          };
        });
      });
  }

  uploadFiles() {
    const selectedFiles = this.state.selectedFiles;

    let _progressInfos = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
    }

    this.setState(
      {
        progressInfos: _progressInfos,
        message: [],
      },
      () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          this.upload(i, selectedFiles[i]);
        }
      }
    );
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentSeatmaker: {
        ...prevState.currentSeatmaker,
        description: description,
      },
    }));
  }

  submitDescription(id) {
    var data = {
      description: this.state.currentSeatmaker.description,
    };
    SeatmakerDataService.submitDescription(id, data)
      .then((response) => {
        // console.log(response.data);
        // this.props.history.push('/seatmaker')
        this.setState({ submitSuccess: true });
        // console.log(response.data.message);
        this.infoSeatmaker();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteImage(id) {
    SeatmakerDataService.deleteimage(id)
      .then((response) => {
        // console.log(response.data);
        // this.props.history.push('/seatmaker')
        this.setState({ deleteSuccess: true });
        this.infoSeatmaker();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { seatmaker, selectedFiles, progressInfos, message } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="wrapper wrapper-full-page">
        {seatmaker ? (
          <div
            id="full-page register-page section-image"
            className="full-page register-page section-image"
            ref="mainPanel"
          >
            <div className="content">
              <div className="container">
                <div className="card card-register card-plain text-center">
                  <div className="card-header ">
                    <div className="row justify-content-center">
                      <div className="col-md-12">
                        <div
                          className="header-text"
                          style={{ marginTop: "50px" }}
                        >
                          <div className="media">
                            <div className="media">
                              <div className="photo">
                                <img
                                  style={style.profilImage}
                                  src={APP_URL_IMAGES + seatmaker.gambar}
                                  alt="Profil Seatmaker"
                                ></img>
                                <img
                                  style={style.poweredImage}
                                  src={powered_images}
                                  alt="powered by seatmaker"
                                ></img>
                              </div>
                            </div>
                            <div className="media-body">
                              <h1>{seatmaker.toko}</h1>
                              <h4>{seatmaker.alamat}</h4>
                            </div>
                            <div className="row">
                              {this.state.deleteSuccess ? (
                                <div
                                  role="alert"
                                  className="alert alert-danger"
                                  id="alert-info"
                                >
                                  {/* <button type="button" aria-hidden="true" className="close">✕</button> */}
                                  <span>
                                    <b> Info - </b> Foto Berhasil di hapus.
                                  </span>
                                </div>
                              ) : null}
                              {this.state.submitSuccess ? (
                                <div
                                  role="alert"
                                  className="alert alert-info"
                                  id="alert-info"
                                >
                                  {/* <button type="button" aria-hidden="true" className="close">✕</button> */}
                                  <span>
                                    <b> Info - </b> Deskripsi berhasil
                                    diperbaharui.
                                  </span>
                                </div>
                              ) : null}
                              <div className="col-sm-12 mt-3">
                                {progressInfos &&
                                  progressInfos.map((progressInfo, index) => (
                                    <div className="mb-2" key={index}>
                                      <span>{progressInfo.fileName}</span>
                                      <div className="progress">
                                        <div
                                          className="progress-bar progress-bar-info"
                                          role="progressbar"
                                          aria-valuenow={
                                            progressInfo.percentage
                                          }
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{
                                            width:
                                              progressInfo.percentage + "%",
                                          }}
                                        >
                                          {progressInfo.percentage}%
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                <div className="col-8">
                                  <label className="btn btn-default p-0">
                                    <input
                                      type="file"
                                      multiple
                                      onChange={this.selectFiles}
                                      accept="image/*"
                                    />
                                  </label>
                                </div>

                                <div className="col-4">
                                  <button
                                    className="btn btn-primary btn-wd"
                                    disabled={!selectedFiles}
                                    onClick={this.uploadFiles}
                                  >
                                    Upload
                                  </button>
                                </div>
                              </div>

                              {message.length > 0 && (
                                <div
                                  className="alert alert-secondary"
                                  role="alert"
                                >
                                  <ul>
                                    {message.map((item, i) => {
                                      return <li key={i}>{item}</li>;
                                    })}
                                  </ul>
                                </div>
                              )}
                              <div className="row">
                                <div className="col-sm-12">
                                  <div
                                    style={style.preview}
                                    className="preview-images"
                                  ></div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="flex">
                                {seatmaker.images &&
                                  seatmaker.images.map((image, index) => (
                                    <div key={index} className="col-md-4">
                                      <div
                                        className="thumbnail"
                                        style={
                                          image.published === 1
                                            ? style.borderRed
                                            : style.borderWhite
                                        }
                                      >
                                        {/* <a className="remove-image" href="#"  onClick={() => this.deleteImage(image.id)} style={style.removeImage}>&#215;</a> */}
                                        <a
                                          className="remove-image"
                                          href="#"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Apa Kamu Yakin Ingin Menghapus file ini?"
                                              )
                                            )
                                              this.deleteImage(image.id);
                                          }}
                                          style={style.removeImage}
                                        >
                                          &#215;
                                        </a>
                                        <a href={APP_URL_TEMP + image.name}>
                                          <img
                                            src={APP_URL_TEMP + image.name}
                                            alt="logo_image"
                                          ></img>
                                          <div className="caption">
                                            <p>{image.title}</p>
                                          </div>
                                        </a>
                                        <div className="flex">
                                          <textarea
                                            id="description"
                                            type="text"
                                            placeholder="Deskripsi"
                                            style={style.deskripsi}
                                            onChange={this.onChangeDescription}
                                          >
                                            {image.description}
                                          </textarea>
                                          <br></br>
                                          <a
                                            title="Simpan"
                                            className="btn btn-success btn-fill"
                                            onClick={() =>
                                              this.submitDescription(image.id)
                                            }
                                            href="#"
                                          >
                                            Simpan
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
                        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Data Tidak Ditemukan</p>
          </div>
        )}
      </div>
    );
  }
}

const style = {
  title: {
    textAlign: "center",
    fontFamily: "Helvetica",
    marginTop: 50
  },
  borderRed : {
    border : "3px solid red"
  },
  borderWhite : {
    border : "3px solid #fff"
  },
  preview: {
    display: 'flex',
    flexWrap: 'nowrap',
    maxWidth: "25%",
    padding: "0 4px"
  },
  previewImage: {
    marginTop: "8px",
    // verticalAlign: middle,
    width: "80%",
  },
  profilImage: {
    maxWidth : "100%",
    width : "20%",
    height : "auto",
    borderRadius: "10%",
    marginRight : "30px",
  },
  poweredImage: {
    maxWidth : "100%",
    width : "50%",
    height : "auto",
  },
  deskripsi: {
    width : "95%",
    height : "100px",
  },
  removeImage: {
    display : 'inline',
    position: 'absolute',
    top: '-15px',
    right: '15px',
    borderRadius: '10em',
    padding: '2px 6px 3px',
    textDecoration: 'none',
    font: '700 21px/20px sans-serif',
    background: '	#f42107',
    border: '3px solid #fff',
    color: '#FFF',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3)',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      WebkitTransition: 'background 0.5s',
      transition: 'background 0.5s',
  },
}

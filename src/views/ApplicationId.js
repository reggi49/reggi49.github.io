import React, { Component } from "react";
import { Grid, Row, Col} from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import Navbars from "../components/Navbars/Navbars";
import Sidebar from "../components/Sidebar/Sidebar";
import SeatmakerDataService from "../services/smaker.service";
import routes from "../routes.js";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";

const APP_URL_TEMP = process.env.REACT_APP_API_URL+'static/tmp/';

export default class ApplicationId extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getSeatmaker = this.getSeatmaker.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSeatmaker = this.updateSeatmaker.bind(this);

    this.state = {
      currentSeatmaker: {
        id: null,
        toko: "",
        alamat: "",
        deleteSuccess : false,
        acceptSuccess : false,
        pendingSuccess : false,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSeatmaker(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSeatmaker: {
          ...prevState.currentSeatmaker,
          title: title
        }
      };
    });
  }
  
  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentSeatmaker: {
        ...prevState.currentSeatmaker,
        description: description
      }
    }));
  }

  getSeatmaker(id) {
    SeatmakerDataService.getProfile(id)
      .then(response => {
        this.setState({
          currentSeatmaker: response.data
        });
        // console.log(this.state.currentSeatmaker.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSeatmaker.id,
      toko: this.state.currentSeatmaker.toko,
      alamat: this.state.currentSeatmaker.alamat,
      kota: this.state.currentSeatmaker.kota,
      published: status
    };

    SeatmakerDataService.update(this.state.currentSeatmaker.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentSeatmaker: {
            ...prevState.currentSeatmaker,
            published: status
          }
        }));
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSeatmaker() {
    SeatmakerDataService.update(
      this.state.currentSeatmaker.id,
      this.state.currentSeatmaker
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The seatmaker was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteImage(id) {    
  SeatmakerDataService.deleteimage(id)
    .then(response => {
      // console.log(response.data);
      // this.props.history.push('/seatmaker')
        this.setState({deleteSuccess: true})
        this.getSeatmaker(this.state.currentSeatmaker.id)
    })
    .catch(e => {
      console.log(e);
    });
  }
  
  acceptImage(id,status) {   
  var data = {
    status : status,
  } 
  SeatmakerDataService.acceptimage(id,data)
    .then(response => {
      console.log(response.data);
      // this.props.history.push('/seatmaker')
        this.setState(prevState => ({
          currentSeatmaker: {
            ...prevState.currentSeatmaker,
            published: 2
          }
        }));
        this.setState({acceptSuccess: true})
    })
    .catch(e => {
      console.log(e);
    });
    setTimeout(
      this.getSeatmaker(this.state.currentSeatmaker.id), 3000);
  }

  // unpublishImage(id) {    
  // SeatmakerDataService.holdimage(id)
  //   .then(response => {
  //     console.log(response.data);
  //     // this.props.history.push('/seatmaker')
  //       this.setState({acceptSuccess: true})
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // }

  render() {
    const { currentSeatmaker } = this.state;

    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Navbars />
          <div className="content">
            {/* <nav aria-label="breadcrumb" role="navigation">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="/applicant">Applicant</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Current Page</li>
            </ol>
          </nav> */}
            <Grid fluid>
              <Row>
                {this.state.acceptSuccess ? (
                  <div
                    role="alert"
                    className="alert alert-success"
                    id="alert-success"
                  >
                    {/* <button type="button" aria-hidden="true" className="close">✕</button> */}
                    <span>
                      <b> Sukses - </b> Foto Berhasil ditambahkan.
                    </span>
                  </div>
                ) : null}
                {this.state.deleteSuccess ? (
                  <div
                    role="alert"
                    className="alert alert-danger"
                    id="alert-info"
                  >
                    {/* <button type="button" aria-hidden="true" className="close">✕</button> */}
                    <span>
                      <b> Info - </b> Foto Berhasil dihapus.
                    </span>
                  </div>
                ) : null}
                <Col md={12}>
                  <Card
                    title="Review Gallery Seat Maker"
                    content={
                      <div>
                        {currentSeatmaker ? (
                          <div className="edit-form">
                            <form>
                              <div className="form-group">
                                <label htmlFor="title">Toko</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  value={currentSeatmaker.toko}
                                  onChange={this.onChangeTitle}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">Alamat</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  value={currentSeatmaker.alamat}
                                  onChange={this.onChangeDescription}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">Kota</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  value={currentSeatmaker.kota}
                                  onChange={this.onChangeDescription}
                                />
                              </div>

                              <div className="form-group">
                                <div className="row">
                                  {currentSeatmaker.images &&
                                    currentSeatmaker.images.map(
                                      (image, index) => (
                                        <div key={index} className="col-md-4">
                                          <div className="thumbnail">
                                            <a href={APP_URL_TEMP + image.name}>
                                              <img
                                                src={APP_URL_TEMP + image.name}
                                                alt="logo_image"
                                              ></img>
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
                                              {/* <a className="accept-image" href="#"  onClick={() => this.acceptImage(image.id)} style={style.acceptImage}>&#111;</a> */}
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
                                                onChange={
                                                  this.onChangeDescription
                                                }
                                              >
                                                {image.description}
                                              </textarea>
                                            </div>
                                          </div>
                                          {image.published === 2 ? (
                                            <button
                                              className="btn btn-success btn-fill"
                                              onClick={() =>
                                                this.acceptImage(image.id, "1")
                                              }
                                            >
                                              Sudah Disetujui
                                            </button>
                                          ) : (
                                            <button
                                              className="btn btn-danger btn-fill"
                                              // href="#"
                                              onClick={() =>
                                                this.acceptImage(image.id, "2")
                                              }
                                            >
                                              Belum Disetujui
                                            </button>
                                          )}
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>

                              {/* <div className="form-group">
                              <label>
                                <strong>Status:</strong>
                              </label>
                              {currentSeatmaker.published ? " Disetujui" : " Belum Disetujui"}
                            </div> */}
                            </form>
                            <p>{this.state.message}</p>
                          </div>
                        ) : (
                          <div>
                            <br />
                            <p>Please click on a Seatmaker...</p>
                          </div>
                        )}
                      </div>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
const style = {
  title: {
    textAlign: "center",
    fontFamily: "Helvetica",
    marginTop: 50,
  },
  preview: {
    display: "flex",
    flexWrap: "nowrap",
    maxWidth: "25%",
    padding: "0 4px",
  },
  previewImage: {
    marginTop: "8px",
    // verticalAlign: middle,
    width: "80%",
  },
  removeImage: {
    display: "inline",
    position: "absolute",
    top: "-10px",
    right: "0px",
    borderRadius: "10em",
    padding: "2px 6px 3px",
    textDecoration: "none",
    font: "700 21px/20px sans-serif",
    background: "	#f42107",
    border: "3px solid #fff",
    color: "#FFF",
    boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3)",
    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
    WebkitTransition: "background 0.5s",
    transition: "background 0.5s",
  },
  deskripsi: {
    width: "100%",
    height: "100px",
  },
};

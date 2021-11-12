import React, { Component } from 'react';
// import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table} from "react-bootstrap";
import { thSeatmakers, thImages } from "../variables/Variables.jsx";
import Navbars from "../components/Navbars/Navbars";
import Sidebar from "../components/Sidebar/Sidebar";

import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";

import { Link } from "react-router-dom";
import SeatmakerDataService from "../services/smaker.service";
import routes from "../routes.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.retrieveLastApplication = this.retrieveLastApplication.bind(this);
    this.state = {
      dashboard:[],
      seatmakers: [],
      images: [],
    };
  }

  componentDidMount() {
    this.retrieveLastApplication("published");
    this.retrieveLastApplication("postpone");
    this.retrieveDashboard();
  }

  retrieveDashboard(){
    SeatmakerDataService.getDashboard()
      .then((response) => {
        const { dashboard } = response.data;
        this.setState({
          dashboard: response.data,
        });
        console.log(dashboard);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveLastApplication(status) {
    if (status === "postpone") {
      status = { published: 1, size: 10 };
      SeatmakerDataService.getLastApplication(status)
        .then((response) => {
          const { totalPages } = response.data;
          this.setState({
            seatmakers: response.data,
            count: totalPages,
          });
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (status === "published") {
      status = { published: 2, size: 10 };
      SeatmakerDataService.getLastApplication(status)
        .then((response) => {
          const { totalPages } = response.data;
          this.setState({
            images: response.data,
            count: totalPages,
          });
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const { dashboard, seatmakers, images } = this.state;
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Navbars />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<i className="pe-7s-server text-warning" />}
                    statsText="Total Database"
                    statsValue={dashboard[0]}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText="Updated now"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<i className="pe-7s-wallet text-success" />}
                    statsText="Total Images"
                    statsValue={dashboard[1]}
                    statsIcon={<i className="fa fa-calendar-o" />}
                    statsIconText="Last day"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<i className="pe-7s-graph1 text-danger" />}
                    statsText="Pending Images"
                    statsValue={dashboard[2]}
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText="In the last hour"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <StatsCard
                    bigIcon={<i className="pe-7s-photo text-primary" />}
                    statsText="Approved Images"
                    statsValue={dashboard[3]}
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText="In the last hour"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Card
                    title="Pengajuan Unggah Karya"
                    category="Gallery Seat Maker"
                    stats="Updated 3 minutes ago"
                    statsIcon="fa fa-history"
                    content={
                      <div className="table-full-width">
                        <Table className="table table-sm" striped hover>
                          <thead>
                            <tr>
                              {thSeatmakers.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {seatmakers.seatmakers &&
                              seatmakers.seatmakers.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.title}</td>
                                  <td>{item.seatmaker.toko}</td>
                                  <td>{item.seatmaker.kota}</td>
                                  <td className="td-actions text-right">
                                    <Link
                                      to={"/application/" + item.seatmaker.id}
                                      className="btn btn-danger btn-fill"
                                    >
                                      Lihat
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </div>
                    }
                  />
                </Col>
                <Col md={6}>
                  <Card
                    title="Karya Terakhir yang Disetujui"
                    category="Gallery Seat Maker"
                    stats="Updated 3 minutes ago"
                    statsIcon="fa fa-history"
                    content={
                      <div className="table-full-width">
                        <Table className="table table-sm" striped hover>
                          <thead>
                            <tr>
                              {thImages.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {images.seatmakers &&
                              images.seatmakers.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.title}</td>
                                  <td>{item.seatmaker.toko}</td>
                                  <td>{item.seatmaker.kota}</td>
                                  <td className="td-actions text-right">
                                    <Link
                                      to={"/application/" + item.seatmaker.id}
                                      className="btn btn-success btn-fill"
                                    >
                                      Lihat
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
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

export default Dashboard;
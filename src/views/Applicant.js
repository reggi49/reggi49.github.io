import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import { thSeatmakers } from "../variables/Variables.jsx";
import Navbars from "../components/Navbars/Navbars";
import Sidebar from "../components/Sidebar/Sidebar";
import SeatmakerDataService from "../services/smaker.service";
import routes from "../routes.js";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

class Applicant extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveSeatmakers = this.retrieveSeatmakers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSeatmaker = this.setActiveSeatmaker.bind(this);
    this.removeAllSeatmakers = this.removeAllSeatmakers.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      seatmakers: [],
      currentSeatmaker: null,
      currentIndex: -1,
      searchTitle: "",
      page: 1,
      count: 0,
      pageSize: 10,
    };

    this.pageSizes = [5, 10, 15];
  }
  
  componentDidMount() {
    this.retrieveSeatmakers();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    
    this.setState({
      searchTitle: searchTitle
    },() => {
        this.retrieveSeatmakers();
      });
  }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["toko"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveSeatmakers() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);
    // console.log(JSON.stringify(params));

    SeatmakerDataService.getAll(params)
      .then((response) => {
        const {totalPages } = response.data;

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

  refreshList() {
    this.retrieveSeatmakers();
    this.setState({
      currentSeatmaker: null,
      currentIndex: -1
    });
  }

  setActiveSeatmaker(seatmaker, index) {
    this.setState({
      currentSeatmaker: seatmaker,
      currentIndex: index
    });
  }

  removeAllSeatmakers() {
    SeatmakerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    SeatmakerDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          seatmakers: response.data
        });
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveSeatmakers();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveSeatmakers();
      }
    );
  }

  render() {
    const {
      searchTitle,
      seatmakers,
      page,
      count,
      pageSize,
    } = this.state;
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Navbars/>
          <div className="content">
          <Grid fluid>
          <Row>
            
            <Col md={12}>
              <Card
                title="Riwayat Pengajuan Karya Seat Maker"
                ctTableFullWidth
                ctTableResponsive
                content={
                      <div className="fixed-table-toolbar">
                        <div className="col-md-12 ">
                          <div className="input-group mb-3 pull-right" style={{display: 'flex'}}>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Search by toko"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                          />
                          <div className="input-group-append pull-right">
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={this.retrieveSeatmakers}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        <div>
                        {"Toko per Page: "}
                          <select className="form-control-sm" onChange={this.handlePageSizeChange} value={pageSize}>
                            {this.pageSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
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
                            seatmakers.seatmakers.map((seatmaker, index) => (
                              <tr key={index}>
                                <td >{seatmaker.id}</td>
                                  <td >{seatmaker.toko}</td>
                                  <td >{seatmaker.alamat}</td>
                                  <td >{seatmaker.kota}</td>
                              <td className="td-actions text-right">
                              <Link to={"/application/" + seatmaker.id} className="btn btn-success btn-fill">Lihat</Link>
                              </td>  
                            </tr>
                            ))}
                           
                        </tbody>  
                        
                        </Table>
                        <Pagination
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                          />
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

export default Applicant;
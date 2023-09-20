import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Tables from "../../components/tables/Tables";
import Loading from "../../components/spinners/Loading";
import { addData } from "../../components/context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import { deletfunc, exporttocsvfunc, usergetfunc } from "../../services/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resuserdata, setResUserdata] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { useradd, setUseradd } = useContext(addData);

  const adduser = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [search, gender, status, sort, page]);

  // get user
  const userGet = async () => {
    const response = await usergetfunc(search, gender, status, sort, page);
    if (response.status === 200) {
      setResUserdata(response?.data?.userdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  // user delete
  const deleteUser = async (id) => {
    const response = await deletfunc(id);
    if (response.status === 200) {
      userGet();
      toast.success("User Deleted Successfully");
      // setDLtdata(response.data)
    } else {
      toast.error("error");
    }
  };

  // export user
  const exportuser = async () => {
    const response = await exporttocsvfunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };


  // pagination
  // handle prev btn
  const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUseradd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main-div">
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                Add User
              </Button>
            </div>
          </div>
          {/* Export Gender Status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportuser}>
                Export To Csv
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* short by value */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              {/* <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown className="text-center">
                <Dropdown.Toggle
                  className="dropdown_btn"
                  variant="success"
                  id="dropdown-basic"
                >
                  {/* <FontAwesomeIcon icon="fa-solid fa-sort" /> */}
                  Dropdown
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap gap-2">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"inactive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="mt-3">
                <Tables
                  users={resuserdata}
                  deleteUser={deleteUser}
                  userGet={userGet}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                  page={page}
                  pageCount={pageCount}
                  setPage={setPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import "./table.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import img from "../../assets/tm5.jpg";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faAngleDown,
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/apis";
import Paginatn from "../pagination/Paginatn";
const Tables = ({
  users,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  // const {fname, lname, gender, email, status, location} = data;

  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);

    if (response.status === 200) {
      userGet();
      toast.success("Status Updated");
    } else {
      toast.error("error ");
    }
  };
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Id</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.length > 0 &&
                    users?.map((user, indx) => {
                      const {
                        fname,
                        lname,
                        gender,
                        email,
                        status,
                        location,
                        profile,
                        _id,
                      } = user;
                      return (
                        <>
                          <tr key={indx}>
                            <td>{indx + 1}</td>
                            <td>
                              {fname} {lname}
                            </td>
                            <td>{email}</td>
                            <td>{gender === "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      status === "active" ? "primary" : "danger"
                                    }
                                  >
                                    {status}&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faAngleDown} />
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() => handleChange(_id, "active")}
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(_id, "inactive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td>{location}</td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${profile}`}
                                alt={`${fname} ${lname}`}
                                className="object-fit-cover"
                              />
                            </td>
                            <td>
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <FontAwesomeIcon
                                    variant="light"
                                    className="action"
                                    icon={faEllipsisVertical}
                                    style={{ color: "black" }}
                                  />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">
                                    <NavLink
                                      to={`/userprofile/${_id}`}
                                      className="text-decoration-none"
                                    >
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        style={{ color: "green" }}
                                      />
                                      &nbsp; View
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-1">
                                    <NavLink
                                      to={`/edit/${_id}`}
                                      className="text-decoration-none"
                                    >
                                      <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        style={{ color: "skyblue" }}
                                      />
                                      &nbsp; Edit
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    <div onClick={() => deleteUser(_id)}>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ color: "red" }}
                                      />
                                      &nbsp; Delete
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  {users?.length === 0 && (
                    <div className="no-data text-center">
                      <p className="mb-0 p-0">No data found</p>
                    </div>
                  )}

                  {/* <tr>
                    <td>1</td>
                    <td>Mark Otto</td>
                    <td>@mdo</td>
                    <td>Male</td>
                    <td className="d-flex align-items-center">
                      <Dropdown className="text-center">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          variant="success"
                          id="dropdown-basic"
                        >
                          <Badge bg="primary">
                            Active&nbsp;&nbsp;
                            <FontAwesomeIcon icon={faAngleDown} />
                          </Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Active
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Inactive
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td className="img_parent">
                      <img src={img} alt="" className="object-fit-cover" />
                    </td>
                    <td>
                      <Dropdown className="text-center">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          variant="success"
                          id="dropdown-basic"
                        >
                          <FontAwesomeIcon
                            variant="light"
                            className="action"
                            icon={faEllipsisVertical}
                            style={{ color: "black" }}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ color: "green" }}
                            />
                            &nbsp; View
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-1">
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ color: "skyblue" }}
                            />
                            &nbsp; Edit
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "red" }}
                            />
                            &nbsp; Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mark Otto</td>
                    <td>@mdo</td>
                    <td>Male</td>
                    <td className="d-flex align-items-center">
                      <Dropdown className="text-center">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          variant="success"
                          id="dropdown-basic"
                        >
                          <Badge bg="primary">
                            Active&nbsp;&nbsp;
                            <FontAwesomeIcon icon={faAngleDown} />
                          </Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            Active
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Inactive
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td className="img_parent">
                      <img src={img} alt="" className="object-fit-cover" />
                    </td>
                    <td>
                      <Dropdown className="text-center">
                        <Dropdown.Toggle
                          className="dropdown_btn"
                          variant="success"
                          id="dropdown-basic"
                        >
                          <FontAwesomeIcon
                            variant="light"
                            className="action"
                            icon={faEllipsisVertical}
                            style={{ color: "black" }}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ color: "green" }}
                            />
                            &nbsp; View
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-1">
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ color: "skyblue" }}
                            />
                            &nbsp; Edit
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "red" }}
                            />
                            &nbsp; Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr> */}
                </tbody>
              </Table>
              <Paginatn
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Tables;

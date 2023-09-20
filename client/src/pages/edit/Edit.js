import React, { useEffect, useState } from "react";
import "./edit.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import img from "../../assets/tm5.jpg";
import { toast } from "react-toastify";
import { editfunc, singleUsergetfunc } from "../../services/apis";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "InActive" },
];

const Edit = () => {
  const [inputdata, setInputdata] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    mobile: "",
    location: "",
  });
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);

    if (response.status === 200) {
      setInputdata(response.data);
      setStatus(response.data.status);
      setEditedImage(response.data.profile);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    userProfileGet();
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1200);
  }, [id]);

  const setInputChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const setProfilestatus = (e) => {
    setStatus(e.value);
  };

  const setProfileImage = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      setEditedImage("");
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  // const submitUserData = async (e) => {
  //   e.preventDefault();
  //   const { fname, lname, email, gender, location } = inputdata;
  //   let error = {};
  //   Object.entries(inputdata).forEach(([key, value]) => {
  //     if (value == "") {
  //       error[key] = `${key} is empyt`;
  //     }
  //   });

  //   console.log(error);

  //   if (Object.keys(error).length === 0) {
  //     const formData = new FormData();

  //     Object.entries(inputdata).forEach(([key, value]) => {
  //       formData.append(key, value);
  //     });

  //     // formData.append("status", status);
  //     // formData.append("user_profile", image);
  //     // Display the key/value pairs
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0] + ", " + pair[1]);
  //     }

  //     const config = {
  //       "Content-Type": "multipart/form-data",
  //     };

  //     const response = await editfunc(id, formData, config);
  //     console.log(response);

  //     // if (response?.status === 200) {
  //     //   setInputdata({
  //     //     fname: "",
  //     //     lname: "",
  //     //     email: "",
  //     //     gender: "",
  //     //     mobile: "",
  //     //     location: "",
  //     //   });
  //     //   setStatus("");
  //     //   setImage("");
  //     //   toast.success(response?.data?.message);
  //     //   navigate("/");
  //     // }
  //   } else {
  //     for (let it in error) {
  //       toast.error(`${it} is empty`);
  //     }
  //   }
  // };

  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is Required !");
    } else if (lname === "") {
      toast.error("Last name is Required !");
    } else if (email === "") {
      toast.error("Email is Required !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else if (mobile === "") {
      toast.error("Mobile is Required !");
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f");
    } else if (gender === "") {
      toast.error("Gender is Required !");
    } else if (status === "") {
      toast.error("Status is Required !");
    } else if (location === "") {
      toast.error("location is Required !");
    } else {
      const formData = new FormData();
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("gender", gender);
      formData.append("status", status);
      formData.append("user_profile", image || editedImage);
      formData.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await editfunc(id, formData, config);
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        // setUpdate(response.data);
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-3">Update your details</h1>
        <div className="mt-5">
          <Card className="shadow p-3">
            <div className="image-sec">
              <img
                src={preview ? preview : `${BASE_URL}/uploads/${editedImage}`}
                alt=""
                className="w-100 h-100 object-fit-cover text-center"
              />
            </div>
            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Enter first name"
                    value={inputdata?.fname}
                    onChange={setInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter last name"
                    value={inputdata?.lname}
                    onChange={setInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={inputdata?.email}
                    onChange={setInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile"
                    value={inputdata?.mobile}
                    onChange={setInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select your gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    value={"Male"}
                    name="gender"
                    onChange={setInputChange}
                    checked={inputdata?.gender === "Male" ? true : false}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    value={"Female"}
                    name="gender"
                    onChange={setInputChange}
                    checked={inputdata?.gender === "Female" ? true : false}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select your status</Form.Label>
                  <Select
                    defaultValue={status}
                    // onChange={this.handleChange}
                    onChange={setProfilestatus}
                    options={options}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3 col-lg-6">
                  <Form.Label>Input your profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    onChange={setProfileImage}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Enter the location"
                    value={inputdata?.location}
                    onChange={setInputChange}
                  />
                </Form.Group>
              </Row>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                onClick={submitUserData}
              >
                Update
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Edit;

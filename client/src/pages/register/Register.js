import React, { useContext, useEffect, useState } from "react";
import "./register.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import img from "../../assets/tm5.jpg";
import { toast } from "react-toastify";
import { registerfunc } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import { addData } from "../../components/context/ContextProvider";

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "InActive" },
];

const Register = () => {
  const [inputdata, setInputdata] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    mobile: "",
    location: "",
  });

  const { setUseradd } = useContext(addData);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

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
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  const submitUserData = async (e) => {
    e.preventDefault();
    // const { fname, lname, email, gender, location } = inputdata;

    let error = {};
    Object.entries(inputdata).forEach(([key, value]) => {
      if (value === "") {
        error[key] = `${key} is empyt`;
      }
    });

    if (Object.keys(error).length === 0) {
      const formData = new FormData();

      Object.entries(inputdata).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("status", status);
      formData.append("user_profile", image);
      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerfunc(formData, config);
      console.log(response);

      if (response?.status === 200) {
        setInputdata({
          fname: "",
          lname: "",
          email: "",
          gender: "",
          mobile: "",
          location: "",
        });
        setStatus("");
        setImage("");
        toast.success(response?.data?.message);
        setUseradd(response?.data?.userdata);
        navigate("/");
      }
      // return formData;
    } else {
      for (let it in error) {
        toast.error(`${it} is empty`);
      }
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-3">Register your details</h1>
        <div className="mt-5">
          <Card className="shadow p-3">
            <div className="image-sec">
              <img
                src={preview ? preview : img}
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
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    value={"Female"}
                    name="gender"
                    onChange={setInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select your status</Form.Label>
                  <Select
                    // value={status}
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
                Submit
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;

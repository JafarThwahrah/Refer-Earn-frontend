import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
const REGISTER_URL = "/register";

const Register = () => {
  const [errMsg, setErrMsg] = useState({});
  const params = useParams();
  console.log(params.id);
  const [formValues, setFormValues] = useState({
    referrer_id: params.id ? params.id : "",
    is_referred: params.id ? true : false,
    name: "",
    email: "",
    password: "",
    phone: "",
    birth_date: "",
    image: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setFormValues({
        ...formValues,
        image: event.target.files[0],
      });
    } else {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);
      formData.append("phone", formValues.phone);
      formData.append("birth_date", formValues.birth_date);
      formData.append("referrer_id", formValues.referrer_id);
      formData.append("is_referred", formValues.is_referred);
      formData.append("image", formValues.image);
      const response = await axios.post(REGISTER_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 422) {
        setErrMsg(err.response.data.errors);
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };
  console.log(formValues);
  console.log(errMsg);

  return (
    <div className="d-flex justify-content-center items-center p-5">
      <form
        className="border p-5 mt-5 rounded d-flex flex-column justify-content-center"
        style={{ width: "26rem" }}
      >
        <div className="mb-3">
          <h3 className="mb-5 text-center">Sign up</h3>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <p className="text-danger">{errMsg?.name}</p>
          <input
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <p className="text-danger">{errMsg?.email}</p>

          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <p className="text-danger">{errMsg?.password}</p>

          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <p className="text-danger">{errMsg?.phone}</p>

          <input
            className="form-control"
            id="phone"
            name="phone"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date_of_birth" className="form-label">
            Birth Date
          </label>
          <p className="text-danger">{errMsg?.birth_date}</p>

          <input
            type="date"
            className="form-control"
            id="birth_date"
            name="birth_date"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <p className="text-danger">{errMsg?.image}</p>

          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>

        <a className="text-decoration-none mb-4" href="/login">
          Do you have an account?
        </a>

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;

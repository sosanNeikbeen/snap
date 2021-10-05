import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const { createUser } = useAuth();
  const [countries, setCountries] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Afghanistan");
  const history = useHistory();
  const { addToast } = useToasts();
  const nameRef = useRef();
  const lastnameRef = useRef();
  const locationRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      setCountries(res.data.data);
    };
    getCountries();
  }, []);

  let dropdownValue = [];
  if (countries.length !== 0) {
    dropdownValue = countries.map((country, key) => {
      return <option key={key}>{country.country}</option>;
    });
  }

  const handleSubmit = () => {
    const data = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      location: locationRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      createUser(data);
      history.push("/login");
      addToast("User added, please login to see more.", {
        appearance: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="hero is-medium ">
      <div className="hero-body">
        <div className="container ">
          <div className="columns ">
            <div className="column is-half is-offset-one-quarter">
              {/* {error ? (
                  <div className="notification is-danger is-light">{error}</div>
                ) : (
                  ""
                )} */}
              <form onSubmit={handleSubmit} className="box">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left ">
                    <input
                      className="input"
                      type="text"
                      placeholder="Name"
                      ref={nameRef}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon className="m-3" icon={faUser} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Lastname</label>
                  <div className="control has-icons-left ">
                    <input
                      className="input"
                      type="text"
                      placeholder="lastname"
                      ref={lastnameRef}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon className="m-3" icon={faUser} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Location</label>
                  <div className="control has-icons-left ">
                    <div
                      className={
                        countries.length === 0
                          ? "select is-fullwidth is-loading"
                          : "select is-fullwidth"
                      }
                    >
                      <select
                        value={selectedValue}
                        onChange={handleSelectChange}
                        ref={locationRef}
                      >
                        {dropdownValue}
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon className="m-3" icon={faMapMarkerAlt} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left ">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      ref={emailRef}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon className="m-3" icon={faEnvelope} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="********"
                      ref={passwordRef}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon className="m-3" icon={faLock} />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    Already have an account <Link to="/login">Sign in</Link>
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-info">Submit</button>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-link is-light">
                      <Link to="/">Cancel</Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
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
  const [state, setState] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });

  const history = useHistory();
  const { addToast } = useToasts();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
      location: state.location,
      email: state.email,
      password: state.password,
    };
    try {
      await createUser(data);
      history.push("/login");
      addToast("User added, please login to see more.", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.log(error.response.data.message);
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <section className="hero is-medium ">
      <div className="columns pt-6 is-mobile is-centered">
        <p className="has-text-weight-semibold has-text-info is-size-1">
          Snap
          <br />
        </p>
      </div>
      <div className="hero-body">
        <div className="container ">
          <div className="columns ">
            <div className="column is-half is-offset-one-quarter">
              <form onSubmit={handleSubmit} className="box">
                <div className="field">
                  <label className="label">Full name</label>
                  <div className="control has-icons-left ">
                    <input
                      className="input"
                      type="text"
                      placeholder="Name"
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
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
                        value={state.location}
                        onChange={(e) =>
                          setState({ ...state, location: e.target.value })
                        }
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
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
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
                      onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                      }
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

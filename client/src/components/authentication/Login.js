import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <section className="hero is-medium ">
      <div className="columns pt-6 is-mobile is-centered">
        <Link to="/">
          <p className="has-text-weight-semibold has-text-info is-size-1">
            Snap
            <br />
          </p>
        </Link>
      </div>
      <div className="hero-body">
        <div className="container ">
          <div className="columns ">
            <div className="column is-half is-offset-one-quarter">
              {/* {error ? (
              <div className="notification is-danger is-light">{error}</div>
            ) : (
              ""
            )} */}

              <form className="box">
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      placeholder="e.g. alex@example.com"
                      //   ref={emailRef}
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
                      //   ref={passwordRef}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon className="m-3" icon={faLock} />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    Dont have an account <Link to="/signup">Sign up</Link>
                  </div>
                </div>

                <button type="submit" className="button is-info">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

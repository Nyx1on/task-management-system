import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    if (signUp) {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      } else {
        if (firstName && lastName && email && password && confirmPassword) {
          if (password.length <= 6) {
            return toast.error("Password length should be greater than 6");
          } else {
            const { user } = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            await updateProfile(user, {
              displayName: `${firstName} ${lastName}`,
            });
            navigate("/");
          }
        } else {
          return toast.error("All fields are mandatory");
        }
      }
    } else {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
      } else {
        return toast.error("All fields are mandatory");
      }
    }
    navigate("/");
  };

  return (
    <div>
      <div className="container fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
            <div className="text-center heading py-2">
              {!signUp ? "Login" : "Sign-Up"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-item-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row" onSubmit={handleAuth}>
                {!signUp ? (
                  <></>
                ) : (
                  <>
                    <div className="col-6 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
                <div className="col-12 py-3">
                  <input
                    type="email"
                    className="form-control input-text-box"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                {!signUp ? (
                  <></>
                ) : (
                  <div className="col-12 py-3">
                    <input
                      type="password"
                      className="form-control input-text-box"
                      placeholder="confirm password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="col-12 py-3 text-center">
                  <button
                    className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                    type="submit"
                  >
                    {!signUp ? "Login" : "Sign-Up"}
                  </button>
                </div>
              </form>
            </div>
            {!signUp ? (
              <>
                <div className="text-center justify-content-center mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account ?&nbsp;
                    <span
                      className="link-danger"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                      onClick={() => setSignUp(true)}
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="text-center justify-content-center mt-2 pt-2">
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account ?&nbsp;
                    <span
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "#298af2",
                      }}
                      onClick={() => setSignUp(false)}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

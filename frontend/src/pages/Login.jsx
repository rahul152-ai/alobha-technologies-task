import { useState } from "react";
import loginside from "../assets/images/alobhaMainLogo.png";
import todoLogin from "../assets/images/todoLogin.jpg";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className="row bg-white">
      <div className="col-8">
        <img src={todoLogin} className="w-100" alt="login" />
      </div>
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <img src={loginside} alt="logo" className="w-50" />
        <div
          className="d-flex align-items-center justify-content-around p-2 col-9 mt-5"
          style={{
            border: "1px solid #D7D7D7",
            borderRadius: "8px",
          }}
        >
          <div
            className="p-2 w-100 text-center"
            onClick={() => setIsLogin(true)}
            style={{
              fontSize: "18px",
              lineHeight: "26px",
              background: isLogin ? "#142539" : "",
              color: isLogin ? "#fff" : "#142539",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Log In
          </div>
          <div
            className="p-2 w-100 text-center"
            onClick={() => setIsLogin(false)}
            style={{
              fontSize: "18px",
              lineHeight: "26px",
              background: !isLogin ? "#142539" : "",
              color: !isLogin ? "#fff" : "#142539",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </div>
        </div>
        <div className="col-9 mt-3">
          {isLogin ? (
            <Form>
              <Form.Group>
                <Form.Label className="form-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <img
                    // src={!showPassword ? eyeClose : eyeOpen}

                    alt=""
                    className="position-absolute password-eye cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </Form.Group>
              <div
                style={{
                  color: "#142539",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "right",
                  marginTop: "10px",
                }}
              >
                Forgot Password?
              </div>

              <button
                style={{
                  background: "#142539",
                  border: "1px solid #142539",
                  borderRadius: "8px",
                  padding: "10px 30px",
                }}
                type="submit"
                className="btn btn-primary w-100 mt-5"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </Form>
          ) : (
            <Form>
              {page === 1 && (
                <>
                  <Form.Group>
                    <Form.Label className="form-label">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="form-label">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Mobile Number
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your mobile number"
                    />
                  </Form.Group>
                </>
              )}
              {page === 2 && (
                <>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Enter your password"
                      />
                      <img
                        // src={!showPassword ? eyeOpen : eyeClose}
                        alt=""
                        className="position-absolute password-eye cursor-pointer"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Confirm Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Re-enter your password"
                      />
                      <img
                        // src={!showPassword ? eyeOpen : eyeClose}
                        alt=""
                        className="position-absolute password-eye cursor-pointer"
                      />
                    </div>
                  </Form.Group>
                </>
              )}
              <div
                style={{
                  color: "#AEAEAE",
                  fontSize: "14px",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                By signing up, you agree to our Terms & Conditions
              </div>

              {isLogin && (
                <button
                  style={{
                    background: "#142539",
                    border: "1px solid #142539",
                    borderRadius: "8px",
                    padding: "10px 30px",
                  }}
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                >
                  Log In
                </button>
              )}
              {!isLogin && page === 1 && (
                <button
                  type="button"
                  style={{
                    background: "#142539",
                    border: "1px solid #142539",
                    borderRadius: "8px",
                    padding: "10px 30px",
                  }}
                  onClick={() => setPage(2)}
                  className="btn btn-primary w-100 mt-4"
                >
                  {"Next"}
                </button>
              )}
              {!isLogin && page === 2 && (
                <button
                  style={{
                    background: "#142539",
                    border: "1px solid #142539",
                    borderRadius: "8px",
                    padding: "10px 30px",
                  }}
                  onClick={() => setPage(2)}
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                >
                  Create Account
                </button>
              )}
            </Form>
          )}
          <div className="col-12 d-flex align-items-center mt-5 mb-3">
            <div className="divider col-5"></div>
            <div className="mx-4 text-muted">or</div>
            <div className="divider col-5"></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px",
              gap: "20px",
              border: "1px solid #AEAEAE",
              borderRadius: "8px",
              color: "#5E5E5E",
              cursor: "pointer",
              marginTop: "13px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_4086_42016)">
                <path
                  d="M5.31891 14.5027L4.4835 17.6213L1.43011 17.6859C0.517594 15.9934 0 14.057 0 11.9992C0 10.0093 0.483938 8.13277 1.34175 6.48047H1.34241L4.06078 6.97884L5.25159 9.68091C5.00236 10.4075 4.86652 11.1875 4.86652 11.9992C4.86661 12.88 5.02617 13.724 5.31891 14.5027Z"
                  fill="#FBBB00"
                />
                <path
                  d="M23.7902 9.75781C23.928 10.4837 23.9999 11.2334 23.9999 11.9996C23.9999 12.8587 23.9095 13.6967 23.7375 14.5051C23.1533 17.2558 21.6269 19.6578 19.5124 21.3576L19.5118 21.3569L16.0878 21.1822L15.6032 18.1572C17.0063 17.3343 18.1028 16.0466 18.6804 14.5051H12.2637V9.75781H18.774H23.7902Z"
                  fill="#518EF8"
                />
                <path
                  d="M19.5114 21.3577L19.5121 21.3584C17.4556 23.0113 14.8433 24.0004 11.9996 24.0004C7.42969 24.0004 3.45652 21.4461 1.42969 17.6872L5.31848 14.5039C6.33187 17.2085 8.94089 19.1338 11.9996 19.1338C13.3143 19.1338 14.546 18.7784 15.6029 18.158L19.5114 21.3577Z"
                  fill="#28B446"
                />
                <path
                  d="M19.6596 2.76262L15.7721 5.94525C14.6783 5.26153 13.3853 4.86656 12 4.86656C8.87213 4.86656 6.21431 6.88017 5.25169 9.68175L1.34245 6.48131H1.3418C3.33895 2.63077 7.36223 0 12 0C14.9117 0 17.5814 1.03716 19.6596 2.76262Z"
                  fill="#F14336"
                />
              </g>
              <defs>
                <clipPath id="clip0_4086_42016">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Continue with Google</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px",
              gap: "20px",
              border: "1px solid #AEAEAE",
              borderRadius: "8px",
              color: "#5E5E5E",
              cursor: "pointer",
              marginTop: "13px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_4086_42023)">
                <path
                  d="M16.6172 0C16.6731 0 16.729 0 16.788 0C16.925 1.69253 16.279 2.95719 15.4938 3.87301C14.7234 4.78251 13.6685 5.6646 11.9623 5.53076C11.8484 3.86247 12.4955 2.69161 13.2796 1.77789C14.0068 0.92636 15.3399 0.168621 16.6172 0Z"
                  fill="black"
                />
                <path
                  d="M21.7831 17.6183C21.7831 17.6352 21.7831 17.65 21.7831 17.6658C21.3036 19.118 20.6196 20.3626 19.785 21.5177C19.023 22.5663 18.0893 23.9774 16.422 23.9774C14.9814 23.9774 14.0245 23.0511 12.548 23.0258C10.9861 23.0005 10.1272 23.8004 8.69921 24.0017C8.53586 24.0017 8.37251 24.0017 8.21232 24.0017C7.16371 23.8499 6.31744 23.0195 5.70092 22.2712C3.88298 20.0602 2.47816 17.2042 2.2168 13.5493C2.2168 13.191 2.2168 12.8337 2.2168 12.4754C2.32745 9.85968 3.59843 7.73295 5.2878 6.70225C6.17938 6.15423 7.40505 5.68737 8.76982 5.89603C9.35472 5.98667 9.95227 6.1869 10.4761 6.38503C10.9724 6.57579 11.5932 6.91408 12.1812 6.89617C12.5796 6.88457 12.9759 6.67696 13.3774 6.53047C14.5535 6.10576 15.7065 5.61886 17.2262 5.84756C19.0525 6.12367 20.3488 6.93516 21.1497 8.18717C19.6048 9.17044 18.3833 10.6522 18.592 13.1826C18.7775 15.4811 20.1138 16.8258 21.7831 17.6183Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_4086_42023">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Continue with Apple</span>
          </div>
        </div>
      </div>
    </div>
  );
};

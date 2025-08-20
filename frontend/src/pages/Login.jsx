import { useState } from "react";
import todoLogin from "../assets/images/todoLogin.jpg";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthApi } from "../api/axiosApis";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import logo from "../assets/images/alohaFavIcon.webp";

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // react-hook-form instance
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (isLogin) {
        const response = await AuthApi.signIn(data);
        dispatch(login({ user: response.user, role: response.user.role }));
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        const response = await AuthApi.signUp(data);
        toast.success(response.message, {
          toastId: "signup-success",
        });
        reset();
        changeIsLogin();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (isLogin
            ? "Login failed. Please check your credentials."
            : "Signup failed. Please check your credentials."),
        {
          toastId: "auth-error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  function changeIsLogin() {
    reset();
    setIsLogin(!isLogin);
  }

  return (
    <section className="d-flex bg-white h-100">
      <div className="col-8">
        <img src={todoLogin} className="w-100 h-100" alt="login" />
      </div>

      <div className="col-4 d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center align-items-center mt-5">
          <img src={logo} height={52} width={52} alt="logo" />
        </div>
        {/* Toggle Login / Signup */}
        <div
          className="d-flex align-items-center justify-content-around p-2 col-9 mt-5"
          style={{
            border: "1px solid #D7D7D7",
            borderRadius: "8px",
          }}
        >
          <div
            className="p-2 w-100 text-center"
            onClick={() => changeIsLogin()}
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
            onClick={() => changeIsLogin()}
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

        {/* Form Section */}
        <div className="col-9 mt-3">
          {isLogin ? (
            // LOGIN FORM
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

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
                {loading ? "Loading..." : "Log In"}
              </button>
            </Form>
          ) : (
            // SIGNUP FORM
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-danger">{errors.fullName.message}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Form.Group>

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
                {loading ? "Loading..." : "Create Account"}
              </button>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
};

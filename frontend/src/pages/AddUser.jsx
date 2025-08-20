import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useGoBack from "../customHooks/useGoBack.js";
import useAddUser from "../customHooks/useAddUser.js";

const AddUser = () => {
  const goBack = useGoBack();
  const { addUser, loading } = useAddUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addUser(data, goBack);
  };

  return (
    <div className="m-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-2">Add User Page</h4>
            </div>
          </div>
        </div>

        {/* student body */}
        <div className="row">
          <div className="col-12">
            <Card>
              <CardHeader className="bg-theme-2 text-center text-white">
                {" "}
                Add User
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-12">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="row"
                      autoComplete="off"
                    >
                      <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="Name">
                          Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          id="Name"
                          placeholder="Enter Full Name"
                          {...register("name", {
                            required: "Name is required",
                            pattern: {
                              value: /^[A-Za-z ]+$/,
                              message: "Name can only contain letters",
                            },
                            maxLength: {
                              value: 30,
                              message: "name should be less than 30 character",
                            },
                          })}
                        />
                        {errors.name && (
                          <div className="error-message">
                            {errors.name.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="email">
                          email
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors?.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          autoComplete="new-email"
                          placeholder="Enter user email"
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
                              message: "Enter a valid email",
                            },
                          })}
                        />
                        {errors?.email && (
                          <div className="error-message">
                            {errors?.email.message}
                          </div>
                        )}
                      </div>
                      <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="userpassword">
                          Password
                        </label>
                        <input
                          type="password"
                          className={`form-control ${
                            errors?.password ? "is-invalid" : ""
                          }`}
                          autoComplete="new-password"
                          id="userpassword"
                          placeholder="Enter password"
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password is required",
                            },
                            minLength: {
                              value: 6,
                              message:
                                "Password should have at least 6 characters",
                            },
                          })}
                        />

                        {errors?.password && (
                          <small className="error-message">
                            {errors?.password?.message}
                          </small>
                        )}
                      </div>
                      <hr />

                      <div style={{ textAlign: "center" }} className="mt-0">
                        <button
                          disabled={loading}
                          type="submit"
                          className="btn btn-primary col-md-2 me-1"
                        >
                          Submit
                        </button>

                        <button
                          disabled={loading}
                          onClick={goBack}
                          type="button"
                          className="btn btn-danger col-md-2 ms-1"
                        >
                          Close
                        </button>
                      </div>
                      <br />
                    </form>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

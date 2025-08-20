import { Card, CardBody, CardHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGoBack from "../customHooks/useGoBack.js";
import useAddTeam from "../customHooks/useAddTeam.js";

const AddTeam = () => {
  const goBack = useGoBack();
  const { addTeam, loading } = useAddTeam();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addTeam(data, goBack);
  };

  return (
    <div className="m-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-2">Add Team Page</h4>
            </div>
          </div>
        </div>

        {/* student body */}
        <div className="row">
          <div className="col-12">
            <Card>
              <CardHeader className="bg-theme-2 text-center text-white">
                {" "}
                Add Team
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group row mb-2">
                        <label className="col-form-label col-md-2 bold-font required-field">
                          Team Name
                        </label>
                        <div className="col-md-10">
                          <input
                            id="name"
                            className={`form-control ${
                              errors?.name ? "is-invalid" : ""
                            }`}
                            {...register("name", {
                              required: "Team Name is required",
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Team Name can only contain letters",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "Team name should be less than 30 character",
                              },
                            })}
                          />
                          {errors?.name && (
                            <span className="text-danger">
                              {errors?.name?.message}
                            </span>
                          )}
                        </div>
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

export default AddTeam;

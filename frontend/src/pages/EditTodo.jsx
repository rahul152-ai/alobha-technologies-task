import { Card, CardBody, CardHeader, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useGoBack from "../customHooks/useGoBack.js";
import { useEffect, useState } from "react";
import { ProtectedApi } from "../api/axiosApis.js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditTodo = () => {
  const { id: todoId } = useParams();
  const goBack = useGoBack();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [teamSearch, setTeamSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing todo details on mount
  useEffect(() => {
    const fetchTodo = async () => {
      setInitialLoading(true);
      try {
        const res = await ProtectedApi.getTodosById(todoId);
        if (res?.todo) {
          const todo = res.todo;
          setValue("title", todo.title);
          setValue("description", todo.description);
          setValue("teamId", todo.team?._id || "");
          setTeamSearch(todo.team?.name || "");
          setValue("status", todo.status || "pending");
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch todo details");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTodo();
  }, [todoId, setValue]);

  const searchTeams = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await ProtectedApi.searchTeams(query);
      setSearchResults(res.teams || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSearching(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await ProtectedApi.editTodos(todoId, data);
      toast.success("Todo updated successfully!");
      goBack();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelect = (team) => {
    setValue("teamId", team._id);
    setTeamSearch(team.name);
    setSearchResults([]);
  };

  if (initialLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading todo details...</p>
      </div>
    );
  }

  return (
    <div className="m-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-2">Edit Todo</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Card>
              <CardHeader className="bg-theme-2 text-center text-white">
                Edit Todo
              </CardHeader>
              <CardBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="row"
                  autoComplete="off"
                >
                  {/* Title */}
                  <div className="mb-2 col-md-6">
                    <label className="form-label" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      id="title"
                      placeholder="Enter title"
                      {...register("title", {
                        required: "Title is required",
                        maxLength: {
                          value: 100,
                          message: "Title should not exceed 100 characters",
                        },
                      })}
                    />
                    {errors.title && (
                      <div className="error-message">
                        {errors.title.message}
                      </div>
                    )}
                  </div>

                  {/* Team Search */}
                  <div className="mb-2 col-md-6">
                    <label className="form-label" htmlFor="teamSearch">
                      Team
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search team..."
                      value={teamSearch}
                      onChange={(e) => {
                        setTeamSearch(e.target.value);
                        searchTeams(e.target.value);
                      }}
                    />
                    {searching && <Spinner animation="border" size="sm" />}
                    {searchResults.length > 0 && (
                      <ul className="list-group mt-2">
                        {searchResults.map((team) => (
                          <li
                            key={team._id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleTeamSelect(team)}
                            style={{ cursor: "pointer" }}
                          >
                            {team.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <input
                      type="hidden"
                      {...register("teamId", {
                        required: "Team is required",
                      })}
                    />
                    {errors.teamId && (
                      <div className="error-message">
                        {errors.teamId.message}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-2 col-md-6">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      id="description"
                      placeholder="Enter description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                    {errors.description && (
                      <div className="error-message">
                        {errors.description.message}
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="mb-2 col-md-6">
                    <label className="form-label">Status</label>
                    <div>
                      <label className="me-3">
                        <input
                          type="radio"
                          value="pending"
                          {...register("status", { required: true })}
                        />{" "}
                        Pending
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="completed"
                          {...register("status", { required: true })}
                        />{" "}
                        Completed
                      </label>
                    </div>
                    {errors.status && (
                      <div className="error-message">Status is required</div>
                    )}
                  </div>

                  <hr />
                  <div style={{ textAlign: "center" }} className="mt-0">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary col-md-2 me-1"
                    >
                      {loading ? "Saving..." : "Save"}
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
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;

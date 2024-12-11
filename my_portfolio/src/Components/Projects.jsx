import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../Layouts/FormInput";
import axios from "axios";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";

function Projects() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [projects, setProject] = useState();
  const { storedToken } = useAuth();
  const [flag, setFlag] = useState(false);

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("ProjectName", data.projectTitle);
    formData.append("ProjectType", data.projectType);
    formData.append("ProjectLink", data.projectLink);
    formData.append("ProjectProfile", data.projectImage[0]);
    formData.append("ProjectDescription", data.projectDescription);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/ProjectAdd",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const responseData = response.data;
      const jsonMatch = responseData.match(/\{.*\}/);
      if (jsonMatch) {
        const pureJson = JSON.parse(jsonMatch[0]);
        const { message } = pureJson;
        window.alert(message);
        setFlag((e) => !e);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let fetchAll = async () => {
      let data = await axios.get("http://127.0.0.1:8000/ProjectAll", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const projectArray = Object.values(data.data);
      setProject(projectArray[0]);
    };

    fetchAll();
  }, [flag]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/ProjectDelete`,
          {
            data: { id },
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.data.message) {
          window.alert(response.data.message);
        }

        setFlag((prevFlag) => !prevFlag);
      } catch (error) {
        console.error("Error deleting project:", error);
        window.alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <div className="container bg-black border-1 mt-1 w-75">
      <h1 className="mb-4 text-white text-center">Add New Project</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="card p-4"
      >
        <div className="row mb-3">
          <div className="col-md-6">
            <FormInput
              title="Project Image"
              type="file"
              name="ProjectProfile"
              placeholder="Upload Project Image"
              register={register("projectImage", { required: "an image" })}
              error={errors.projectImage}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              title="Project Type"
              type="text"
              name="ProjectType"
              placeholder="Enter Project Type"
              register={register("projectType", { required: "a project type" })}
              error={errors.projectType}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <FormInput
              title="Project Title"
              type="text"
              name="ProjectName"
              placeholder="Enter Project Title"
              register={register("projectTitle", {
                required: "a project title",
              })}
              error={errors.projectTitle}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              title="Project Link"
              type="text"
              name="ProjectLink"
              placeholder="Enter Project Link"
              register={register("projectLink", { required: "a project link" })}
              error={errors.projectLink}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <label htmlFor="ProjectDescription" className="form-label">
              Project Description
            </label>
            <textarea
              id="ProjectDescription"
              className={`form-control ${
                errors.projectDescription ? "is-invalid" : ""
              }`}
              placeholder="Enter Project Description"
              {...register("projectDescription", {
                required: "a project description is required",
              })}
            ></textarea>
            {errors.projectDescription && (
              <div className="invalid-feedback">
                {errors.projectDescription.message}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <h2 className="text-white mt-2 text-center">Project List</h2>
      <div style={{ height: "25vh", overflowY: "auto" }}>
        <table className="table table-striped table-dark mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Project Link</th>
              <th>Project Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) && projects?.length > 0 ? (
              projects.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.ProjectName}</td>
                  <td>{project.ProjectType}</td>
                  <td>
                    <a
                      href={project.ProjectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white"
                    >
                      {project.ProjectLink}
                    </a>
                  </td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/img/${project.ProjectProfile}`}
                      alt={project.ProjectName}
                      className="img-fluid"
                      style={{ width: "100px", height: "10vh" }}
                    />
                  </td>
                  <td>
                    <Link to={`/ProjectUpdate/${project.id}`}>Update</Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-danger btn-sm ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;

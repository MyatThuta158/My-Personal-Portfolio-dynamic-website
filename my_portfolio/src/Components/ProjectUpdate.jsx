import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../Layouts/FormInput";
import axios from "axios";
import { useAuth } from "./Auth";
import { useNavigate, useParams } from "react-router-dom";

function ProjectUpdate() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const { storedToken } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/ProjectUpdateShow/${id}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const data = response.data[0];
        if (data) {
          setValue("ProjectName", data.ProjectName || "");
          setValue("ProjectType", data.ProjectType || "");
          setValue("ProjectLink", data.ProjectLink || "");
          setValue("ProjectDescription", data.ProjectDescription || "");
          setImg(data.ProjectProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.ProjectProfile[0] && img !== data.ProjectProfile[0]) {
      formData.append("ProjectProfile", data.ProjectProfile[0]);
    } else {
      formData.append("ProjectProfile", img);
    }
    formData.append("ProjectName", data.ProjectName);
    formData.append("ProjectType", data.ProjectType);
    formData.append("ProjectLink", data.ProjectLink);
    formData.append("ProjectDescription", data.ProjectDescription);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://127.0.0.1:8000/ProjectUpdate/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const textMessage = response.data;
      if (textMessage && textMessage.message) {
        alert(textMessage.message);
        navigate("/Projects");
      } else {
        console.error("Unexpected response format:", response.data);
      }
      reset();
    } catch (error) {
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-black border-1 mt-5 w-75">
      <h1 className="mb-4 text-white text-center">Update Project</h1>
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
              placeholder="Upload New Project Image"
              register={register("ProjectProfile")}
              error={errors.projectImage}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              title="Project Type"
              type="text"
              name="ProjectType"
              placeholder="Enter New Project Type"
              register={register("ProjectType", { required: "a project type" })}
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
              placeholder="Enter New Project Title"
              register={register("ProjectName", {
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
              placeholder="Enter New Project Link"
              register={register("ProjectLink", { required: "a project link" })}
              error={errors.projectLink}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <label
              htmlFor="ProjectDescription"
              className="form-label text-white"
            >
              Project Description
            </label>
            <textarea
              id="ProjectDescription"
              className="form-control"
              placeholder="Enter Project Description"
              {...register("ProjectDescription", { required: "a description" })}
            />
            {errors.ProjectDescription && (
              <span className="text-danger">
                {errors.ProjectDescription.message}
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default ProjectUpdate;

import React, { useEffect, useState } from "react";
import FormInput from "../Layouts/FormInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./Auth";

function SettingIntro() {
  //----------This is form handling process-----//
  const {
    register,
    handleSubmit,
    setValue, // To set the input values manually
    formState: { errors },
  } = useForm();

  const { storedToken } = useAuth();
  const [img, setImg] = useState();
  const actualToken = storedToken;
  console.log(storedToken);

  //----This is for mode choice---//
  const [mode, setMode] = useState("Save");

  //----This is initial data----//
  const [initialData, setInitialdata] = useState(null);

  //----this fetches the data from backend---//
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/getlandinginfo",
          {
            headers: {
              Authorization: `Bearer ${actualToken}`,
            },
          }
        );
        const data = response.data;
        setInitialdata(data);
        console.log(data);

        // Prepopulate the form fields if data exists
        if (data) {
          setImg(data.ProfilePhoto);
          setValue("Icon1", data.Icon1 || "");
          setValue("Icon2", data.Icon2 || "");
          setValue("Icon3", data.Icon3 || "");
          setValue("Icon4", data.Icon4 || "");
          setValue("IconLink1", data.IconLink1 || "");
          setValue("IconLink2", data.IconLink2 || "");
          setValue("IconLink3", data.IconLink3 || "");
          setValue("IconLink4", data.IconLink4 || "");
          setValue("Description", data.Description || "");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [actualToken, setValue]);

  const formHandle = async (data) => {
    //----------Create FormData to send data---------//
    const formData = new FormData();

    //---------Append the image file (ProfilePhoto) to FormData-----------//

    if (data.ProfilePhoto[0] && img !== data.ProfilePhoto[0]) {
      formData.append("ProfilePhoto", data.ProfilePhoto[0]);
    } else {
      formData.append("ProfilePhoto", img);
    }

    //-------------Append other form fields-----------//
    formData.append("Icon1", data.Icon1);
    formData.append("Icon2", data.Icon2);
    formData.append("Icon3", data.Icon3);
    formData.append("Icon4", data.Icon4);
    formData.append("IconLink1", data.IconLink1);
    formData.append("IconLink2", data.IconLink2);
    formData.append("IconLink3", data.IconLink3);
    formData.append("IconLink4", data.IconLink4);
    formData.append("Description", data.Description);

    try {
      const url =
        mode === "Save"
          ? "http://127.0.0.1:8000/introinfo" // Save endpoint
          : "http://127.0.0.1:8000/updateintroinfo"; // Update endpoint

      const response = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${actualToken}`,
        },
      });

      const responseText = response.data;

      if (responseText && typeof responseText === "object") {
        const { messageSuccess } = responseText;
        if (messageSuccess) {
          window.alert(messageSuccess);
          console.log(messageSuccess);
        } else {
          console.error("No 'messageSuccess' field in response");
        }
      } else {
        console.error("Unexpected response format:", responseText);
      }
    } catch (error) {
      console.error("Server response error:", error.response?.data || error);
    }
  };

  return (
    <div className="w-75 mx-auto my-5">
      <form
        method="POST"
        className="p-4 border border-white mx-auto w-100"
        encType="multipart/form-data"
        style={{ borderRadius: "15px" }}
        onSubmit={handleSubmit(formHandle)}
      >
        <h1 className="text-center text-white">Intro Setting</h1>
        <div className="d-flex w-75 mx-auto justify-content-between text-white my-3">
          <FormInput
            title={"Profile Picture"}
            type={"file"}
            placeholder={"Add Profile photo"}
            name={"ProfilePhoto"}
            register={register("ProfilePhoto")}
            error={errors.ProfilePhoto}
          />

          <FormInput
            title={"Contact Link Icon 1"}
            type={"text"}
            name={"Icon1"}
            placeholder={"Add contact link icon only with Bootstrap"}
            register={register("Icon1", {
              required: "Icon1 is required",
            })}
            error={errors.Icon1}
          />
        </div>
        <div className="d-flex w-75 mx-auto justify-content-between text-white my-3">
          <FormInput
            title={"Contact Link Icon 2"}
            type={"text"}
            name={"Icon2"}
            placeholder={"Add contact link icon only with Bootstrap"}
            register={register("Icon2", {
              required: "Icon2 is required",
            })}
            error={errors.Icon2}
          />
          <FormInput
            title={"Contact Link Icon 3"}
            type={"text"}
            name={"Icon3"}
            placeholder={"Add contact link icon "}
            register={register("Icon3", { required: "Icon3 is required" })}
            error={errors.Icon3}
          />
        </div>

        <div className="d-flex w-75 mx-auto justify-content-between text-white my-3">
          <FormInput
            title={"Contact Link Icon 4"}
            type={"text"}
            name={"Icon4"}
            placeholder={"Add contact link icon only with Bootstrap"}
            register={register("Icon4", { required: "Icon4 is required" })}
            error={errors.Icon4}
          />
          <FormInput
            title={"Contact Link 1"}
            type={"text"}
            name={"IconLink1"}
            placeholder={"Add contact link "}
            register={register("IconLink1", { required: "Link1 is required" })}
            error={errors.IconLink1}
          />
        </div>

        <div className="d-flex w-75 mx-auto justify-content-between text-white my-3">
          <FormInput
            title={"Contact Link 2"}
            type={"text"}
            name={"IconLink2"}
            placeholder={"Add contact link "}
            register={register("IconLink2", { required: "Link2 is required" })}
            error={errors.IconLink2}
          />
          <FormInput
            title={"Contact Link 3"}
            type={"text"}
            name={"IconLink3"}
            placeholder={"Add contact link "}
            register={register("IconLink3", { required: "Link3 is required" })}
            error={errors.IconLink3}
          />
        </div>
        <div className="d-flex w-75 mx-auto justify-content-between text-white my-3">
          <FormInput
            title={"Contact Link 4"}
            type={"text"}
            name={"IconLink4"}
            placeholder={"Add contact link "}
            register={register("IconLink4", { required: "Link4 is required" })}
            error={errors.IconLink4}
          />
          <div className="form-floating ">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              name="Description"
              style={{ width: "20vw", height: "100%" }}
              {...register("Description", {
                required: "Description is required",
              })}
            ></textarea>
            <label htmlFor="floatingTextarea2" className="text-black">
              Description for Intro
            </label>
            {errors.Description && (
              <p className="text-danger">{errors.Description.message}</p>
            )}
          </div>
        </div>

        <div className="d-flex w-50 mx-auto justify-content-center">
          <input
            type="submit"
            value="Save"
            className="w-25 bg-warning text-white mx-2 d-flex justify-content-center p-2"
            style={{ borderRadius: "15px" }}
            onClick={() => setMode("Save")}
          />
          <input
            type="submit"
            value="Update"
            className="w-25 bg-warning text-white mx-2 d-flex justify-content-center p-2"
            style={{ borderRadius: "15px" }}
            onClick={() => setMode("Update")}
          />
        </div>
      </form>
    </div>
  );
}

export default SettingIntro;

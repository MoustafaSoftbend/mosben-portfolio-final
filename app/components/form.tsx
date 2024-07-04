"use client";

// import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faEnvelope,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Send data to backend or do whatever you want
  };

  useEffect(() => {
    const input = document.querySelectorAll(".contact-form .input-box input");
    input.forEach((inputField) => {
      inputField.addEventListener("focus", () => {
        if (inputField.value.trim() !== "") {
          document.documentElement.style.setProperty(
            "--animation-color",
            "#03c7ad",
          );
        } else {
          document.documentElement.style.setProperty(
            "--animation-color",
            "orange",
          );
        }
      });

      // Add event listener for input
      inputField.addEventListener("input", () => {
        if (inputField.value.trim() !== "") {
          document.documentElement.style.setProperty(
            "--animation-color",
            "#03c7ad",
          );
        }
      });
    });

    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors).length);
      document.documentElement.style.setProperty("--animation-color", "red");
    } else {
      document.documentElement.style.setProperty("--animation-color", "orange");
    }
  }, [errors]);

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="min-[500px]:flex min-[500px]:flex-row">
        <label
          className={errors.firstName ? "red-shadow" : ""}
          htmlFor="first-name"
        >
          <FontAwesomeIcon className="icon" icon={faUser} />
          <div className="input-box">
            <input
              placeholder="First Name"
              name="first-name"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <span className="error-span">{errors.firstName.message}</span>
            )}
            <span className="label-span">First Name</span>
          </div>
        </label>

        <label htmlFor="last-name">
          <FontAwesomeIcon className="icon" icon={faUsers} />
          <div className="input-box">
            <input
              {...register("lastName", { required: "Last Name is required" })}
              placeholder="Last Name"
              name="last-name"
            />
            {errors.lastName && (
              <span className="error-span">{errors.lastName.message}</span>
            )}
            <span className="label-span">Last Name</span>
          </div>
        </label>
      </div>

      <label htmlFor="email">
        <FontAwesomeIcon className="icon" icon={faEnvelope} />
        <div className="input-box">
          <input
            placeholder="example@company.com"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="error-span">{errors.email.message}</span>
          )}
          <span className="label-span">Email</span>
        </div>
      </label>
      <label className="message-label" htmlFor="message">
        <FontAwesomeIcon className="icon" icon={faMessage} />
        <div className="input-box">
          <textarea
            placeholder="Write message here..."
            name="message"
            {...register("message", { required: "Message is required" })}
          />
          <span className="message-label">Message</span>
          {errors.message && (
            <span className="error-span">{errors.message.message}</span>
          )}
        </div>
      </label>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => {
          console.log(errors);
        }}
      >
        <span className="submit-text">Send</span>
        <FontAwesomeIcon className="icon" icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default Form;

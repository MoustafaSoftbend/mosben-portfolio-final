"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef , useState} from "react";

import {sendEmail} from "../controller/sendMailer"

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

  const sendData = async (data:any) => {
    const {firstName, lastName, email,message} = data
    try {
      const inquiry = await sendEmail({firstName, lastName, email,message});
      return inquiry

    } catch (error) {
      console.error("Error fetching screenshots:", error);
    }
    
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (Object.keys(errors).length > 0) {
    console.log(Object.keys(data).length);

      document.documentElement.style.setProperty(
        "--animation-color",
        "red",
      );
    } 
    // Send data to backend or do whatever you want
    const {firstName, lastName, email,message} = data
    if (errors && Object.keys(errors).length > 0 && warnMessage){
      warnMessage.current?.classList.add('warning-error')
    } else {
      warnMessage.current?.classList.remove('warning-error')

    }
    if (firstName && lastName && email  && message) {   

    const response = await sendData({firstName, lastName, email,message});
    if (response.status === 200 && warnMessage){
      warnMessage.current?.classList.add('warning-sucess ')
    }else {
      warnMessage.current?.classList.remove('warning-sucess ')
    }
    }
  };

  const inputRef = useRef<NodeListOf<HTMLInputElement | HTMLTextAreaElement>>();
  const warnMessage = useRef<HTMLSpanElement | null>(null);


  useEffect(() => {
    warnMessage.current = document.querySelector(".warning-form-data")
    console.log(warnMessage.current)
    inputRef.current = document.querySelectorAll(".contact-form .input-box input, .contact-form .input-box textarea");
    inputRef.current.forEach((inputField) => {
      inputField.addEventListener("focus", () => {
        if ((inputField as HTMLInputElement).value.trim() !== "" && Object.keys(errors).length === 0) {
          document.documentElement.style.setProperty(
            "--animation-color",
            "orange",
          );
        } else {
          document.documentElement.style.setProperty(
            "--animation-color",
            "red",
          );
        }
      });
      
      // Add event listener for input
      inputField.addEventListener("input", () => {
          document.documentElement.style.setProperty(
            "--animation-color",
            "#03c7ad",
          );
      });


      inputField.addEventListener("blur", () => {
        if ((inputField as HTMLInputElement).value.trim() !== "" && Object.keys(errors).length === 0) {
          document.documentElement.style.setProperty(
            "--animation-color",
            "red",
          );
        // } else {
        //   document.documentElement.style.setProperty(
        //     "--animation-color",
        //     "orange",
        //   );
        }
      });
    });



    if (Object.keys(errors).length > 0) {
      console.log(Object.keys(errors).length);
      document.documentElement.style.setProperty("--animation-color", "red");
    } else {
      document.documentElement.style.setProperty("--animation-color", "orange");
    }

  }, [inputRef, errors, warnMessage]);
  
  const sumbmitQuery:any= async  (message:any)  => {
    const sendAction = await sendEmail(message)
    if (sendAction.status && sendAction.status === 200){
      console.log('email sent')
    }else {
      console.log('email Not sent')
    }
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-body min-[500px]:flex min-[500px]:flex-row pr-[3]">
        <label
          className={errors.firstName ? "red-shadow" : ""}
          htmlFor="first-name"
        >
          <FontAwesomeIcon className="icon" icon={faUser} />
          <div className="input-box">
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is required",
                minLength: {
                  value: 2,
                  message: "At least 2 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "cannot exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only contain alphabetic characters",
                },
              })}
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
              {...register("lastName", {
                required: "Last Name is required",
                minLength: {
                  value: 2,
                  message: "Last Name must be at least 2 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Last Name cannot exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Last Name can only contain alphabetic characters",
                },
              })}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <span className="error-span">{errors.lastName.message}</span>
            )}
            <span className="label-span">Last Name</span>
          </div>
        </label>
      </div>
      <div className="form-body">
      <label htmlFor="email">
        <FontAwesomeIcon className="icon" icon={faEnvelope} />
        <div className="input-box">
          <input
            placeholder="example@company.com"
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
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters long",
              },
            })}
          />
          <span className="message-label" >Message</span>
          {errors.message && (
            <span className="error-span">{errors.message.message}</span>
          )}
        </div>
      </label>
      </div>

      <button
        className="btn btn-primary"
        type="submit"
      >
        <span className="submit-text">Send</span>
        <FontAwesomeIcon className="icon" icon={faPaperPlane} />
      </button>
    </form>
  );
};

export default Form;

"use client";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PerrorClass,
  buttonClass,
  inputBaseClass,
  inputErrorClass,
  labelClass,
} from "@/utils/formstyles";

import { motion } from "framer-motion";
import { useRouter } from "next/router";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  yesNoQuestion: string;
  RelationshipWithSponsor?: string;
  metWithSponsor?: string;
  ApplicantSourceOfIncome?: string;
  SponsorSourceOfIncome?: string;
  incomeRange?: string;
  typeofVisa: string;
};

const Booking = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 1000ms or 1 second, adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const createcontact = await axios.post("/api/free15mins", data);

      console.log(createcontact);

      setIsLoading(false);

      toast.success("Congratulations, You're qualified!");

      setTimeout(() => {
        router.push("https://meetings-eu1.hubspot.com/mgiukgroup/clone");
      }, 5000);
    } catch (error) {
      toast.error(
        "Sorry, you've already qualified for our free 15-mins consultation."
      );
      console.log(error);
      setIsLoading(false);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-700 transition-all ease-in-out duration-500 p-8 rounded-lg shadow-md w-full xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {`Ready to explore UK? Find out if you qualify for a free 15-minute consultation with our expert consultants!`}
          <br></br>
          <br></br>
          {
            "Just enter your email below and let's see if we can help make your global dreams a reality."
          }
        </h1>

        <hr className="mb-3"></hr>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4 space-y-4">
            <label htmlFor="email" className={`${labelClass} 2xl:text-2xl`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`${inputBaseClass} ${
                errors.email ? inputErrorClass : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className={PerrorClass}>{errors.email.message}</p>
            )}
          </div>
          {isLoading ? (
            <BeatLoader size={10} color="#123abc" loading={isLoading} />
          ) : (
            <button
              type="submit"
              className={`w-full ${buttonClass} xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl`}
            >
              Am I Qualified?
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;

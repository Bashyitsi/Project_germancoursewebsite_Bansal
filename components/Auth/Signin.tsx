"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Registration = () => {
  const [data, setData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    gender: "",
    germanLevel: "",
    registering: "",
    timeSession: "",
    paymentMode: "",
    paymentVia: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Registration successful! We will contact you soon.',
      });
      setData({
        email: "",
        name: "",
        phoneNumber: "",
        gender: "",
        germanLevel: "",
        registering: "",
        timeSession: "",
        paymentMode: "",
        paymentVia: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          {/* Background elements remain the same */}
          
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Registration Form
            </h2>

            {submitStatus.type && (
              <div className={`mb-4 p-4 rounded ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                />

                <input
                  type="text"
                  placeholder="Name (First, middle and last name)"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                />

                <input
                  type="tel"
                  placeholder="Phone Number (07xxxxxxxx)"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                />

                <div className="flex flex-col gap-3">
                  <label className="text-black dark:text-white">Gender</label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Prefer not to say"].map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={data.gender === option}
                          onChange={handleChange}
                          className="form-radio text-primary focus:ring-primary dark:text-primary dark:focus:ring-primary"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-black dark:text-white">Knowledge of German Language</label>
                  <select
                    name="germanLevel"
                    value={data.germanLevel}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  >
                    <option value="">Select level</option>
                    {["Basic", "Intermediate", "Advanced", "Native", "None"].map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-black dark:text-white">Registering for</label>
                  <select
                    name="registering"
                    value={data.registering}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  >
                    <option value="">Select level</option>
                    {["A1", "A2", "B1", "B2","Exam Preparation"].map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-black dark:text-white">Time Session</label>
                  <select
                    name="timeSession"
                    value={data.timeSession}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  >
                    <option value="">Select Time</option>
                    {[
                      "Morning 8-10 AM",
                      "Day 10-12 PM",
                      "Evening 18- 20 PM",
                      "Weekend 9- 12 PM",
                      "Online"
                    ].map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-black dark:text-white">Payment mode</label>
                  <select
                    name="paymentMode"
                    value={data.paymentMode}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  >
                    <option value="">Select payment mode</option>
                    {[
                      "Full installment ",
                      "Pay 3 levels ( 500,000 Rwf )"
                    ].map((mode) => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-black dark:text-white">Payment via</label>
                  <select
                    name="paymentVia"
                    value={data.paymentVia}
                    onChange={handleChange}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee"
                  >
                    <option value="">Select payment method</option>
                    {["Cash", "Momo", "Bank a/c "].map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center mb-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Register"
                  className={`inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Registration;
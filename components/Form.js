import React from "react";
import { Formik, Field, Form } from "formik";
import { v4 as uuidv4 } from "uuid";

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", gender: "male", phone: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        const reqBody = {
          id: uuidv4(),
          ...values,
        };

        let jsonData = localStorage.getItem("data");

        if (jsonData) {
          let data = JSON.parse(jsonData);
          localStorage.setItem("data", JSON.stringify([...data, reqBody]));
          resetForm();
        } else {
          localStorage.setItem("data", JSON.stringify([reqBody]));
          resetForm();
        }

        setSubmitting(false);
      }}
    >
      {(formikBag) => (
        <Form className="h-screen flex justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-2 ">
              <div className="grid grid-cols-2">
                <label htmlFor="name">Name:</label>
                <Field
                  name="name"
                  type="text"
                  className="border border-gray-300 form-input"
                />
              </div>

              <div className="grid grid-cols-2">
                <label htmlFor="email">Email Address:</label>
                <Field
                  name="email"
                  type="email"
                  className="border border-gray-300 form-input"
                />
              </div>

              <div className="grid grid-cols-2">
                <label htmlFor="gender">Gender:</label>
                <Field
                  className="border border-gray-300 form-input"
                  name="gender"
                  as="select"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="404">404 not found</option>
                </Field>
              </div>

              <div className="grid grid-cols-2">
                <label htmlFor="phone">Phone:</label>
                <Field
                  name="phone"
                  type="text"
                  className="border border-gray-300 form-input"
                />
              </div>
            </div>

            <button className="p-2 border border-gray-500" type="submit">
              {formikBag.isSubmitting ? "..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

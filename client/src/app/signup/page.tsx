"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { signup } from "@/utils";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
const UserForm = () => {
  let loginSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "USER",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await signup(values);
        router.push("/login");
      } catch (err) {
        console.error(err);
      }
    },
  });
  return (
    <div className="flex">
      <div className="w-1/3 ml-[100px] mt-[326px] flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Create your account</h1>
        <p>Sign up to explore your favorite dishes.</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="border-2"
            placeholder="Enter your new email"
          ></Input>
          {formik.errors.email && <div>{formik.errors.email}</div>}
          <Input
            name="password"
            value={formik.values.password}
            className="border-2"
            onChange={formik.handleChange}
            placeholder="Enter your strong password"
          ></Input>
          <button
            type="submit"
            className="w-full border-2 bg-[#18181B] text-white py-2 rounded-2xl"
          >
            Let's go
          </button>
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </form>
        <p className="text-center">
          Already have an account?
          <span className="text-blue-400" onClick={() => router.push("/login")}>
            Log in
          </span>
        </p>
      </div>
      <div className="px-5 py-5 w-2/3">
        <img src="/loginimage.jpg" className="w-full h-full" alt="LoginImage" />
      </div>
    </div>
  );
};
export default UserForm;

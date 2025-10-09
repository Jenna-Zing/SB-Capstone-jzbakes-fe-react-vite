import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { loginUser } from "@/api/auth";
import { toast } from "react-toastify";
import { showFriendlyFetchError } from "@/utils/errorHandlers";
import { loginSchema } from "@/validations/loginSchema";
import * as yup from "yup";

function LoginPage() {
  const { setUser } = useUser(); // this will allow us to update the user state after login
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // clear the field error on change
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // clear any previous errors
      setErrors({});

      await loginSchema.validate(formData, { abortEarly: false }); // run full form validation

      // form validation is successful, proceed with login
      const { user } = await loginUser(formData);

      setUser({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        setUser: setUser, // pass down setUser function to the user state, so it still works within the user context
        isLoggedIn: true,
      });

      toast.success("Login successful!  Redirecting to home page...");
      navigate("/");
    } catch (err: any) {
      // handle yup validation errors
      if (err.name === "ValidationError") {
        const errorMap: { [key: string]: string } = {};
        err.inner.forEach((validationError: yup.ValidationError) => {
          if (validationError.path) {
            errorMap[validationError.path] = validationError.message;
          }
        });
        setErrors(errorMap);
      } else {
        showFriendlyFetchError(err, "Login failed");
      }
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* ^ Center the form and limit its width */}

      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="size-fit mx-auto block ">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;

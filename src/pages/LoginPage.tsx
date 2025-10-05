import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import { loginUser } from "@/api/auth";
import { toast } from "react-toastify";
import { showFriendlyFetchError } from "@/utils/errorHandlers";

function LoginPage() {
  const { setUser } = useUser(); // this will allow us to update the user state after login
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await loginUser(formData);

      setUser({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: user.accessToken,
        setUser: setUser, // pass down setUser function to the user state, so it still works within the user context
        isLoggedIn: true, // the user is now logged in
      });

      toast.success("Login successful!  Redirecting to home page...");
      navigate("/");
    } catch (err) {
      showFriendlyFetchError(err, "Login failed");
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
        </div>

        <Button type="submit" className="size-fit mx-auto block ">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;

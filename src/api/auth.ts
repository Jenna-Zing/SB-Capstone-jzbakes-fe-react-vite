import { fetchJson } from "./api_wrapper";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginUserResponse {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
  };
}

export async function loginUser(
  formData: LoginFormData
): Promise<LoginUserResponse> {
  return await fetchJson<LoginUserResponse>(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include", // include cookies in the request
  });
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  username: string;
}

interface SignupUserResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export async function signupUser(
  formData: SignupFormData
): Promise<SignupUserResponse> {
  return await fetchJson<SignupUserResponse>(`${API_URL}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

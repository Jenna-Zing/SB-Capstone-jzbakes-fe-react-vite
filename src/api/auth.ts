import type { UserContextType } from "@/context/UserContext";
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

export async function restoreUserSession(): Promise<Omit<
  UserContextType,
  "setUser"
> | null> {
  try {
    const res = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      credentials: "include", // sends httpOnly cookie
    });

    if (!res.ok) {
      throw new Error("Failed to contact server");
    }

    const user = await res.json();

    if (!user) {
      return null; // not logged in or session expired
    }

    // return user info retrieved from valid session cookie; defaults to null for error-cases above for user context
    return {
      username: user.username ?? null,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      email: user.email ?? null,
    };
  } catch (error) {
    console.error("Unexpected error restoring session:", error);
    return null; // return null as fallback, since no valid session could be restored
  }
}

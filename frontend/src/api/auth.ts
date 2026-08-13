import api from "./axios";

export async function login(
  email: string,
  password: string
) {
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);

  const response = await api.post(
    "/auth/login",
    form,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

export async function adminLogin(
  email: string,
  password: string
) {
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);

  const response = await api.post(
    "/auth/admin/login",
    form,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

export async function register(data: {
  full_name: string;
  email: string;
  password: string;
}) {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
}

export async function me() {
  const response = await api.get("/auth/me");

  return response.data;
}
const api = import.meta.env.VITE_API;

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const data = JSON.stringify(userData);
    const response = await fetch(`${api}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error(jsonData.message);
    }
    return jsonData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

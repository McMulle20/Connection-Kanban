// utils/auth.ts (or wherever you're implementing this)
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Send the userInfo object as the request body
    });

    const data = await response.json(); // Parse the JSON response

    if (response.ok) {
      // Assuming the server returns a token
      console.log('Login successful:', data.token);
      // Store the token or proceed with any post-login actions
      return data.token;
    } else {
      console.error('Login failed:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

export { login };

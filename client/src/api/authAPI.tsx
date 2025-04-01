import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string;
}

const login = async (loginData: UserLogin): Promise<LoginResponse | null> => {
  try {
    // Make a POST request to the login route
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData), // Send the loginData object as the request body
    });

    // Read the error response as text
    const responseText = await response.text(); 
    console.log('Raw response:', responseText); // Log the raw response to inspect

    if (!response.ok) {
      console.error('Login failed:', responseText); // Log the error message from the server
      return null;
    }

    // Parse the JSON response only if the status is OK
    if (responseText) {
      const data: LoginResponse = JSON.parse(responseText); 
      console.log('Login successful:', data.token); // Log the token from the response

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      return data; // Return the token if login is successful
    }

    console.error('Login Failed: Empty response');
    return null;
  } catch (error) {
    console.error('Error during login:', error); // Log any error that occurs during the fetch
    return null;
  }
};

export { login };

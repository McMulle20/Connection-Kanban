import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

class AuthService {
  // Get profile information from the decoded JWT
  getProfile(): CustomJwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<CustomJwtPayload>(token);
      } catch (error) {
        console.error('Error decoding token:', error); // Log error if decoding fails
        return null;
      }
    }
    return null;
  }

  // Check if user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token has expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp < Date.now() / 1000; // Convert to seconds and check if expired
      }
      return true; // if there's no expiration, consider it expired
    } catch (err) {
      console.error('Error decoding token:', err); // Log error if decoding fails
      return true; // Assume token is invalid if decoding fails
    }
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Getting token from localStorage:', token);  // Log the token when retrieving
    return token;
  }

  // Login the user and store the token in localStorage
  login(idToken: string): void {
    console.log('Saving token:', idToken);  // Log the token received during login
    if (idToken) {
      localStorage.setItem('token', idToken); // Store token in localStorage
      console.log('Token stored in localStorage:', localStorage.getItem('token')); // Log the stored token
    } else {
      console.error('Received an invalid token:', idToken); // Log an error if the token is invalid
    }
  }

  // Logout the user by removing the token from localStorage
  logout(): void {
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
    window.location.href = '/login'; // Redirect to login page
  }
}

export default new AuthService();

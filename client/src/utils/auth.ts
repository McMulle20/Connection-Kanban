import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return false;

      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    } catch (error) {
      return true; // If decoding fails, assume token is invalid
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.href = '/'; // Redirect to home page
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  }
}

export default new AuthService();

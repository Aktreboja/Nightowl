import { TokenResponse, CurrentToken } from "../../types";

const currentToken: CurrentToken = {
    get access_token() {
      return localStorage.getItem('access_token');
    },
    get refresh_token() {
      return localStorage.getItem('refresh_token');
    },
    get expires_in() {
      return localStorage.getItem('refresh_in') ;
    },
    get expires() {
      return localStorage.getItem('expires');
    },
  
    save: function (response: TokenResponse) {
      const { access_token, refresh_token, expires_in } = response;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in.toString());
  
      // Generate a Unix Timestamp for easier refresh comparisons
      const now = Date.now();
      const expiry = new Date(now + expires_in * 1000);
      localStorage.setItem('expires', expiry.toString());
    },

    validateToken: function(currentDatetime: number,expires:  number) {
      return currentDatetime >= expires
    }

  };
  
  export default currentToken;
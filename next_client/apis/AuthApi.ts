import myFetch from "@/utils/myFetch";

class AuthApi {
  static logoutUser = () => myFetch("users/logout", "POST");
  static loginUser =  (body: any) => {
    const response = myFetch('users/login', 'POST', body)
    return response
  
  }
  static registerUser =  (body: any) => {
    const response = myFetch('users/register', 'POST', body)
    return response
  
  }
  static getUserInfo = () => myFetch("users/me", "GET");
}

export default AuthApi
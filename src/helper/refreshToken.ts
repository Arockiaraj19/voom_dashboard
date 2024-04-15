import { axiosPrivate } from "./axiosPrivate";


const refreshTokenFn = async () => {
   

  try {
    const localStorageSession:string| null=localStorage.getItem("session");
    let localSession ;
   if(localStorageSession!=null){
    localSession= JSON.parse(localStorageSession);
   }

    const response:any = await axiosPrivate.post("/v1/auth/renew_token", {
      token:localSession?.refreshToken,
    });

    const session= response.data;

    if (!session?.accessToken) {
      localStorage.removeItem("session");
      localStorage.removeItem("user");
      // window.location.href="/";
    }

    localStorage.setItem("session", JSON.stringify(session));

    return session;
  } catch (error) {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
    // window.location.href="/";
  }
};



export default refreshTokenFn ;
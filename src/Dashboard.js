import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [fbUserAccessToken, setFbUserAccessToken] =useState();
  const [fbPageAccessToken, setFbPageAccessToken] = useState();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const PAGE_ID ="104964737747276"

  const logInToFB = React.useCallback(() => {
    window.FB.login((response) => {
      setFbUserAccessToken(response.authResponse.accessToken);
      console.log(fbUserAccessToken,response)
      const userid = response.authResponse.userID
      window.FB.api(`${userid}`,function(response) {
        console.log(response)
      });
    });
  }, []);
   
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api(
        `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
        ({ access_token }) => setFbPageAccessToken(access_token)
      );
    }
  }, [fbUserAccessToken]);


  const logOutOfFB = React.useCallback(() => {
    window.FB.logout(() => {
      setFbUserAccessToken(null);
      setFbPageAccessToken(null);
    });
  }, []);

  const PageMessages = React.useCallback(() => {
    navigate("/messages")
  }, []);




  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      {!fbUserAccessToken ?
      <div className="dashboard__container">
      Facebook Page Integrated
     <button className="dashboard__btn" style={{marginTop:50,backgroundColor:'#03203C'}} onClick={logInToFB}>
       Connect Page
      </button>
    </div> :
    <div className="dashboard__container">
    Facebook Page Integrated
    <h4>Integrated Page : </h4>
    <button className="dashboard__btn" style={{backgroundColor:'red'}} onClick={logOutOfFB}>
      
      Delete Integration
    </button>
    <button className="dashboard__btn" style={{backgroundColor:'#03203C'}} onClick={PageMessages}>
      Reply to Messages 
    </button>
  </div>
      }
    </div>
  );
}

export default Dashboard;

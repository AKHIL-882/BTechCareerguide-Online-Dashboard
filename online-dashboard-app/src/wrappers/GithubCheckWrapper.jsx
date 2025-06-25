import React, { useEffect, useState } from "react";
import GithubId from "../Components/User/GithubId";
import { getUserDetails } from "../Api";

const GithubCheckWrapper = () => {
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const localData = localStorage.getItem("data");

      if (!localData) {
        console.warn("No auth data found in localStorage.");
        return;
      }

      const accessToken = JSON.parse(localData)?.access_token;
      if (!accessToken) {
        console.warn("Access token missing.");
        return;
      }

      try {
        const user = await getUserDetails(accessToken);
        console.log("User fetched:", user);

        if (!user?.has_github_username && user?.id) {
          setUserId(user.id);
          setShowGithubModal(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      {showGithubModal && userId && (
        <GithubId userId={userId} onClose={() => setShowGithubModal(false)} />
      )}
    </>
  );
};

export default GithubCheckWrapper;

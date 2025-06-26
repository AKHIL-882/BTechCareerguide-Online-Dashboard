import React, { useEffect, useState } from "react";
import GithubId from "../Components/User/GithubId";
import { getUserDetails } from "../Api";

const GithubCheckWrapper = () => {
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const localData = localStorage.getItem("data");
      const accessToken = JSON.parse(localData)?.access_token;
      try {
        const user = await getUserDetails(accessToken);

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

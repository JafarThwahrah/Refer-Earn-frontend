import React, { useState, useEffect } from "react";
import FamilyTree from "../../components/FamilyTree";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function MyClients() {
  const [familyTreeData, setFamilyTreeData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(`profile/get-referrals-tree`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: abortController.signal,
        });
        console.log(response);

        setFamilyTreeData(response.data.data); // Set the received data
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.log(error);
        }
      }
    })();

    // Clean up the abort controller
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="tree_profile">
      {familyTreeData && <FamilyTree familyTreeData={familyTreeData} />}
    </div>
  );
}

export default MyClients;

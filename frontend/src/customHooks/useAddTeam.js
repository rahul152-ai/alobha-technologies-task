import { useState } from "react";
import { toast } from "react-toastify";
import { ProtectedApi } from "../api/axiosApis";

const useAddTeam = () => {
  const [loading, setLoading] = useState(false);

  const addTeam = async (data, goBack) => {
    try {
      setLoading(true);
      const response = await ProtectedApi.addTeam(data);

      toast.success(response.message);
      if (goBack) {
        goBack();
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { addTeam, loading };
};

export default useAddTeam;

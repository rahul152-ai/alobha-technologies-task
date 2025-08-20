import { useState } from "react";
import { toast } from "react-toastify";
import { ProtectedApi } from "../api/axiosApis";

const useAddUser = () => {
  const [loading, setLoading] = useState(false);

  const addUser = async (data, goBack) => {
    try {
      setLoading(true);
      const response = await ProtectedApi.addUser(data);

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

  return { addUser, loading };
};

export default useAddUser;

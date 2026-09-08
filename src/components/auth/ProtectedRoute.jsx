import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../hooks/useAuth";


function ProtectedRoute({ children }) {

  const {
    user,
    loading,
  } = useAuth();


  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-[#0b101b]">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-sm text-slate-400">
            Loading FinTrack...
          </p>

        </div>

      </div>

    );

  }


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return children;

}


export default ProtectedRoute;
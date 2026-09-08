import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  User,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  LogIn,
} from "lucide-react";

import {
  useAuth,
} from "../hooks/useAuth";
import { getUserFriendlyError } from "../utils/errors";


function Login() {

  const navigate = useNavigate();


  const {
    signIn,
  } = useAuth();


  const [username, setUsername] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [errorMessage, setErrorMessage] =
    useState("");


  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    setErrorMessage("");

    setLoading(true);


    const {
      error,
    } =
      await signIn(
        username,
        password
      );


    setLoading(false);


    if (error) {

      setErrorMessage(getUserFriendlyError(error, "Unable to sign in. Check your username and password."));

      return;

    }


    navigate("/");

  };


  return (

    <div className="flex min-h-screen bg-[#0b101b]">


      {/* LEFT SIDE */}

      <div className="hidden w-1/2 flex-col justify-between border-r border-slate-800 bg-[#0d1420] p-12 lg:flex">


        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">

            <Wallet
              size={21}
              className="text-white"
            />

          </div>


          <h1 className="text-xl font-bold text-white">

            FinTrack

          </h1>

        </div>


        <div>

          <h2 className="max-w-md text-4xl font-bold leading-tight text-white">

            Take control of your financial future.

          </h2>


          <p className="mt-5 max-w-md leading-relaxed text-slate-400">

            Track your income, expenses, budgets,
            and financial goals in one place.

          </p>


          <div className="mt-10 grid grid-cols-3 gap-4">

            <div className="rounded-xl border border-slate-800 bg-[#111927] p-4">

              <p className="text-xl font-bold text-blue-400">

                100%

              </p>

              <p className="mt-1 text-xs text-slate-500">

                Private

              </p>

            </div>


            <div className="rounded-xl border border-slate-800 bg-[#111927] p-4">

              <p className="text-xl font-bold text-emerald-400">

                Easy

              </p>

              <p className="mt-1 text-xs text-slate-500">

                To Use

              </p>

            </div>


            <div className="rounded-xl border border-slate-800 bg-[#111927] p-4">

              <p className="text-xl font-bold text-purple-400">

                Smart

              </p>

              <p className="mt-1 text-xs text-slate-500">

                Insights

              </p>

            </div>

          </div>

        </div>


        <p className="text-sm text-slate-600">

          © 2026 FinTrack

        </p>

      </div>


      {/* LOGIN */}

      <div className="flex flex-1 items-center justify-center p-6">


        <div className="w-full max-w-md">


          {/* MOBILE LOGO */}

          <div className="mb-10 flex items-center gap-3 lg:hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">

              <Wallet
                size={20}
                className="text-white"
              />

            </div>


            <h1 className="text-xl font-bold text-white">

              FinTrack

            </h1>

          </div>


          <div>

            <h2 className="text-3xl font-bold text-white">

              Welcome back

            </h2>


            <p className="mt-2 text-slate-400">

              Enter your credentials to access your account.

            </p>

          </div>


          {/* ERROR */}

          {errorMessage && (

            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">

              {errorMessage}

            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >


            {/* USERNAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">

                Username

              </label>


              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />


                <input
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="your username"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#111927] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">

                Password

              </label>


              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#111927] py-3 pl-11 pr-12 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white"
                >

                  {showPassword ? (

                    <EyeOff size={18} />

                  ) : (

                    <Eye size={18} />

                  )}

                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (

                "Signing in..."

              ) : (

                <>
                  <LogIn size={18} />

                  Sign In
                </>

              )}

            </button>


          </form>


          {/* REGISTER */}

          <p className="mt-8 text-center text-sm text-slate-500">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-medium text-blue-400 hover:text-blue-300"
            >

              Create Account

            </Link>

          </p>


        </div>

      </div>

    </div>

  );

}


export default Login;
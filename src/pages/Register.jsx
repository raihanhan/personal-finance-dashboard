import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  UserPlus,
} from "lucide-react";

import {
  useAuth,
} from "../hooks/useAuth";
import { getUserFriendlyError } from "../utils/errors";


function Register() {

  const navigate = useNavigate();


  const {
    signUp,
  } = useAuth();


  const [fullName, setFullName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [successMessage, setSuccessMessage] =
    useState("");


  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    setErrorMessage("");

    setSuccessMessage("");


    if (
      password !== confirmPassword
    ) {

      setErrorMessage(
        "Passwords do not match."
      );

      return;

    }


    if (
      password.length < 6
    ) {

      setErrorMessage(
        "Password must be at least 6 characters."
      );

      return;

    }


    setLoading(true);


    const {
      data,
      error,
    } =
      await signUp(
        email,
        password,
        fullName,
        username
      );


    setLoading(false);


    if (error) {

      setErrorMessage(getUserFriendlyError(error, "Unable to create your account."));

      return;

    }


    /*
      Jika email confirmation
      aktif, user perlu
      verifikasi email terlebih dahulu.
    */

    if (
      data.user &&
      !data.session
    ) {

      setSuccessMessage(
        "Account created successfully. Please check your email to verify your account."
      );

      return;

    }


    navigate("/");

  };


  return (

    <div className="flex min-h-screen bg-[#0b101b]">


      {/* LEFT */}

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

            Start building better financial habits.

          </h2>


          <p className="mt-5 max-w-md leading-relaxed text-slate-400">

            Create your personal financial workspace
            and start tracking your money today.

          </p>


          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3 text-slate-300">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">

                1

              </div>

              Create your account

            </div>


            <div className="flex items-center gap-3 text-slate-300">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">

                2

              </div>

              Add your accounts

            </div>


            <div className="flex items-center gap-3 text-slate-300">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">

                3

              </div>

              Track your finances

            </div>

          </div>

        </div>


        <p className="text-sm text-slate-600">

          © 2026 FinTrack

        </p>

      </div>


      {/* REGISTER FORM */}

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


          <h2 className="text-3xl font-bold text-white">

            Create an account

          </h2>


          <p className="mt-2 text-slate-400">

            Start managing your finances today.

          </p>


          {/* ERROR */}

          {errorMessage && (

            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">

              {errorMessage}

            </div>

          )}


          {/* SUCCESS */}

          {successMessage && (

            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">

              {successMessage}

            </div>

          )}


          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >


            {/* FULL NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">

                Full Name

              </label>


              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />


                <input
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#111927] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>

            </div>


            {/* EMAIL */}

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
                  placeholder="Choose a username"
                  pattern="[A-Za-z0-9_]{3,30}"
                  title="Username harus 3-30 karakter, hanya huruf, angka, atau underscore."
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#111927] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">

                Email Address

              </label>


              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />


                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
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
                  placeholder="Minimum 6 characters"
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


            {/* CONFIRM PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">

                Confirm Password

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
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-[#111927] py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>

            </div>


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (

                "Creating account..."

              ) : (

                <>
                  <UserPlus size={18} />

                  Create Account
                </>

              )}

            </button>


          </form>


          <p className="mt-8 text-center text-sm text-slate-500">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-medium text-blue-400 hover:text-blue-300"
            >

              Sign In

            </Link>

          </p>


        </div>

      </div>

    </div>

  );

}


export default Register;
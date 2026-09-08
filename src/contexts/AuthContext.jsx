import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";
import { AuthContext } from "./AuthContextValue";


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [session, setSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const getSession = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();


      setSession(session);

      setUser(session?.user ?? null);

      setLoading(false);

    };


    getSession();


    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {

          setSession(session);

          setUser(
            session?.user ?? null
          );

          setLoading(false);

        }
      );


    return () => {

      subscription.unsubscribe();

    };

  }, []);


  const signUp = async (
    email,
    password,
    fullName,
    username
  ) => {

    const {
      data,
      error,
    } =
      await supabase.auth.signUp({

        email,

        password,

        options: {

          data: {
            full_name: fullName,
            username: username.trim().toLowerCase(),
          },

        },

      });


    return {
      data,
      error,
    };

  };


  const signIn = async (
    username,
    password
  ) => {
    const { data: email, error: lookupError } =
      await supabase.rpc("get_email_by_username", {
        input_username: username.trim().toLowerCase(),
      });

    if (lookupError || !email) {
      return {
        data: null,
        error: lookupError || new Error("Username atau password salah."),
      };
    }

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword({

        email,

        password,

      });


    return {
      data,
      error,
    };

  };


  const signOut = async () => {

    const { error } =
      await supabase.auth.signOut();


    return {
      error,
    };

  };


  const value = {

    user,

    session,

    loading,

    signUp,

    signIn,

    signOut,

  };


  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}
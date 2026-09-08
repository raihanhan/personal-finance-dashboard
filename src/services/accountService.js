import { supabase } from "../lib/supabase";


export const getAccounts = async () => {

  const { data, error } =
    await supabase
      .from("accounts")
      .select("*")
      .order(
        "created_at",
        {
          ascending: true,
        }
      );


  return {
    data,
    error,
  };

};


export const createAccount = async (
  account
) => {

  const {
    data,
    error,
  } =
    await supabase
      .from("accounts")
      .insert(account)
      .select()
      .single();


  return {
    data,
    error,
  };

};


export const updateAccount = async (
  accountId,
  account
) => {

  const {
    data,
    error,
  } =
    await supabase
      .from("accounts")
      .update(account)
      .eq("id", accountId)
      .select()
      .single();


  return {
    data,
    error,
  };

};


export const deleteAccount = async (
  accountId
) => {

  const { error } =
    await supabase
      .from("accounts")
      .delete()
      .eq("id", accountId);


  return {
    error,
  };
  
};

export const adjustAccountBalance = async (
  accountId,
  amount
) => {

  const {
    data: account,
    error: fetchError,
  } =
    await supabase
      .from("accounts")
      .select("balance")
      .eq("id", accountId)
      .single();


  if (fetchError) {

    return {
      data: null,
      error: fetchError,
    };

  }


  const newBalance =
    Number(account.balance) +
    Number(amount);


  const {
    data,
    error,
  } =
    await supabase
      .from("accounts")
      .update({

        balance:
          newBalance,

      })
      .eq("id", accountId)
      .select()
      .single();


  return {
    data,
    error,
  };

};
import { supabase } from "../lib/supabase";


export const getTransactions = async () => {

  const {
    data,
    error,
  } = await supabase
    .from("transactions")
    .select(`
      *,
      categories (
        id,
        name,
        color,
        icon
      ),
      accounts (
        id,
        name,
        type,
        color
      )
    `)
    .order("transaction_date", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });


  return {
    data,
    error,
  };

};


export const createTransaction = async (
  transaction
) => {

  const {
    data,
    error,
  } = await supabase
    .from("transactions")
    .insert(transaction)
    .select(`
      *,
      categories (
        id,
        name,
        color,
        icon
      ),
      accounts (
        id,
        name,
        type,
        color
      )
    `)
    .single();


  return {
    data,
    error,
  };

};


export const deleteTransaction = async (
  transactionId
) => {

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);


  return {
    error,
  };

};

export const updateTransaction = async (
  transactionId,
  transaction
) => {
  const {
    data,
    error,
  } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", transactionId)
    .select(`
      *,
      categories (
        id,
        name,
        color,
        icon
      ),
      accounts (
        id,
        name,
        type,
        color
      )
    `)
    .single();

  return {
    data,
    error,
  };
};
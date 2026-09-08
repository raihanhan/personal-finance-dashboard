import { supabase } from "../lib/supabase";


export const getBudgets = async (
  month = null,
  year = null
) => {

  let query = supabase
    .from("budgets")
    .select(`
      *,
      categories (
        id,
        name,
        type,
        color,
        icon
      )
    `)
    .order("created_at", {
      ascending: false,
    });


  if (month) {

    query = query.eq(
      "month",
      month
    );

  }


  if (year) {

    query = query.eq(
      "year",
      year
    );

  }


  const {
    data,
    error,
  } = await query;


  return {
    data,
    error,
  };

};


export const createBudget = async (
  budget
) => {

  const {
    data,
    error,
  } = await supabase
    .from("budgets")
    .insert(budget)
    .select(`
      *,
      categories (
        id,
        name,
        type,
        color,
        icon
      )
    `)
    .single();


  return {
    data,
    error,
  };

};


export const updateBudget = async (
  budgetId,
  budget
) => {

  const {
    data,
    error,
  } = await supabase
    .from("budgets")
    .update(budget)
    .eq("id", budgetId)
    .select(`
      *,
      categories (
        id,
        name,
        type,
        color,
        icon
      )
    `)
    .single();


  return {
    data,
    error,
  };

};


export const deleteBudget = async (
  budgetId
) => {

  const {
    error,
  } = await supabase
    .from("budgets")
    .delete()
    .eq("id", budgetId);


  return {
    error,
  };

};
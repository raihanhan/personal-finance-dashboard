import { supabase } from "../lib/supabase";


export const getCategories = async (
  type = null
) => {

  let query = supabase
    .from("categories")
    .select("*")
    .order("type", {
      ascending: true,
    })
    .order("name", {
      ascending: true,
    });


  if (type) {

    query = query.eq(
      "type",
      type
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


export const createCategory = async (
  category
) => {

  const {
    data,
    error,
  } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();


  return {
    data,
    error,
  };

};


export const updateCategory = async (
  categoryId,
  category
) => {

  const {
    data,
    error,
  } = await supabase
    .from("categories")
    .update(category)
    .eq("id", categoryId)
    .select()
    .single();


  return {
    data,
    error,
  };

};


export const deleteCategory = async (
  categoryId
) => {

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);


  return {
    error,
  };

};
import { supabase } from "../lib/supabase";


export const getGoals = async () => {

  const {
    data,
    error,
  } = await supabase

    .from("financial_goals")

    .select("*")

    .order(
      "created_at",
      {
        ascending: false,
      }
    );


  return {
    data,
    error,
  };

};


export const createGoal = async (
  goal
) => {

  const {
    data,
    error,
  } = await supabase

    .from("financial_goals")

    .insert(goal)

    .select()

    .single();


  return {
    data,
    error,
  };

};


export const updateGoal = async (
  goalId,
  goal
) => {

  const {
    data,
    error,
  } = await supabase

    .from("financial_goals")

    .update(goal)

    .eq(
      "id",
      goalId
    )

    .select()

    .single();


  return {
    data,
    error,
  };

};


export const deleteGoal = async (
  goalId
) => {

  const {
    error,
  } = await supabase

    .from("financial_goals")

    .delete()

    .eq(
      "id",
      goalId
    );


  return {
    error,
  };

};


/*
==================================

CONTRIBUTIONS

==================================
*/


export const getGoalContributions =
  async (
    goalId
  ) => {


    const {
      data,
      error,
    } = await supabase

      .from("goal_contributions")

      .select("*")

      .eq(
        "goal_id",
        goalId
      )

      .order(
        "contribution_date",
        {
          ascending: false,
        }
      );


    return {
      data,
      error,
    };


  };


export const createContribution =
  async (
    contribution
  ) => {


    const {
      data,
      error,
    } = await supabase

      .from("goal_contributions")

      .insert(contribution)

      .select()

      .single();


    return {
      data,
      error,
    };


  };


export const deleteContribution =
  async (
    contributionId
  ) => {


    const {
      error,
    } = await supabase

      .from("goal_contributions")

      .delete()

      .eq(
        "id",
        contributionId
      );


    return {
      error,
    };


  };
import { supabase } from "../lib/supabase";
import { logError } from "../utils/errors";


export const getDashboardData =
  async () => {

  try {


    const [

      accountsResponse,

      transactionsResponse,

      budgetsResponse,

      goalsResponse,

    ] = await Promise.all([


      supabase

        .from("accounts")

        .select("*")


        .order(
          "created_at",
          {
            ascending: false,
          }
        ),


      supabase

        .from("transactions")

        .select(`
          *,
          categories (
            id,
            name,
            color,
            type
          ),
          accounts (
            id,
            name
          )
        `)


        .order(
          "transaction_date",
          {
            ascending: false,
          }
        ),


      supabase

        .from("budgets")

        .select(`
          *,
          categories (
            id,
            name,
            color
          )
        `),


      supabase

        .from("financial_goals")

        .select("*")


        .order(
          "created_at",
          {
            ascending: false,
          }
        ),


    ]);


    const error =

      accountsResponse.error ||

      transactionsResponse.error ||

      budgetsResponse.error ||

      goalsResponse.error;


    if (error) {

      return {

        data: null,

        error,

      };

    }


    return {

      data: {

        accounts:
          accountsResponse.data || [],

        transactions:
          transactionsResponse.data || [],

        budgets:
          budgetsResponse.data || [],

        goals:
          goalsResponse.data || [],

      },

      error: null,

    };

  } catch (error) {
    logError("dashboard data request", error);

    return {
      data: null,
      error,
    };
  }


  };
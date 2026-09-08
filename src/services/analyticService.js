import { supabase } from "../lib/supabase";
import { logError } from "../utils/errors";


export const getAnalyticsTransactions =
  async () => {

  try {


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
          ascending: true,
        }
      );


    return {
      data,
      error,
    };

  } catch (error) {
    logError("analytics data request", error);

    return {
      data: null,
      error,
    };
  }


  };
import {
  useEffect,
  useState,
} from "react";

import {
  Save,
} from "lucide-react";

import {
  getCategories,
} from "../../services/categoryService";
import { useToast } from "../../hooks/useToast";


function BudgetForm({

  budget = null,

  selectedMonth,

  onSubmit,

  onCancel,

}) {


  const [categories, setCategories] =
    useState([]);


  const [loading, setLoading] =
    useState(false);
  const { showError } = useToast();


  const [formData, setFormData] =
    useState({

      category_id:
        budget?.category_id || "",

      amount:
        budget?.amount || "",

    });


  useEffect(() => {

    const loadCategories =
      async () => {

        const {
          data,
        } = await getCategories(
          "expense"
        );


        setCategories(
          data || []
        );

      };


    loadCategories();

  }, []);


  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((current) => ({

      ...current,

      [name]: value,

    }));

  };


  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    if (
      !formData.category_id
    ) {

      showError("Please select a category.");

      return;

    }


    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {

      showError("Please enter a valid budget amount.");

      return;

    }


    setLoading(true);


    try {
      await onSubmit({
        category_id: formData.category_id,
        amount: Number(formData.amount),
        month: selectedMonth.month,
        year: selectedMonth.year,
      });
    } finally {
      setLoading(false);
    }

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >


      {/* CATEGORY */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Expense Category

        </label>


        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >

          <option value="">

            Select category

          </option>


          {categories.map(
            (category) => (

              <option
                key={category.id}
                value={category.id}
              >

                {category.name}

              </option>

            )
          )}


        </select>

      </div>


      {/* AMOUNT */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Budget Amount

        </label>


        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="1"
          placeholder="Example: 2000000"
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

      </div>


      {/* PERIOD */}

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">

        <p className="text-xs text-slate-500">

          Budget Period

        </p>


        <p className="mt-1 font-medium text-white">

          {new Intl.DateTimeFormat(
            "id-ID",
            {
              month: "long",
              year: "numeric",
            }
          ).format(

            new Date(
              selectedMonth.year,
              selectedMonth.month - 1,
              1
            )

          )}

        </p>

      </div>


      {/* ACTIONS */}

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">


        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
        >

          Cancel

        </button>


        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400 disabled:opacity-50"
        >

          <Save size={17} />

          {loading
            ? "Saving..."
            : budget
              ? "Update Budget"
              : "Create Budget"}

        </button>


      </div>


    </form>

  );

}


export default BudgetForm;
import {

  useState,

} from "react";


import {

  PlusCircle,

} from "lucide-react";
import { useToast } from "../../hooks/useToast";


function ContributionForm({

  goal,

  onSubmit,

  onCancel,

}) {


  const [loading, setLoading] =
    useState(false);
  const { showError } = useToast();


  const [formData, setFormData] =
    useState({

      amount: "",

      contribution_date:

        new Date()
          .toISOString()
          .split("T")[0],

      note: "",

    });


  const handleChange = (
    event
  ) => {


    const {

      name,

      value,

    } = event.target;


    setFormData(

      (current) => ({

        ...current,

        [name]: value,

      })

    );


  };


  const handleSubmit =
    async (
      event
    ) => {


      event.preventDefault();


      const amount =
        Number(
          formData.amount
        );


      if (

        !amount ||

        amount <= 0

      ) {


        showError("Please enter a valid amount.");

        return;


      }


      setLoading(true);


      try {
        await onSubmit({
          amount,
          contribution_date: formData.contribution_date,
          note: formData.note,
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


      {/* GOAL */}

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">


        <p className="text-xs text-slate-500">

          Adding money to

        </p>


        <p className="mt-1 font-semibold text-white">

          {goal.name}

        </p>


      </div>


      {/* AMOUNT */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Amount

        </label>


        <input

          type="number"

          name="amount"

          value={formData.amount}

          onChange={handleChange}

          placeholder="Example: 500000"

          min="1"

          required

          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"

        />


      </div>


      {/* DATE */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Contribution Date

        </label>


        <input

          type="date"

          name="contribution_date"

          value={
            formData.contribution_date
          }

          onChange={handleChange}

          required

          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"

        />


      </div>


      {/* NOTE */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Note

        </label>


        <textarea

          name="note"

          value={formData.note}

          onChange={handleChange}

          rows="3"

          placeholder="Optional note..."

          className="w-full resize-none rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"

        />


      </div>


      {/* ACTION */}

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">


        <button

          type="button"

          onClick={onCancel}

          disabled={loading}

          className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:bg-slate-800"

        >

          Cancel

        </button>


        <button

          type="submit"

          disabled={loading}

          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-400 disabled:opacity-50"

        >

          <PlusCircle size={17} />

          {loading

            ? "Adding..."

            : "Add Money"

          }

        </button>


      </div>


    </form>

  );


}


export default ContributionForm;
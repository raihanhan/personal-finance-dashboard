import {

  useState,

} from "react";


import {

  Save,

} from "lucide-react";
import { useToast } from "../../hooks/useToast";


function GoalForm({

  goal = null,

  onSubmit,

  onCancel,

}) {


  const [loading, setLoading] =
    useState(false);
  const { showError } = useToast();


  const [formData, setFormData] =
    useState({

      name:
        goal?.name || "",

      description:
        goal?.description || "",

      target_amount:
        goal?.target_amount || "",

      target_date:
        goal?.target_date || "",

      color:
        goal?.color || "#3b82f6",

      icon:
        goal?.icon || "target",

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


      if (

        !formData.name.trim()

      ) {


        showError("Goal name is required.");

        return;


      }


      if (

        !formData.target_amount ||

        Number(
          formData.target_amount
        ) <= 0

      ) {


        showError("Please enter a valid target amount.");

        return;


      }


      setLoading(true);


      try {
        await onSubmit({
          name: formData.name,
          description: formData.description,
          target_amount: Number(formData.target_amount),
          target_date: formData.target_date || null,
          color: formData.color,
          icon: formData.icon,
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


      {/* NAME */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Goal Name

        </label>


        <input

          type="text"

          name="name"

          value={formData.name}

          onChange={handleChange}

          placeholder="Example: Emergency Fund"

          required

          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"

        />


      </div>


      {/* DESCRIPTION */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Description

        </label>


        <textarea

          name="description"

          value={formData.description}

          onChange={handleChange}

          rows="3"

          placeholder="Optional description..."

          className="w-full resize-none rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"

        />


      </div>


      {/* TARGET */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Target Amount

        </label>


        <input

          type="number"

          name="target_amount"

          value={
            formData.target_amount
          }

          onChange={handleChange}

          placeholder="Example: 20000000"

          min="1"

          required

          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"

        />


      </div>


      {/* TARGET DATE */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Target Date

        </label>


        <input

          type="date"

          name="target_date"

          value={
            formData.target_date
          }

          onChange={handleChange}

          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"

        />


      </div>


      {/* COLOR */}

      <div>


        <label className="mb-2 block text-sm font-medium text-slate-300">

          Goal Color

        </label>


        <div className="flex gap-3">


          <input

            type="color"

            name="color"

            value={formData.color}

            onChange={handleChange}

            className="h-12 w-16 cursor-pointer rounded-lg border border-slate-700 bg-transparent"

          />


          <input

            type="text"

            name="color"

            value={formData.color}

            onChange={handleChange}

            className="flex-1 rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"

          />


        </div>


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

          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400 disabled:opacity-50"

        >

          <Save size={17} />


          {loading

            ? "Saving..."

            : goal

              ? "Update Goal"

              : "Create Goal"

          }

        </button>


      </div>


    </form>

  );


}


export default GoalForm;
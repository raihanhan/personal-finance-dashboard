import {
  useState,
} from "react";

import {
  Save,
  CircleDollarSign,
  ShoppingBag,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";


function CategoryForm({

  category = null,

  onSubmit,

  onCancel,

}) {


  const [formData, setFormData] =
    useState({

      name:
        category?.name || "",

      type:
        category?.type || "expense",

      icon:
        category?.icon || "circle",

      color:
        category?.color || "#3b82f6",

    });


  const [loading, setLoading] =
    useState(false);
  const { showError } = useToast();


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


    if (!formData.name.trim()) {

      showError("Category name is required.");

      return;

    }


    setLoading(true);


    try {
      await onSubmit({
        name: formData.name.trim(),
        type: formData.type,
        icon: formData.icon,
        color: formData.color,
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


      {/* CATEGORY NAME */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Category Name

        </label>


        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example: Food & Drinks"
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

      </div>


      {/* TYPE */}

      <div>

        <label className="mb-3 block text-sm font-medium text-slate-300">

          Category Type

        </label>


        <div className="grid grid-cols-2 gap-3">


          <button
            type="button"
            onClick={() =>
              setFormData((current) => ({

                ...current,

                type: "income",

              }))
            }
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition ${
              formData.type === "income"

                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"

                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >

            <CircleDollarSign size={18} />

            Income

          </button>


          <button
            type="button"
            onClick={() =>
              setFormData((current) => ({

                ...current,

                type: "expense",

              }))
            }
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition ${
              formData.type === "expense"

                ? "border-red-500 bg-red-500/10 text-red-400"

                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >

            <ShoppingBag size={18} />

            Expense

          </button>

        </div>

      </div>


      {/* ICON */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Icon

        </label>


        <select
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >

          <option value="circle">
            Circle
          </option>

          <option value="food">
            Food
          </option>

          <option value="transport">
            Transportation
          </option>

          <option value="shopping">
            Shopping
          </option>

          <option value="home">
            Home
          </option>

          <option value="health">
            Health
          </option>

          <option value="education">
            Education
          </option>

          <option value="entertainment">
            Entertainment
          </option>

          <option value="salary">
            Salary
          </option>

          <option value="business">
            Business
          </option>

          <option value="investment">
            Investment
          </option>

        </select>

      </div>


      {/* COLOR */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Category Color

        </label>


        <div className="flex items-center gap-3">


          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="h-11 w-16 cursor-pointer rounded-lg border border-slate-700 bg-[#0d1420] p-1"
          />


          <span className="text-sm text-slate-400">

            {formData.color}

          </span>


        </div>

      </div>


      {/* BUTTON */}

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">


        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >

          Cancel

        </button>


        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400 disabled:opacity-50"
        >

          <Save size={17} />

          {loading
            ? "Saving..."
            : category
              ? "Update Category"
              : "Create Category"}

        </button>


      </div>

    </form>

  );

}


export default CategoryForm;
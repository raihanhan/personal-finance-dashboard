import { useState } from "react";

import {
  Save,
  Landmark,
  Wallet,
  Banknote,
} from "lucide-react";
import { useToast } from "../../hooks/useToast";


function AccountForm({
  account = null,
  onSubmit,
  onCancel,
}) {

  const [formData, setFormData] =
    useState({

      name:
        account?.name || "",

      type:
        account?.type || "bank",

      balance:
        account?.balance || "",

      color:
        account?.color || "#3b82f6",

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

      showError("Account name is required.");

      return;

    }


    if (
      formData.balance === "" ||
      Number(formData.balance) < 0
    ) {

      showError("Please enter a valid balance.");

      return;

    }


    setLoading(true);


    try {
      await onSubmit({
        name: formData.name.trim(),
        type: formData.type,
        balance: Number(formData.balance),
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


      {/* ACCOUNT NAME */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Account Name

        </label>


        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example: BCA Savings"
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

      </div>


      {/* ACCOUNT TYPE */}

      <div>

        <label className="mb-3 block text-sm font-medium text-slate-300">

          Account Type

        </label>


        <div className="grid grid-cols-3 gap-3">


          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                type: "bank",
              })
            }
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
              formData.type === "bank"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >

            <Landmark size={22} />

            <span className="text-xs">
              Bank
            </span>

          </button>


          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                type: "ewallet",
              })
            }
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
              formData.type === "ewallet"
                ? "border-purple-500 bg-purple-500/10 text-purple-400"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >

            <Wallet size={22} />

            <span className="text-xs">
              E-Wallet
            </span>

          </button>


          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                type: "cash",
              })
            }
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
              formData.type === "cash"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >

            <Banknote size={22} />

            <span className="text-xs">
              Cash
            </span>

          </button>

        </div>

      </div>


      {/* BALANCE */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Current Balance

        </label>


        <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-[#0d1420] focus-within:border-blue-500">

          <span className="flex items-center border-r border-slate-700 px-4 text-sm text-slate-400">

            Rp

          </span>


          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
            className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-600"
          />

        </div>

      </div>


      {/* COLOR */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">

          Account Color

        </label>


        <div className="flex items-center gap-3">

          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="h-10 w-14 cursor-pointer rounded-lg border border-slate-700 bg-[#0d1420] p-1"
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
            : account
              ? "Update Account"
              : "Create Account"}

        </button>

      </div>

    </form>

  );

}


export default AccountForm;
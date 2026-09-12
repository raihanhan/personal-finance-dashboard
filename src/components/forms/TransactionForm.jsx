import { useState } from "react";
import { Save } from "lucide-react";
import { useToast } from "../../hooks/useToast";


function TransactionForm({
  transaction = null,
  onSubmit,
  onCancel,
  accounts = [],
  categories = [],
  defaultType = "expense",
  isEditing = false,
}) {

  const [type, setType] =
    useState(transaction?.type || defaultType);
  const [formData, setFormData] =
    useState({
      amount: transaction?.amount || "",
      category_id: transaction?.category_id || "",
      account_id: transaction?.account_id || "",
      description: transaction?.description || "",
      transaction_date: transaction?.transaction_date ||
        new Date().toISOString().split("T")[0],

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


    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const filteredCategories =
    categories.filter(
      (category) =>
        category.type === type
    );
  const handleTypeChange = (
    newType
  ) => {
    setType(newType);
    setFormData({
      ...formData,
      category_id: "",
    });
  };


  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.amount ||
      !formData.category_id ||
      !formData.account_id
    ) {
      showError("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({
        type,
        amount: Number(formData.amount),
        category_id: formData.category_id,
        account_id: formData.account_id,
        description: formData.description,
        transaction_date: formData.transaction_date,
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
      {/* TRANSACTION TYPE */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Transaction Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              handleTypeChange(
                "income"
              )
            }
            className={`rounded-xl border py-3 text-sm font-medium transition ${
              type === "income"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() =>
              handleTypeChange(
                "expense"
              )
            }
            className={`rounded-xl border py-3 text-sm font-medium transition ${
              type === "expense"
                ? "border-red-500 bg-red-500/10 text-red-400"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >
            Expense
          </button>
        </div>
      </div>
      {/* AMOUNT */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Amount
        </label>
        <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-[#0d1420] focus-within:border-blue-500">
          <span className="flex items-center border-r border-slate-700 px-4 text-sm text-slate-400">
            Rp
          </span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            min="1"
            required
            className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-600"
          />
        </div>
      </div>
      {/* CATEGORY */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Category
        </label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="">
            Select Category
          </option>
          {filteredCategories.map(
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
      {/* ACCOUNT */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Account
        </label>
        <select
          name="account_id"
          value={formData.account_id}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="">
            Select Account
          </option>
          {accounts.map(
            (account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            )
          )}
        </select>
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
          placeholder="Add notes about this transaction..."
          rows="3"
          className="w-full resize-none rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />
      </div>
      {/* DATE */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Date
        </label>
        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        />
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
            ? (isEditing ? "Updating..." : "Saving...")
            : (isEditing ? "Update Transaction" : "Save Transaction")}
        </button>
      </div>
    </form>
  );
}
export default TransactionForm;
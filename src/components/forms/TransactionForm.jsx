import { useState } from "react";
import { Save } from "lucide-react";

function TransactionForm({ onSubmit, onCancel }) {
  const [type, setType] = useState("expense");

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    account: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = {
    income: [
      "Salary",
      "Freelance",
      "Investment",
      "Business",
      "Gift",
      "Other Income",
    ],

    expense: [
      "Food & Drinks",
      "Transportation",
      "Shopping",
      "Entertainment",
      "Bills",
      "Health",
      "Education",
      "Other Expense",
    ],
  };

  const accounts = [
    "BCA Savings",
    "GoPay",
    "Cash",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.amount ||
      !formData.category ||
      !formData.account
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const transaction = {
      id: Date.now(),
      type,
      amount: Number(formData.amount),
      category: formData.category,
      account: formData.account,
      description: formData.description,
      date: formData.date,
      createdAt: new Date(),
    };

    onSubmit(transaction);

    setFormData({
      amount: "",
      category: "",
      account: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });

    setType("expense");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* TYPE */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Transaction Type
        </label>

        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() => {
              setType("income");

              setFormData({
                ...formData,
                category: "",
              });
            }}
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
            onClick={() => {
              setType("expense");

              setFormData({
                ...formData,
                category: "",
              });
            }}
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
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >

          <option value="">
            Select Category
          </option>

          {categories[type].map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}

        </select>

      </div>


      {/* ACCOUNT */}

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Account
        </label>

        <select
          name="account"
          value={formData.account}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >

          <option value="">
            Select Account
          </option>

          {accounts.map((account) => (
            <option
              key={account}
              value={account}
            >
              {account}
            </option>
          ))}

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
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-[#0d1420] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        />

      </div>


      {/* BUTTONS */}

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
        >
          <Save size={17} />

          Save Transaction
        </button>

      </div>

    </form>
  );
}

export default TransactionForm;
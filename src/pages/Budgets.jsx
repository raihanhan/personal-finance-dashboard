import {

  useCallback,

  useEffect,

  useMemo,

  useState,

} from "react";


import {

  Plus,

  CalendarDays,

} from "lucide-react";


import Modal from
  "../components/ui/Modal";

import ConfirmationModal from
  "../components/ui/ConfirmationModal";


import BudgetForm from
  "../components/budgets/BudgetForm";

import BudgetCard from
  "../components/budgets/BudgetCard";

import BudgetSummary from
  "../components/budgets/BudgetSummary";


import {

  getBudgets,

  createBudget,

  updateBudget,

  deleteBudget,

} from "../services/budgetServices";


import {
  getTransactions,
} from "../services/transactionService";


import {
  useAuth,
} from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { getUserFriendlyError } from "../utils/errors";


import {
  parseLocalDate,
} from "../utils/date";
import { BudgetSkeleton } from "../components/ui/Skeletons";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";


function Budgets() {


  const { user } =
    useAuth();
  const { showSuccess, showError } = useToast();


  const [budgets, setBudgets] =
    useState([]);


  const [transactions, setTransactions] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [isModalOpen, setIsModalOpen] =
    useState(false);


  const [selectedBudget, setSelectedBudget] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  const [selectedMonth, setSelectedMonth] =
    useState(() => {

      const today =
        new Date();


      return {

        month:
          today.getMonth() + 1,

        year:
          today.getFullYear(),

      };

    });


  /*
  ==================================

  LOAD DATA

  ==================================
  */

  const loadData = useCallback(
    async () => {


      setLoading(true);

      setErrorMessage("");


      const [

        budgetResult,

        transactionResult,

      ] = await Promise.all([

        getBudgets(
          selectedMonth.month,
          selectedMonth.year
        ),

        getTransactions(),

      ]);


      if (
        budgetResult.error
      ) {

        setErrorMessage(

          getUserFriendlyError(budgetResult.error, "Unable to load budgets.")

        );

      }


      if (
        transactionResult.error
      ) {

        setErrorMessage(

          getUserFriendlyError(transactionResult.error, "Unable to load transactions.")

        );

      }


      setBudgets(

        budgetResult.data || []

      );


      setTransactions(

        transactionResult.data || []

      );


      setLoading(false);


    }, [selectedMonth]);


  useEffect(() => {

    const loadCurrentData = async () => {
      if (!user) {
        return;
      }

      await loadData();
    };

    void loadCurrentData();

  }, [

    user,

    selectedMonth,

    loadData,

  ]);


  /*
  ==================================

  FILTER TRANSACTIONS

  ==================================
  */

  const monthlyTransactions =
    useMemo(() => {

      return transactions.filter(
        (transaction) => {


          if (
            transaction.type !==
            "expense"
          ) {

            return false;

          }


          const date =
            parseLocalDate(

              transaction.transaction_date

            );

          if (!date) {
            return false;
          }


          return (

            date.getMonth() + 1 ===
              selectedMonth.month

            &&

            date.getFullYear() ===
              selectedMonth.year

          );


        }
      );


    }, [

      transactions,

      selectedMonth,

    ]);


  /*
  ==================================

  SPENDING MAP

  category_id → total expense

  ==================================
  */

  const spendingMap =
    useMemo(() => {


      const map = {};


      monthlyTransactions.forEach(
        (transaction) => {


          const categoryId =
            transaction.category_id;


          if (!categoryId) {

            return;

          }


          if (!map[categoryId]) {

            map[categoryId] = 0;

          }


          map[categoryId] +=

            Number(
              transaction.amount
            );


        }
      );


      return map;


    }, [
      monthlyTransactions,
    ]);


  /*
  ==================================

  SUMMARY

  ==================================
  */

  const totalBudget =
    useMemo(() => {

      return budgets.reduce(

        (total, budget) =>

          total +
          Number(budget.amount),

        0

      );

    }, [budgets]);


  const totalSpent =
    useMemo(() => {

      return budgets.reduce(

        (total, budget) => {


          const spent =

            spendingMap[
              budget.category_id
            ] || 0;


          return total + spent;


        },

        0

      );


    }, [

      budgets,

      spendingMap,

    ]);


  /*
  ==================================

  MONTH OPTIONS

  ==================================
  */

  const monthOptions =
    useMemo(() => {


      const months = [];


      const today =
        new Date();


      for (

        let i = 0;

        i < 12;

        i++

      ) {


        const date =
          new Date(

            today.getFullYear(),

            today.getMonth() - i,

            1

          );


        months.push({

          month:
            date.getMonth() + 1,

          year:
            date.getFullYear(),

          label:

            new Intl.DateTimeFormat(

              "id-ID",

              {

                month: "long",

                year: "numeric",

              }

            ).format(date),

        });


      }


      return months;


    }, []);


  /*
  ==================================

  ADD BUDGET

  ==================================
  */

  const handleAddBudget = () => {


    setSelectedBudget(null);

    setIsModalOpen(true);


  };


  /*
  ==================================

  EDIT BUDGET

  ==================================
  */

  const handleEditBudget = (
    budget
  ) => {


    setSelectedBudget(
      budget
    );


    setIsModalOpen(true);


  };


  /*
  ==================================

  SUBMIT BUDGET

  ==================================
  */

  const handleSubmitBudget =
    async (
      budgetData
    ) => {


      /*
      CREATE
      */

      if (!selectedBudget) {


        const {

          data,

          error,

        } =
          await createBudget({

            ...budgetData,

            user_id:
              user.id,

          });


        if (error) {


          showError(getUserFriendlyError(error, "Failed to create budget."));


          return;


        }


        setBudgets(

          (current) => [

            ...current,

            data,

          ]

        );
        showSuccess("Budget created successfully.");


      }


      /*
      UPDATE
      */

      else {


        const {

          data,

          error,

        } =
          await updateBudget(

            selectedBudget.id,

            budgetData

          );


        if (error) {


          showError(getUserFriendlyError(error, "Failed to update budget."));


          return;


        }


        setBudgets(

          (current) =>

            current.map(

              (budget) =>

                budget.id === data.id

                  ? data

                  : budget

            )

        );
        showSuccess("Budget updated successfully.");


      }


      setSelectedBudget(null);


      setIsModalOpen(false);


    };


  /*
  ==================================

  DELETE BUDGET

  ==================================
  */

  const handleDeleteBudget =
    async (
      budget
    ) => {
      const {
        error,
      } =
        await deleteBudget(
          budget.id
        );


      if (error) {


        showError(getUserFriendlyError(error, "Failed to delete budget."));


        return;


      }


      setBudgets(

        (current) =>

          current.filter(

            (item) =>

              item.id !==
              budget.id

          )

      );
      showSuccess("Budget deleted successfully.");


    };

  const confirmDeleteBudget = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    await handleDeleteBudget(deleteTarget);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const requestDeleteBudget = (budget) => {
    setDeleteTarget(budget);
  };


  /*
  ==================================

  LOADING

  ==================================
  */

  if (loading) {

    return <BudgetSkeleton />;


  }


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">


        <div>


          <h1 className="text-2xl font-bold text-white">

            Budgets

          </h1>


          <p className="mt-1 text-sm text-slate-400">

            Plan your spending and stay on track.

          </p>


        </div>


        <div className="flex flex-col gap-3 sm:flex-row">


          {/* MONTH */}

          <div className="relative">


            <CalendarDays
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />


            <select

              value={
                `${selectedMonth.year}-${selectedMonth.month}`
              }

              onChange={(event) => {


                const [

                  year,

                  month,

                ] =
                  event.target.value
                    .split("-");


                setSelectedMonth({

                  year:
                    Number(year),

                  month:
                    Number(month),

                });


              }}

              className="w-full appearance-none rounded-xl border border-slate-700 bg-[#111927] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500"

            >


              {monthOptions.map(
                (item) => (

                  <option

                    key={
                      `${item.year}-${item.month}`
                    }

                    value={
                      `${item.year}-${item.month}`
                    }

                  >

                    {item.label}

                  </option>

                )
              )}


            </select>


          </div>


          {/* ADD */}

          <button

            onClick={
              handleAddBudget
            }

            className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400"

          >

            <Plus size={18} />

            Add Budget

          </button>


        </div>


      </div>


      {/* ERROR */}

      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => void loadData()}
        />
      )}


      {/* SUMMARY */}

      <BudgetSummary

        totalBudget={
          totalBudget
        }

        totalSpent={
          totalSpent
        }

      />


      {/* BUDGET INFO */}

      <div className="flex items-center justify-between">


        <div>


          <h2 className="font-semibold text-white">

            Monthly Budgets

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            {budgets.length} active budget
            {budgets.length !== 1
              ? "s"
              : ""
            }

          </p>


        </div>


      </div>


      {/* EMPTY STATE */}

      {budgets.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No budgets yet."
          description="Create a budget to control your spending."
          actionText="Create Budget"
          onAction={handleAddBudget}
        />


      ) : (


        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


          {budgets.map(
            (budget) => (

              <BudgetCard

                key={budget.id}

                budget={budget}

                spent={
                  spendingMap[
                    budget.category_id
                  ] || 0
                }

                onEdit={
                  handleEditBudget
                }

                onDelete={
                  requestDeleteBudget
                }

              />

            )
          )}


        </div>


      )}


      {/* MODAL */}

      <Modal

        isOpen={
          isModalOpen
        }

        onClose={() => {


          setIsModalOpen(false);


          setSelectedBudget(null);


        }}

        title={

          selectedBudget

            ? "Edit Budget"

            : "Create Budget"

        }

      >


        <BudgetForm

          budget={
            selectedBudget
          }

          selectedMonth={
            selectedMonth
          }

          onSubmit={
            handleSubmitBudget
          }

          onCancel={() => {


            setIsModalOpen(false);


            setSelectedBudget(null);


          }}

        />


      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteBudget}
        title="Delete Budget?"
        description="This budget and its progress history will be permanently deleted."
        loading={deleteLoading}
      />


    </div>

  );

}


export default Budgets;
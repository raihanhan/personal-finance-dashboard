import {
  useEffect,
  useState,
} from "react";

import {

  Plus,

  Landmark,

  Wallet,

  Banknote,

  Pencil,

  Trash2,

} from "lucide-react";


import Modal from "../components/ui/Modal";
import ConfirmationModal from "../components/ui/ConfirmationModal";

import AccountForm from
  "../components/accounts/AccountForm";


import {

  getAccounts,

  createAccount,

  updateAccount,

  deleteAccount,

} from "../services/accountService";


import {
  useAuth,
} from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { getUserFriendlyError } from "../utils/errors";
import { AccountCardSkeleton } from "../components/ui/Skeletons";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";


function Accounts() {


  const { user } =
    useAuth();
  const { showSuccess, showError } = useToast();


  const [accounts, setAccounts] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [isModalOpen, setIsModalOpen] =
    useState(false);


  const [selectedAccount, setSelectedAccount] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  const loadAccounts = async () => {

    setLoading(true);

    setErrorMessage("");


    const {
      data,
      error,
    } =
      await getAccounts();


    if (error) {

      setErrorMessage(getUserFriendlyError(error, "Unable to load accounts."));

    }


    setAccounts(
      data || []
    );


    setLoading(false);

  };


  useEffect(() => {

    if (user) {

      void Promise.resolve().then(loadAccounts);

    }

  }, [user]);


  const handleAddAccount = () => {

    setSelectedAccount(null);

    setIsModalOpen(true);

  };


  const handleEditAccount = (
    account
  ) => {

    setSelectedAccount(account);

    setIsModalOpen(true);

  };


  const handleSubmitAccount = async (
    accountData
  ) => {


    /* CREATE */

    if (!selectedAccount) {

      const {
        data,
        error,
      } =
        await createAccount({

          ...accountData,

          user_id: user.id,

        });


      if (error) {

        showError(getUserFriendlyError(error, "Failed to create account."));

        return;

      }


      setAccounts((current) => [

        ...current,

        data,

      ]);
      showSuccess("Account created successfully.");

    }


    /* UPDATE */

    else {

      const {
        data,
        error,
      } =
        await updateAccount(

          selectedAccount.id,

          accountData

        );


      if (error) {

        showError(getUserFriendlyError(error, "Failed to update account."));

        return;

      }


      setAccounts((current) =>
        current.map(
          (account) =>

            account.id === data.id

              ? data

              : account

        )
      );
      showSuccess("Account updated successfully.");

    }


    setIsModalOpen(false);

    setSelectedAccount(null);

  };


  const handleDeleteAccount = async (
    accountId
  ) => {
    const { error } =
      await deleteAccount(
        accountId
      );


    if (error) {

      showError(getUserFriendlyError(error, "Failed to delete account."));

      return;

    }


    setAccounts((current) =>
      current.filter(
        (account) =>
          account.id !== accountId
      )
    );
    showSuccess("Account deleted successfully.");

  };

  const confirmDeleteAccount = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    await handleDeleteAccount(deleteTarget.id);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };


  const getAccountIcon = (
    type
  ) => {

    switch (type) {

      case "bank":

        return (
          <Landmark size={22} />
        );


      case "ewallet":

        return (
          <Wallet size={22} />
        );


      case "cash":

        return (
          <Banknote size={22} />
        );


      default:

        return (
          <Wallet size={22} />
        );

    }

  };


  const getAccountTypeLabel = (
    type
  ) => {

    switch (type) {

      case "bank":

        return "Bank Account";


      case "ewallet":

        return "E-Wallet";


      case "cash":

        return "Cash";


      default:

        return type;

    }

  };


  const formatCurrency = (
    amount
  ) => {

    return new Intl.NumberFormat(
      "id-ID",
      {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0,

      }

    ).format(
      Number(amount)
    );

  };


  const totalBalance =
    accounts.reduce(

      (total, account) =>

        total +
        Number(account.balance),

      0

    );


  if (loading) {

    return <AccountCardSkeleton />;

  }


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">


        <div>

          <h1 className="text-2xl font-bold text-white">

            Accounts

          </h1>


          <p className="mt-1 text-sm text-slate-400">

            Manage all your financial accounts.

          </p>

        </div>


        <button
          onClick={handleAddAccount}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
        >

          <Plus size={18} />

          Add Account

        </button>

      </div>


      {/* ERROR */}

      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => void loadAccounts()}
        />
      )}


      {/* TOTAL BALANCE */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111927] p-6">


        <p className="text-sm text-slate-400">

          Total Balance

        </p>


        <h2 className="mt-2 text-3xl font-bold text-white">

          {formatCurrency(
            totalBalance
          )}

        </h2>


        <p className="mt-2 text-sm text-slate-500">

          Across {accounts.length} account
          {accounts.length !== 1
            ? "s"
            : ""}

        </p>

      </div>


      {/* ACCOUNTS */}

      {accounts.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No accounts yet."
          description="Create an account to start managing your balances."
          actionText="Create Account"
          onAction={handleAddAccount}
        />

      ) : (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


          {accounts.map(
            (account) => (

              <div
                key={account.id}
                className="group rounded-2xl border border-slate-800 bg-[#111927] p-5 transition hover:border-slate-700"
              >


                {/* TOP */}

                <div className="flex items-start justify-between">


                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{

                      backgroundColor:
                        `${account.color}20`,

                      color:
                        account.color,

                    }}
                  >

                    {getAccountIcon(
                      account.type
                    )}

                  </div>


                  <div className="flex gap-1">


                    <button
                      onClick={() =>
                        handleEditAccount(
                          account
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-blue-400"
                    >

                      <Pencil size={16} />

                    </button>


                    <button
                      onClick={() =>
                        setDeleteTarget(account)
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </div>


                {/* ACCOUNT INFO */}

                <div className="mt-6">


                  <p className="font-semibold text-white">

                    {account.name}

                  </p>


                  <p className="mt-1 text-sm text-slate-500">

                    {getAccountTypeLabel(
                      account.type
                    )}

                  </p>


                  <p className="mt-5 text-2xl font-bold text-white">

                    {formatCurrency(
                      account.balance
                    )}

                  </p>

                </div>


                {/* BOTTOM */}

                <div className="mt-6 border-t border-slate-800 pt-4">


                  <p className="text-xs text-slate-600">

                    Current available balance

                  </p>

                </div>


              </div>

            )
          )}

        </div>

      )}


      {/* MODAL */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {

          setIsModalOpen(false);

          setSelectedAccount(null);

        }}
        title={
          selectedAccount
            ? "Edit Account"
            : "Add Account"
        }
      >

        <AccountForm

          account={selectedAccount}

          onSubmit={
            handleSubmitAccount
          }

          onCancel={() => {

            setIsModalOpen(false);

            setSelectedAccount(null);

          }}

        />

      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteAccount}
        title="Delete Account?"
        description="This account and its current balance will be permanently deleted."
        loading={deleteLoading}
      />


    </div>

  );

}


export default Accounts;
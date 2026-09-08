import {

  Landmark,

  Wallet,

  Banknote,

} from "lucide-react";


function AccountSummary({
  accounts,
}) {


  const getAccountIcon = (
    type
  ) => {

    switch (type) {

      case "bank":

        return (
          <Landmark size={18} />
        );


      case "ewallet":

        return (
          <Wallet size={18} />
        );


      case "cash":

        return (
          <Banknote size={18} />
        );


      default:

        return (
          <Wallet size={18} />
        );

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

    ).format(amount);

  };


  return (

    <div className="rounded-2xl border border-slate-800 bg-[#111927]">


      <div className="border-b border-slate-800 p-5">


        <h2 className="font-semibold text-white">

          Accounts

        </h2>


        <p className="mt-1 text-sm text-slate-500">

          Your account balances

        </p>


      </div>


      {accounts.length === 0 ? (

        <div className="flex h-62.5 items-center justify-center">

          <p className="text-sm text-slate-500">

            No accounts yet.

          </p>

        </div>

      ) : (

        <div className="divide-y divide-slate-800">


          {accounts.map(
            (account) => (

              <div
                key={account.id}
                className="flex items-center justify-between p-4"
              >


                <div className="flex items-center gap-3">


                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
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


                  <div>

                    <p className="text-sm font-medium text-white">

                      {account.name}

                    </p>


                    <p className="mt-1 text-xs text-slate-500">

                      {account.type}

                    </p>


                  </div>


                </div>


                <p className="text-sm font-semibold text-white">

                  {formatCurrency(
                    account.balance
                  )}

                </p>


              </div>

            )
          )}


        </div>

      )}


    </div>

  );

}


export default AccountSummary;
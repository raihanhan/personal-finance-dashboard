import {

  useEffect,

  useMemo,

  useState,

} from "react";


import {

  Plus,

  Target,

} from "lucide-react";


import Modal from
  "../components/ui/Modal";

import ConfirmationModal from
  "../components/ui/ConfirmationModal";


import GoalForm from
  "../components/goals/GoalForm";

import GoalCard from
  "../components/goals/GoalCard";

import ContributionForm from
  "../components/goals/ContributionForm";

import GoalSummary from
  "../components/goals/GoalSummary";


import {

  getGoals,

  createGoal,

  updateGoal,

  deleteGoal,

  getGoalContributions,

  createContribution,

} from "../services/goalService";


import {

  useAuth,

} from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { getUserFriendlyError } from "../utils/errors";
import { GoalSkeleton } from "../components/ui/Skeletons";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";


function Goals() {


  const { user } =
    useAuth();
  const { showSuccess, showError } = useToast();


  const [goals, setGoals] =
    useState([]);


  const [

    contributionsMap,

    setContributionsMap,

  ] =
    useState({});


  const [loading, setLoading] =
    useState(true);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [

    isGoalModalOpen,

    setIsGoalModalOpen,

  ] =
    useState(false);


  const [

    isContributionModalOpen,

    setIsContributionModalOpen,

  ] =
    useState(false);


  const [

    selectedGoal,

    setSelectedGoal,

  ] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  /*
  ==============================

  LOAD GOALS

  ==============================
  */

  const loadGoals =
    async () => {


      setLoading(true);


      setErrorMessage("");


      const {

        data,

        error,

      } =
        await getGoals();


      if (error) {


        setErrorMessage(getUserFriendlyError(error, "Unable to load goals."));


        setLoading(false);


        return;


      }


      const goalList =
        data || [];


      setGoals(
        goalList
      );


      /*
      LOAD CONTRIBUTIONS
      */


      const contributionEntries =
        await Promise.all(

          goalList.map(

            async (
              goal
            ) => {


              const {

                data:
                  contributions,

              } =

                await getGoalContributions(
                  goal.id
                );


              return [

                goal.id,

                contributions || [],

              ];


            }

          )

        );


      const map =
        Object.fromEntries(

          contributionEntries

        );


      setContributionsMap(
        map
      );


      setLoading(false);


    };


  useEffect(() => {


    if (user) {

      void Promise.resolve().then(loadGoals);

    }


  }, [user]);


  /*
  ==============================

  CREATE GOAL

  ==============================
  */

  const handleAddGoal = () => {


    setSelectedGoal(
      null
    );


    setIsGoalModalOpen(
      true
    );


  };


  /*
  ==============================

  EDIT GOAL

  ==============================
  */

  const handleEditGoal = (
    goal
  ) => {


    setSelectedGoal(
      goal
    );


    setIsGoalModalOpen(
      true
    );


  };


  /*
  ==============================

  SUBMIT GOAL

  ==============================
  */

  const handleSubmitGoal =
    async (
      goalData
    ) => {


      /*
      CREATE
      */

      if (
        !selectedGoal
      ) {


        const {

          data,

          error,

        } =
          await createGoal({

            ...goalData,

            user_id:
              user.id,

          });


        if (error) {


          showError(getUserFriendlyError(error, "Failed to create goal."));


          return;


        }


        setGoals(

          (current) => [

            data,

            ...current,

          ]

        );


        setContributionsMap(

          (current) => ({

            ...current,

            [data.id]: [],

          })

        );
        showSuccess("Goal created successfully.");


      }


      /*
      UPDATE
      */

      else {


        const {

          data,

          error,

        } =
          await updateGoal(

            selectedGoal.id,

            goalData

          );


        if (error) {


          showError(getUserFriendlyError(error, "Failed to update goal."));


          return;


        }


        setGoals(

          (current) =>

            current.map(

              (goal) =>

                goal.id === data.id

                  ? data

                  : goal

            )

        );
        showSuccess("Goal updated successfully.");


      }


      setSelectedGoal(
        null
      );


      setIsGoalModalOpen(
        false
      );


    };


  /*
  ==============================

  DELETE GOAL

  ==============================
  */

  const handleDeleteGoal =
    async (
      goal
    ) => {
      const {
        error,
      } =
        await deleteGoal(
          goal.id
        );


      if (error) {


        showError(getUserFriendlyError(error, "Failed to delete goal."));


        return;


      }


      setGoals(

        (current) =>

          current.filter(

            (item) =>

              item.id !==
              goal.id

          )

      );


      setContributionsMap(

        (current) => {


          const updated = {
            ...current,
          };


          delete updated[
            goal.id
          ];


          return updated;


        }

      );
      showSuccess("Goal deleted successfully.");


    };

  const confirmDeleteGoal = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    await handleDeleteGoal(deleteTarget);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const requestDeleteGoal = (goal) => {
    setDeleteTarget(goal);
  };


  /*
  ==============================

  ADD MONEY

  ==============================
  */

  const handleOpenContribution =
    (
      goal
    ) => {


      setSelectedGoal(
        goal
      );


      setIsContributionModalOpen(
        true
      );


    };


  /*
  ==============================

  SUBMIT CONTRIBUTION

  ==============================
  */

  const handleSubmitContribution =
    async (
      contributionData
    ) => {


      if (
        !selectedGoal
      ) {

        return;

      }


      const {

        data,

        error,

      } =
        await createContribution({

          ...contributionData,

          user_id:
            user.id,

          goal_id:
            selectedGoal.id,

        });


      if (error) {


        showError(getUserFriendlyError(error, "Failed to add goal contribution."));


        return;


      }


      setContributionsMap(

        (current) => ({

          ...current,

          [selectedGoal.id]: [

            data,

            ...(current[
              selectedGoal.id
            ] || []),

          ],

        })

      );
      showSuccess("Goal contribution added successfully.");


      setSelectedGoal(
        null
      );


      setIsContributionModalOpen(
        false
      );


    };


  /*
  ==============================

  SUMMARY

  ==============================
  */

  const summary =
    useMemo(() => {


      let totalSaved = 0;


      let totalTarget = 0;


      let completedGoals = 0;


      goals.forEach(
        (goal) => {


          const contributions =

            contributionsMap[
              goal.id
            ] || [];


          const saved =

            contributions.reduce(

              (

                total,

                contribution

              ) =>

                total +

                Number(
                  contribution.amount
                ),

              0

            );


          const target =

            Number(
              goal.target_amount
            );


          totalSaved +=
            saved;


          totalTarget +=
            target;


          if (
            saved >= target
          ) {

            completedGoals++;

          }


        }

      );


      return {

        totalGoals:
          goals.length,

        completedGoals,

        totalSaved,

        totalTarget,

      };


    }, [

      goals,

      contributionsMap,

    ]);


  /*
  ==============================

  LOADING

  ==============================
  */

  if (
    loading
  ) {

    return <GoalSkeleton />;


  }


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">


        <div>


          <div className="flex items-center gap-3">


            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

              <Target size={21} />

            </div>


            <div>


              <h1 className="text-2xl font-bold text-white">

                Financial Goals

              </h1>


              <p className="mt-1 text-sm text-slate-400">

                Track your savings and achieve your goals.

              </p>


            </div>


          </div>


        </div>


        <button

          onClick={
            handleAddGoal
          }

          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-400"

        >

          <Plus size={18} />

          Create Goal

        </button>


      </div>


      {/* ERROR */}

      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => void loadGoals()}
        />
      )}


      {/* SUMMARY */}

      <GoalSummary

        totalGoals={
          summary.totalGoals
        }

        completedGoals={
          summary.completedGoals
        }

        totalSaved={
          summary.totalSaved
        }

        totalTarget={
          summary.totalTarget
        }

      />


      {/* GOALS */}

      {goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No financial goals yet."
          description="Create a goal and start saving."
          actionText="Create Goal"
          onAction={handleAddGoal}
        />


      ) : (


        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">


          {goals.map(
            (goal) => (

              <GoalCard

                key={goal.id}

                goal={goal}

                contributions={

                  contributionsMap[
                    goal.id
                  ] || []

                }

                onEdit={
                  handleEditGoal
                }

                onDelete={
                  requestDeleteGoal
                }

                onAddMoney={
                  handleOpenContribution
                }

              />

            )
          )}


        </div>


      )}


      {/* GOAL MODAL */}

      <Modal

        isOpen={
          isGoalModalOpen
        }

        onClose={() => {


          setIsGoalModalOpen(
            false
          );


          setSelectedGoal(
            null
          );


        }}

        title={

          selectedGoal

            ? "Edit Goal"

            : "Create Financial Goal"

        }

      >


        <GoalForm

          goal={
            selectedGoal
          }

          onSubmit={
            handleSubmitGoal
          }

          onCancel={() => {


            setIsGoalModalOpen(
              false
            );


            setSelectedGoal(
              null
            );


          }}

        />


      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteGoal}
        title="Delete Goal?"
        description="This goal and its contribution history will be permanently deleted."
        loading={deleteLoading}
      />


      {/* CONTRIBUTION MODAL */}

      <Modal

        isOpen={
          isContributionModalOpen
        }

        onClose={() => {


          setIsContributionModalOpen(
            false
          );


          setSelectedGoal(
            null
          );


        }}

        title="Add Money to Goal"

      >


        {selectedGoal && (

          <ContributionForm

            goal={
              selectedGoal
            }

            onSubmit={
              handleSubmitContribution
            }

            onCancel={() => {


              setIsContributionModalOpen(
                false
              );


              setSelectedGoal(
                null
              );


            }}

          />

        )}


      </Modal>


    </div>

  );


}


export default Goals;
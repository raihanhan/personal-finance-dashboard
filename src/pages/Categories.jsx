import {
  useEffect,
  useState,
} from "react";

import {

  Plus,

  Pencil,

  Trash2,

  CircleDollarSign,

  ShoppingBag,

  Utensils,

  Car,

  ShoppingCart,

  Home,

  HeartPulse,

  GraduationCap,

  Gamepad2,

  BriefcaseBusiness,

  TrendingUp,

  Circle,

} from "lucide-react";


import Modal from "../components/ui/Modal";
import ConfirmationModal from "../components/ui/ConfirmationModal";

import CategoryForm from
  "../components/categories/CategoryForm";


import {

  getCategories,

  createCategory,

  updateCategory,

  deleteCategory,

} from "../services/categoryService";


import {
  useAuth,
} from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { getUserFriendlyError } from "../utils/errors";
import ErrorState from "../components/ui/ErrorState";


function Categories() {


  const { user } =
    useAuth();
  const { showSuccess, showError } = useToast();


  const [categories, setCategories] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [errorMessage, setErrorMessage] =
    useState("");


  const [isModalOpen, setIsModalOpen] =
    useState(false);


  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);


  const loadCategories = async () => {

    setLoading(true);

    setErrorMessage("");


    const {
      data,
      error,
    } = await getCategories();


    if (error) {

      setErrorMessage(getUserFriendlyError(error, "Unable to load categories."));

    }


    setCategories(
      data || []
    );


    setLoading(false);

  };


  useEffect(() => {

    if (user) {

      void Promise.resolve().then(loadCategories);

    }

  }, [user]);


  const handleAddCategory = () => {

    setSelectedCategory(null);

    setIsModalOpen(true);

  };


  const handleEditCategory = (
    category
  ) => {

    setSelectedCategory(category);

    setIsModalOpen(true);

  };


  const handleSubmitCategory = async (
    categoryData
  ) => {


    /* CREATE */

    if (!selectedCategory) {

      const {
        data,
        error,
      } = await createCategory({

        ...categoryData,

        user_id: user.id,

      });


      if (error) {

        showError(getUserFriendlyError(error, "Failed to create category."));

        return;

      }


      setCategories((current) => [

        ...current,

        data,

      ]);
      showSuccess("Category created successfully.");

    }


    /* UPDATE */

    else {

      const {
        data,
        error,
      } = await updateCategory(

        selectedCategory.id,

        categoryData

      );


      if (error) {

        showError(getUserFriendlyError(error, "Failed to update category."));

        return;

      }


      setCategories((current) =>
        current.map(
          (category) =>

            category.id === data.id

              ? data

              : category
        )
      );
      showSuccess("Category updated successfully.");

    }


    setSelectedCategory(null);

    setIsModalOpen(false);

  };


  const handleDeleteCategory = async (
    category
  ) => {
    const {
      error,
    } = await deleteCategory(
      category.id
    );


    if (error) {

      showError(getUserFriendlyError(error, "Failed to delete category."));

      return;

    }


    setCategories((current) =>
      current.filter(
        (item) =>
          item.id !== category.id
      )
    );
    showSuccess("Category deleted successfully.");

  };

  const confirmDeleteCategory = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    await handleDeleteCategory(deleteTarget);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };


  const getCategoryIcon = (
    icon
  ) => {


    const iconProps = {
      size: 20,
    };


    switch (icon) {


      case "food":

        return (
          <Utensils {...iconProps} />
        );


      case "transport":

        return (
          <Car {...iconProps} />
        );


      case "shopping":

        return (
          <ShoppingCart {...iconProps} />
        );


      case "home":

        return (
          <Home {...iconProps} />
        );


      case "health":

        return (
          <HeartPulse {...iconProps} />
        );


      case "education":

        return (
          <GraduationCap {...iconProps} />
        );


      case "entertainment":

        return (
          <Gamepad2 {...iconProps} />
        );


      case "salary":

        return (
          <CircleDollarSign
            {...iconProps}
          />
        );


      case "business":

        return (
          <BriefcaseBusiness
            {...iconProps}
          />
        );


      case "investment":

        return (
          <TrendingUp
            {...iconProps}
          />
        );


      default:

        return (
          <Circle {...iconProps} />
        );

    }

  };


  const incomeCategories =
    categories.filter(
      (category) =>
        category.type === "income"
    );


  const expenseCategories =
    categories.filter(
      (category) =>
        category.type === "expense"
    );


  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-sm text-slate-400">

            Loading categories...

          </p>

        </div>

      </div>

    );

  }


  const renderCategorySection = ({
    title,
    description,
    items,
    type,
  }) => (

    <div className="rounded-2xl border border-slate-800 bg-[#111927]">


      {/* SECTION HEADER */}

      <div className="flex items-center justify-between border-b border-slate-800 p-5">


        <div>

          <div className="flex items-center gap-3">


            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                type === "income"

                  ? "bg-emerald-500/10 text-emerald-400"

                  : "bg-red-500/10 text-red-400"
              }`}
            >

              {type === "income"

                ? <CircleDollarSign size={20} />

                : <ShoppingBag size={20} />
              }

            </div>


            <div>

              <h2 className="font-semibold text-white">

                {title}

              </h2>


              <p className="mt-1 text-xs text-slate-500">

                {description}

              </p>

            </div>

          </div>

        </div>


        <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-400">

          {items.length}

        </span>

      </div>


      {/* CATEGORIES */}

      {items.length === 0 ? (

        <div className="p-10 text-center">

          <p className="text-sm text-slate-500">

            No categories yet.

          </p>


          <button
            onClick={handleAddCategory}
            className="mt-4 text-sm font-medium text-blue-400 hover:text-blue-300"
          >

            Create Category

          </button>

        </div>

      ) : (

        <div className="divide-y divide-slate-800">


          {items.map(
            (category) => (

              <div
                key={category.id}
                className="flex items-center justify-between p-4 transition hover:bg-slate-800/30"
              >


                <div className="flex items-center gap-4">


                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{

                      backgroundColor:
                        `${category.color}20`,

                      color:
                        category.color,

                    }}
                  >

                    {getCategoryIcon(
                      category.icon
                    )}

                  </div>


                  <div>

                    <p className="font-medium text-white">

                      {category.name}

                    </p>


                    <p className="mt-1 text-xs text-slate-500">

                      {type === "income"

                        ? "Income Category"

                        : "Expense Category"

                      }

                    </p>

                  </div>


                </div>


                {/* ACTIONS */}

                <div className="flex items-center gap-1">


                  <button
                    onClick={() =>
                      handleEditCategory(
                        category
                      )
                    }
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                  >

                    <Pencil size={16} />

                  </button>


                  <button
                    onClick={() =>
                        setDeleteTarget(category)
                    }
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >

                    <Trash2 size={16} />

                  </button>


                </div>


              </div>

            )
          )}

        </div>

      )}


    </div>

  );


  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">


        <div>

          <h1 className="text-2xl font-bold text-white">

            Categories

          </h1>


          <p className="mt-1 text-sm text-slate-400">

            Organize your income and expenses.

          </p>

        </div>


        <button
          onClick={handleAddCategory}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
        >

          <Plus size={18} />

          Add Category

        </button>


      </div>


      {/* ERROR */}

      {errorMessage && (
        <ErrorState
          message={errorMessage}
          onRetry={() => void loadCategories()}
        />
      )}


      {/* CATEGORY STATS */}

      <div className="grid gap-5 md:grid-cols-2">


        <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">

              <CircleDollarSign size={22} />

            </div>


            <div>

              <p className="text-sm text-slate-400">

                Income Categories

              </p>


              <p className="mt-1 text-2xl font-bold text-white">

                {incomeCategories.length}

              </p>

            </div>

          </div>

        </div>


        <div className="rounded-2xl border border-slate-800 bg-[#111927] p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">

              <ShoppingBag size={22} />

            </div>


            <div>

              <p className="text-sm text-slate-400">

                Expense Categories

              </p>


              <p className="mt-1 text-2xl font-bold text-white">

                {expenseCategories.length}

              </p>

            </div>

          </div>

        </div>


      </div>


      {/* CATEGORY LIST */}

      <div className="grid gap-6 xl:grid-cols-2">


        {renderCategorySection({

          title: "Income Categories",

          description: "Categories used for income transactions.",

          items: incomeCategories,

          type: "income",

        })}


        {renderCategorySection({

          title: "Expense Categories",

          description: "Categories used for expense transactions.",

          items: expenseCategories,

          type: "expense",

        })}


      </div>


      {/* MODAL */}

      <Modal

        isOpen={isModalOpen}

        onClose={() => {

          setIsModalOpen(false);

          setSelectedCategory(null);

        }}

        title={
          selectedCategory

            ? "Edit Category"

            : "Add Category"
        }

      >

        <CategoryForm

          category={
            selectedCategory
          }

          onSubmit={
            handleSubmitCategory
          }

          onCancel={() => {

            setIsModalOpen(false);

            setSelectedCategory(null);

          }}

        />

      </Modal>

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteCategory}
        title="Delete Category?"
        description="This category will be permanently deleted. Existing transactions may no longer show its category name."
        loading={deleteLoading}
      />


    </div>

  );

}


export default Categories;
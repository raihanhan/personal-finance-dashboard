import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  AuthProvider,
} from "./contexts/AuthContext";

import { ToastProvider } from "./contexts/ToastContext";
import ToastViewport from "./components/ui/ToastViewport";
import ErrorBoundary from "./components/errors/ErrorBoundary";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Categories from "./pages/Categories";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PlaceholderPage from "./pages/PlaceholderPage";


function App() {

  return (

    <ErrorBoundary>
      <BrowserRouter>

      <AuthProvider>

        <ToastProvider>

        <Routes>


          {/* PUBLIC ROUTES */}

          <Route
            path="/login"
            element={<Login />}
          />


          <Route
            path="/register"
            element={<Register />}
          />


          {/* PROTECTED ROUTES */}

          <Route
            path="/*"
            element={

              <ProtectedRoute>

                <DashboardLayout>

                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />


                    <Route
                      path="/transactions"
                      element={<Transactions />}
                    />


                    <Route
                      path="/accounts"
                      element={<Accounts />}
                    />

                    <Route
                      path="/categories"
                      element={<Categories />}
                    />

                    <Route
                      path="/budgets"
                      element={<Budgets />}
                    />


                    <Route
                      path="/analytics"
                      element={<Analytics />}
                    />


                    <Route
                      path="/goals"
                      element={<Goals />}
                    />


                    <Route
                      path="/cards"
                      element={
                        <PlaceholderPage
                          title="Cards"
                        />
                      }
                    />
                    
                    <Route
                      path="/investments"
                      element={
                        <PlaceholderPage
                          title="Investments"
                        />
                      }
                    />


                    <Route
                      path="/activity"
                      element={
                        <PlaceholderPage
                          title="Activity"
                        />
                      }
                    />


                    <Route
                      path="/settings"
                      element={
                        <PlaceholderPage
                          title="Settings"
                        />
                      }
                    />

                  </Routes>

                </DashboardLayout>

              </ProtectedRoute>

            }
          />

        </Routes>

        <ToastViewport />

        </ToastProvider>

      </AuthProvider>

      </BrowserRouter>
    </ErrorBoundary>

  );

}


export default App;
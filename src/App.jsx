import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <BrowserRouter>

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
            element={<PlaceholderPage title="Cards" />}
          />

          <Route
            path="/investments"
            element={<PlaceholderPage title="Investments" />}
          />

          <Route
            path="/activity"
            element={<PlaceholderPage title="Activity" />}
          />

          <Route
            path="/settings"
            element={<PlaceholderPage title="Settings" />}
          />

        </Routes>

      </DashboardLayout>

    </BrowserRouter>
  );
}

export default App;
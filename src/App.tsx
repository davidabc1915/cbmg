import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { PrivateRoute } from './components/layout/PrivateRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Sessions } from './pages/Sessions';
import { Goals } from './pages/Goals';
import { Checklists } from './pages/Checklists';
import { Reports } from './pages/Reports';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <DashboardLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="pacientes" element={<Patients />} />
                <Route path="sessoes" element={<Sessions />} />
                <Route path="metas" element={<Goals />} />
                <Route path="checklists" element={<Checklists />} />
                <Route path="relatorios" element={<Reports />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
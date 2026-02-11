import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './context/AuthContext';
import client from './apollo/client';

// Layouts
import PublicLayout from './components/layouts/PublicLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import SignUpPage from './pages/public/SignUpPage';
import AcceptInvitationPage from './pages/public/AcceptInvitationPage';
import ProgramsPage from './pages/public/ProgramsPage';
import ProgramDetailPage from './pages/public/ProgramDetailPage';

// Dashboard pages
import DashboardHome from './pages/dashboard/DashboardHome';
import ProgramsList from './pages/dashboard/ProgramsList';
import ProgramForm from './pages/dashboard/ProgramForm';
import CategoriesPage from './pages/dashboard/CategoriesPage';
import UsersPage from './pages/dashboard/UsersPage';
import TestimonialsPage from './pages/dashboard/TestimonialsPage';
import EnrollmentsPage from './pages/dashboard/EnrollmentsPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes — with Navbar & footer */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            <Route path="/signup" element={<PublicLayout><SignUpPage /></PublicLayout>} />
            <Route path="/accept-invitation/:token" element={<PublicLayout><AcceptInvitationPage /></PublicLayout>} />
            <Route path="/programs" element={<PublicLayout><ProgramsPage /></PublicLayout>} />
            <Route path="/programs/:slug" element={<PublicLayout><ProgramDetailPage /></PublicLayout>} />

            {/* Dashboard Routes — protected, with sidebar */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout><DashboardHome /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/programs"
              element={
                <ProtectedRoute>
                  <DashboardLayout><ProgramsList /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/programs/create"
              element={
                <ProtectedRoute>
                  <DashboardLayout><ProgramForm /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/programs/:id/edit"
              element={
                <ProtectedRoute>
                  <DashboardLayout><ProgramForm /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/categories"
              element={
                <ProtectedRoute>
                  <DashboardLayout><CategoriesPage /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute>
                  <DashboardLayout><UsersPage /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/testimonials"
              element={
                <ProtectedRoute>
                  <DashboardLayout><TestimonialsPage /></DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/enrollments"
              element={
                <ProtectedRoute>
                  <DashboardLayout><EnrollmentsPage /></DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

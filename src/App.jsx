
// src/App.jsx (modified with routing)
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import JobsList from './components/JobsList';
import ProtectedRoute from './components/ProtectedRoute';
import RWIForm from './components/RetainingWallInspectionForm.jsx'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={
            <ProtectedRoute>
              <JobsList />
            </ProtectedRoute>
          } />
          <Route path="/inspection/:jobId" element={
            <ProtectedRoute>
              <RWIForm />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


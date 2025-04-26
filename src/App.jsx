// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Header from './components/Header';
import Login from './components/Login';
import JobsList from './components/JobsList';
import InspectionForm from './components/InspectionForm';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <AuthenticatedTemplate >
          <Routes>
            <Route path="/jobs" element={
              <JobsList />
            } />
            <Route path="/inspection/:jobId" element={
              <InspectionForm />
            } />
          </Routes>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </UnauthenticatedTemplate>
      </Router>
    </>
  );
}

export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import AllUsersPage from './pages/AllUsersPage';
import SingleUserPage from './pages/SingleUserPage';
import CreateUserPage from './pages/CreateUserPage';
import StatisticsPage from './pages/StatisticsPage';
import NotFoundPage from './pages/NotFoundPage.js';
import DeleteUserPage from './pages/DeleteUserPage.js';
import UpdateUserPage from './pages/UpdateUserPage';
import AddRecoveryPage from './pages/AddRecoveryPage.js';
import AddVaccinatorPage from './pages/AddVaccinatorPage.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<AllUsersPage />} />
          <Route path="/users/:_id" element={<SingleUserPage />} />
          <Route path="/create" element={<CreateUserPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/vaccinator/:_id" element={<AddVaccinatorPage />} />
          <Route path="/recovery/:_id" element={<AddRecoveryPage />} />
          <Route path="/edit/:patientId" element={<UpdateUserPage />} /> 
          <Route path="/delete/:patientId" element={<DeleteUserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

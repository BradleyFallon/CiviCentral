// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Components to be rendered
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import DiscussionList from './components/DiscussionList';
import DiscussionDetail from './components/DiscussionDetail';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';
import ExpertAnalysisList from './components/ExpertAnalysisList';
import ExpertAnalysisDetail from './components/ExpertAnalysisDetail';
import UserSettings from './components/UserSettings';

// Page Components
import Homepage from './components/Homepage';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/discussions" element={<DiscussionList />} />
          <Route path="/discussion/:id" element={<DiscussionDetail />} />
          <Route path="/issues" element={<IssueList />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
          <Route path="/expert-analyses" element={<ExpertAnalysisList />} />
          <Route path="/expert-analysis/:id" element={<ExpertAnalysisDetail />} />
          <Route path="/user-settings" element={<UserSettings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

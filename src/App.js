import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/userAuth/AuthContext';
import Header from './components/header';
import Login from './components/userAuth/Login';
import Logout from './components/userAuth/Logout';

import HomePage from './components/home';
import SegmentManager from './components/segment/segment_managment';
import EditSegment from './components/segment/EditSegment';
import EventSummaryManager from './components/event_summaries/event_summary_managment';
import DataPartnerManagment from './components/data_partner/partner_managment';
import DataManager from './components/data/data_home';
import DataUpload from './components/data/data_upload/data_upload';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
            <Route path="/data" element={<ProtectedRoute element={<DataManager />} />} />
            <Route path="/data/upload/:partner_id" element={<ProtectedRoute element={<DataUpload />} />} />
            <Route path="/segments/create" element={<ProtectedRoute element={<SegmentManager />} />} />
            <Route path="/segments/:segmentId/edit" element={<ProtectedRoute element={<EditSegment />} />} />
            <Route path="/eventsummaries/" element={<ProtectedRoute element={<EventSummaryManager />} />} />
            <Route path="/eventsummaries/:brand_id" element={<ProtectedRoute element={<EventSummaryManager />} />} />
            <Route path="/data_partners" element={<ProtectedRoute element={<DataPartnerManagment />} />} />
            <Route path="/data_partners/:data_partner_id/brand/:brand_id" element={<ProtectedRoute element={<DataPartnerManagment />} />} />
          </Routes>
        </React.Suspense>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return element;
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import PerformancePage from './pages/PerformancePage';
import GalleryPage from './pages/GalleryPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ApplicationModal from './components/ApplicationModal';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState('');

  const handleOpenBooking = (courseId = '') => {
    setSelectedCourseForModal(courseId);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedCourseForModal('');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
          <Navbar onOpenBookingModal={() => handleOpenBooking()} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage onOpenBookingModal={handleOpenBooking} />} />
              <Route path="/courses" element={<CoursesPage onOpenBookingModal={handleOpenBooking} />} />
              <Route path="/performance-request" element={<PerformancePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Slot Booking & Application Modal */}
          <ApplicationModal
            isOpen={isBookingModalOpen}
            onClose={handleCloseBooking}
            initialCourseId={selectedCourseForModal}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

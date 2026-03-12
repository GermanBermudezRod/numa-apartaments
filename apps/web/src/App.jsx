
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from './pages/HomePage';
import ReservationModal from '@/components/ReservationModal.jsx';

function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationModalOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationModalOpen(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header onOpenReservation={handleOpenReservation} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenReservation={handleOpenReservation} />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={handleCloseReservation} 
      />
      <Toaster />
    </Router>
  );
}

export default App;

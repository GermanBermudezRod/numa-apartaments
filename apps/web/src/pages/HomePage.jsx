
import React from 'react';
import { Helmet } from 'react-helmet';
import EditableHero from '@/components/EditableHero.jsx';
import EditableFloorSections from '@/components/EditableFloorSections.jsx';
import ResidenceGallery from '@/components/ResidenceGallery.jsx';
import EditableCTA from '@/components/EditableCTA.jsx';

const HomePage = ({ onOpenReservation }) => {
  return (
    <>
      <Helmet>
        <title>Numa Beach Apartments</title>
        <meta
          name="description"
          content="Experimente la vida de lujo frente al mar en Numa Beach Apartments. Residencias modernas con impresionantes vistas al océano, comodidades premium y acceso directo a la playa."
        />
      </Helmet>

      <main className="flex flex-col w-full overflow-hidden">
        <EditableHero />
        
        <div className="relative z-10 bg-background">
          <EditableFloorSections onOpenReservation={onOpenReservation} />
        </div>
        
        <div className="relative z-10">
          <ResidenceGallery />
        </div>
        
        <div className="relative z-10">
          <EditableCTA />
        </div>
      </main>
    </>
  );
};

export default HomePage;

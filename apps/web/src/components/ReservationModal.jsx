
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

const ReservationModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-accent" />
            Reservar / Disponibilidad
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-4 text-base">
            Gracias por su interés en Numa Beach Apartments. Nuestro sistema de reservas en línea estará disponible próximamente. 
            <br /><br />
            Por favor, utilice el formulario de contacto en la parte inferior de la página para consultar la disponibilidad actual y realizar su reserva directamente con nuestro equipo.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onClose}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

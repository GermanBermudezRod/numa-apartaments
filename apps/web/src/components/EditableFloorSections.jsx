
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Building2, Building, Crown, Calendar } from 'lucide-react';

// Imágenes locales — añade un import por cada imagen que quieras usar
import imgBajo from '../assets/gallery/bajo/Bajo-BPPL06418.jpg';
import imgPrimera from '../assets/gallery/primera-planta/1Planta-PPL06205-Mejorado-NR.jpg';
import imgSegunda from '../assets/gallery/segunda-planta/2Planta-BPPL06411-Mejorado-NR.jpg';
import imgAtico   from '../assets/gallery/atico/Atico-BPPL06315-Mejorado-NR.jpg';

const EditableFloorSections = ({
  onOpenReservation,
  floors = [{
    id: 'bajo',
    name: 'Bajo',
    icon: Home,
    description: 'Residencias en planta baja con acceso directo al jardín',
    amenities: ['Jardín Privado', 'Terraza', 'Acceso Directo', 'Acabados Premium'],
    units: 4,
    image: imgBajo,
    features: 'Amplios apartamentos en planta baja con jardines privados y una perfecta integración entre el interior y el exterior. Ideal para quienes aprecian el acceso directo a la naturaleza.'
  }, {
    id: 'primera',
    name: 'Primera',
    icon: Building2,
    description: 'Apartamentos en primera planta con vistas elevadas',
    amenities: ['Vistas Despejadas', 'Gran Balcón', 'Techos Altos', 'Cocina Moderna'],
    units: 6,
    image: imgPrimera,
    features: 'Espacios de vida elevados con vistas panorámicas. Estas residencias ofrecen el equilibrio perfecto entre accesibilidad y vistas impresionantes, con generosos balcones para el entretenimiento al aire libre.'
  }, {
    id: 'segunda',
    name: 'Segunda',
    icon: Building,
    description: 'Residencias en segunda planta con vistas panorámicas',
    amenities: ['Vistas Panorámicas', 'Distribución Amplia', 'Electrodomésticos Premium', 'Vestidores'],
    units: 6,
    image: imgSegunda,
    features: 'Experimente vistas panorámicas sin obstáculos desde estos apartamentos de segunda planta cuidadosamente diseñados. Disfrute de mayor privacidad y espectaculares puestas de sol desde su terraza privada.'
  }, {
    id: 'atico',
    name: 'Ático',
    icon: Crown,
    description: 'Exclusivas suites penthouse con terrazas en la azotea',
    amenities: ['Azotea Privada', 'Vistas 360°', 'Acabados de Lujo', 'Ubicación Premium'],
    units: 2,
    image: imgAtico,
    features: 'El pináculo de la vida de lujo. Nuestros exclusivos áticos cuentan con terrazas privadas en la azotea, vistas de 360 grados y los mejores acabados. Experimente una elegancia y privacidad inigualables.'
  }]
}) => {
  return (
    <section id="residence-levels" className="py-16 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Niveles Residenciales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elija entre cuatro niveles distintivos, cada uno ofreciendo características únicas
          </p>
        </motion.div>

        <Tabs defaultValue="bajo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-card p-1 rounded-xl shadow-sm">
            {floors.map(floor => {
              const Icon = floor.icon;
              return (
                <TabsTrigger 
                  key={floor.id} 
                  value={floor.id} 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-foreground rounded-lg transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{floor.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {floors.map((floor, index) => (
            <TabsContent key={floor.id} value={floor.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-border">
                  <div className="grid md:grid-cols-2 gap-0 h-full">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={floor.image} 
                        alt={`Residencia en planta ${floor.name}`} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex-grow">
                        <CardHeader className="p-0 mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-3xl font-bold text-foreground">
                              {floor.name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-sm">
                              {floor.units} Unidades
                            </Badge>
                          </div>
                          <CardDescription className="text-base text-muted-foreground">
                            {floor.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0 space-y-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {floor.features}
                          </p>

                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                              Comodidades
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {floor.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                      
                      {/* Button aligned to the right */}
                      <div className="mt-8 pt-6 border-t border-border flex justify-end items-center">
                        <Button 
                          onClick={onOpenReservation} 
                          className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          Reservar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default EditableFloorSections;

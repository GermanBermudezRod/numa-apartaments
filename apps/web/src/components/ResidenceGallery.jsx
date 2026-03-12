
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Lightbox from './Lightbox';

// Carga automática de imágenes desde src/assets/gallery/<carpeta>/
// Estructura de carpetas esperada:
//   src/assets/gallery/zonas-comunes/
//   src/assets/gallery/bajo/
//   src/assets/gallery/primera-planta/
//   src/assets/gallery/segunda-planta/
//   src/assets/gallery/atico/
//
// Basta con soltar las fotos en la carpeta correspondiente; no hay que tocar este archivo.

const imageModules = import.meta.glob(
  '../assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);

const FOLDER_TO_CATEGORY = {
  'zonas-comunes': 'Zonas Comunes',
  'bajo': 'Bajo',
  'primera-planta': 'Primera Planta',
  'segunda-planta': 'Segunda Planta',
  'atico': 'Ático',
};

const buildGalleryData = () => {
  const data = {};
  Object.values(FOLDER_TO_CATEGORY).forEach(cat => { data[cat] = []; });

  Object.entries(imageModules).forEach(([path, module]) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const folderName = parts[parts.length - 2];
    const category = FOLDER_TO_CATEGORY[folderName];
    if (category) {
      data[category].push({
        id: fileName,           // nombre de archivo → controla el orden
        url: module.default,
        alt: `${category} - ${fileName.replace(/\.[^.]+$/, '').replace(/^\d+[-_\s]*/, '')}`,
      });
    }
  });

  // Orden por nombre de archivo (numérico si empieza por número)
  // Para controlar el orden basta renombrar: 01-salon.jpg, 02-cocina.jpg, etc.
  Object.keys(data).forEach(cat => {
    data[cat].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
  });

  return data;
};

const CATEGORIES = ['Zonas Comunes', 'Bajo', 'Primera Planta', 'Segunda Planta', 'Ático'];

const galleryData = buildGalleryData();

const ResidenceGallery = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    index: 0
  });

  const currentImages = useMemo(() => galleryData[activeTab] || [], [activeTab]);

  const openLightbox = (index) => {
    setLightboxState({ isOpen: true, index });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (direction) => {
    setLightboxState(prev => {
      const newIndex = direction === 'next' 
        ? (prev.index + 1) % currentImages.length
        : (prev.index - 1 + currentImages.length) % currentImages.length;
      return { ...prev, index: newIndex };
    });
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Galería
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore los detalles y acabados de nuestras exclusivas propiedades. Un vistazo a su futuro hogar.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 rounded-full ${
                activeTab === category 
                  ? 'text-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-secondary border border-accent/40 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid or Empty State */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="min-h-[400px]"
        >
          {currentImages.length > 0 ? (
            <div className="gallery-grid">
              {currentImages.map((image, index) => (
                <div
                  key={image.id}
                  className="gallery-item aspect-square md:aspect-[4/3] shadow-sm hover:shadow-xl"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    loading="lazy"
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] bg-secondary/50 rounded-2xl border border-border border-dashed">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Próximamente</h3>
              <p className="text-muted-foreground text-center max-w-md px-4">
                Estamos preparando las mejores imágenes para esta sección. Vuelva pronto para descubrir más detalles.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <Lightbox
        isOpen={lightboxState.isOpen}
        images={currentImages}
        currentImageIndex={lightboxState.index}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </section>
  );
};

export default ResidenceGallery;

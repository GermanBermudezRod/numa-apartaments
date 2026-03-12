
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const EditableHero = ({
  heading = 'Apartamentos Numa Beach',
  tagline = 'Lujo frente al mar redefinido',
  backgroundImage = 'https://horizons-cdn.hostinger.com/27da1632-bf6a-4f91-8ac1-80c32fefe07f/18a4d56e495a46b12c974321cbcc14cd.jpg',
  overlayOpacity = 0.5,
  ctaText = 'Explorar nuestras residencias'
}) => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            {heading}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 font-light tracking-wide">
            {tagline}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('residence-levels')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {ctaText}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditableHero;

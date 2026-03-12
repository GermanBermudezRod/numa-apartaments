
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Numa Beach Apartments
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Vida de lujo con comodidades modernas. Experimente la combinación perfecta de confort y elegancia en un entorno exclusivo diseñado para su bienestar.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Calle Principal 123, 28001 Madrid
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  +34 91 234 5678
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  info@numabeach.com
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <a
                href="#facebook"
                className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#instagram"
                className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#twitter"
                className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Numa Beach Apartments. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

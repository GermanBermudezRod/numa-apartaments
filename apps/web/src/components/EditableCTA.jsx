
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const EditableCTA = ({
  heading = 'Póngase en Contacto',
  description = '¿Interesado en hacer de Numa Beach su hogar? Contáctenos hoy para programar un recorrido privado o conocer más sobre nuestras residencias disponibles.',
  buttonText = 'Enviar Consulta',
  backgroundColor = 'bg-background'
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
      toast({
        title: 'Información Incompleta',
        description: 'Por favor, complete todos los campos obligatorios.',
        variant: 'destructive'
      });
      setIsSubmitting(false);
      return;
    }

    // Store in localStorage
    try {
      const submissions = JSON.parse(localStorage.getItem('numaBeachInquiries') || '[]');
      const newSubmission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      submissions.push(newSubmission);
      localStorage.setItem('numaBeachInquiries', JSON.stringify(submissions));

      // Show success message
      toast({
        title: '¡Consulta Enviada!',
        description: 'Gracias por su interés. Nos pondremos en contacto con usted en breve.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo enviar la consulta. Por favor, inténtelo de nuevo.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="rounded-xl shadow-lg border-border">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-4xl font-bold text-foreground mb-3">
                {heading}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-input text-foreground border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-input text-foreground border-border"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Número de Teléfono
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+34 912 345 678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-input text-foreground border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="text-foreground">
                      Tipo de Consulta *
                    </Label>
                    <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-input text-foreground border-border">
                        <SelectValue placeholder="Seleccione el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tour">Programar un Recorrido</SelectItem>
                        <SelectItem value="availability">Consultar Disponibilidad</SelectItem>
                        <SelectItem value="pricing">Información de Precios</SelectItem>
                        <SelectItem value="general">Consulta General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntenos sobre su interés en Numa Beach Apartments..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-input text-foreground border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      {buttonText}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EditableCTA;

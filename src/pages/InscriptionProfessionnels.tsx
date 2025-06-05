
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormulaireProfessionnels } from "@/components/FormulaireProfessionnels";

const InscriptionProfessionnels = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-simplonBgRed via-white to-simplonBgBlue font-body">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-simplonRed hover:text-red-700 hover:bg-simplonBgRed">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-simplonRed mb-4 font-title">
              Inscription - Travailleurs & Entrepreneurs
            </h1>
            <p className="text-simplonGrayBody text-lg">
              Perfectionnez vos compétences avec nos formations avancées. 
              Conçues pour les professionnels en activité et les entrepreneurs ambitieux.
            </p>
          </div>
          
          <FormulaireProfessionnels />
        </div>
      </div>
    </div>
  );
};

export default InscriptionProfessionnels;

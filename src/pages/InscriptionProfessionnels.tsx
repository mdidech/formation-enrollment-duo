
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormulaireProfessionnels } from "@/components/FormulaireProfessionnels";

const InscriptionProfessionnels = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-purple-600 hover:text-purple-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">
              Inscription - Travailleurs & Entrepreneurs
            </h1>
            <p className="text-gray-600 text-lg">
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


import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormulaireEtudiants } from "@/components/FormulaireEtudiants";

const InscriptionEtudiants = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">
              Inscription - Étudiants & Demandeurs d'emploi
            </h1>
            <p className="text-gray-600 text-lg">
              Remplissez ce formulaire pour vous inscrire à nos formations spécialisées. 
              Nos programmes sont conçus pour vous accompagner dans votre développement professionnel.
            </p>
          </div>
          
          <FormulaireEtudiants />
        </div>
      </div>
    </div>
  );
};

export default InscriptionEtudiants;

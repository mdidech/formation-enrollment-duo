
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormulaireEtudiants } from "@/components/FormulaireEtudiants";

const InscriptionEtudiants = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-simplonBgBlue via-white to-simplonBgRed font-body">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-simplonBlue hover:text-simplonBlue2 hover:bg-simplonBgBlue">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-simplonBlue mb-4 font-title">
              Inscription - Étudiants & Demandeurs d'emploi
            </h1>
            <p className="text-simplonGrayBody text-lg">
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

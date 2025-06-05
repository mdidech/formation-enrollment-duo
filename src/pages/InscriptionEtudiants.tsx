
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormulaireEtudiants } from "@/components/FormulaireEtudiants";

const InscriptionEtudiants = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-simplonBgBlue via-white to-simplonBgRed font-body">
      <div className="container mx-auto px-4 py-8">
        
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-simplonBlue mb-4 font-title">
            Inscription au programme Talent4Startups | Power Up Your Digital Career !
            </h1>
            <p className="text-simplonGrayBody text-lg">
            Déployé par Simplon Maghreb – En partenariat avec Digital Africa

            </p>
          </div>
          
          <FormulaireEtudiants />
        </div>
      </div>
    </div>
  );
};

export default InscriptionEtudiants;

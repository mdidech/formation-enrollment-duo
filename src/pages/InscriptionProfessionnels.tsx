
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormulaireProfessionnels } from "@/components/FormulaireProfessionnels";

const InscriptionProfessionnels = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-simplonBgRed via-white to-simplonBgBlue font-body">
      <div className="container mx-auto px-4 py-8">
        
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-simplonBlue2 mb-4 font-title">
            Inscription au programme Talent4Startups | Power Up Your Digital Career !
            </h1>
            <p className="text-simplonGrayBody text-lg">
            Déployé par Simplon Maghreb – En partenariat avec Digital Africa
            </p>
          </div>
          
          <FormulaireProfessionnels />
        </div>
      </div>
    </div>
  );
};

export default InscriptionProfessionnels;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 text-destructive">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text bg-[#530b8e] text-destructive">
            Simplon Maghreb
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez votre parcours de formation selon votre profil professionnel
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
             <CardHeader className="text-center pb-4">
               <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                 <GraduationCap className="h-8 w-8 text-blue-600" />
               </div>
               <CardTitle className="text-2xl text-blue-800">Étudiants & Demandeurs d'emploi</CardTitle>
               <CardDescription className="text-gray-600">
                 Formations adaptées aux étudiants et personnes en recherche d'emploi
               </CardDescription>
             </CardHeader>
             <CardContent className="text-center">
               <div className="mb-6">
                 <h4 className="font-semibold mb-2 text-gray-800">Formations disponibles :</h4>
                 <ul className="text-sm text-gray-600 space-y-1">
                   <li>• Développement IA</li>
                   <li>• Développement Web</li>
                   <li>• Développement Web (100% Femmes)</li>
                 </ul>
               </div>
               <Link to="/talent4startups-inscription">
                 <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                   S'inscrire maintenant
                 </Button>
               </Link>
             </CardContent>
            </Card> */}

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-purple-800">Travailleurs & Entrepreneurs</CardTitle>
              <CardDescription className="text-gray-600">
                Formations pour professionnels en activité et entrepreneurs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-800">Formations disponibles :</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Workflow Automation </li>
                  {/* <li>• DevOps</li> */}
                  <li>• AI-Augmented Web Developpement</li>
                </ul>
              </div>
              <Link to="/talent4startups-inscription-professionnels">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg">
                  S'inscrire maintenant
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

};

export default Index;
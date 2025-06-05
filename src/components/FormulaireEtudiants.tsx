import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import PartnersLogos from "./PartnersLogos";

export const FormulaireEtudiants = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    genre: "",
    ville: "",
    situationActuelle: "",
    niveauEtudes: "",
    formationSouhaitee: "",
    autoriseMarketing: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL du webhook prédéfinie pour les étudiants
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/etudiants/inscription";

    setIsLoading(true);
    console.log("Envoi des données:", formData);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          type: "inscription_etudiants",
        }),
      });

      toast({
        title: "Inscription envoyée",
        description: "Votre demande d'inscription a été transmise avec succès. Nous vous contacterons bientôt.",
      });

      // Réinitialiser le formulaire
      setFormData({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        dateNaissance: "",
        genre: "",
        ville: "",
        situationActuelle: "",
        niveauEtudes: "",
        formationSouhaitee: "",
        autoriseMarketing: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PartnersLogos />
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">Formulaire d'inscription</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  required
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  required
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="telephone">Numéro de téléphone *</Label>
              <Input
                id="telephone"
                type="tel"
                required
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="dateNaissance">Date de naissance *</Label>
              <Input
                id="dateNaissance"
                type="date"
                required
                value={formData.dateNaissance}
                onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre *</Label>
              <Select onValueChange={(value) => handleInputChange("genre", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre genre" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ville">Ville *</Label>
              <Input
                id="ville"
                required
                value={formData.ville}
                onChange={(e) => handleInputChange("ville", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="situationActuelle">Situation actuelle *</Label>
              <Select onValueChange={(value) => handleInputChange("situationActuelle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre situation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="etudiant">Étudiant</SelectItem>
                  <SelectItem value="recherche_emploi">En recherche d'emploi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="niveauEtudes">Niveau d'études *</Label>
              <Select onValueChange={(value) => handleInputChange("niveauEtudes", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="niveau_bac">Niveau BAC</SelectItem>
                  <SelectItem value="bac">BAC</SelectItem>
                  <SelectItem value="bac_1">BAC+1</SelectItem>
                  <SelectItem value="bac_2">BAC+2</SelectItem>
                  <SelectItem value="bac_3">BAC+3</SelectItem>
                  <SelectItem value="bac_5">BAC+5</SelectItem>
                  <SelectItem value="phd">PHD</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="formationSouhaitee">Formation souhaitée *</Label>
              <Select onValueChange={(value) => handleInputChange("formationSouhaitee", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la formation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="dev_ia">Développement IA</SelectItem>
                  <SelectItem value="dev_web">Développement Web</SelectItem>
                  <SelectItem value="dev_web_femmes">Développement Web (100% Femmes)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
              <Checkbox
                id="autoriseMarketing"
                checked={formData.autoriseMarketing}
                onCheckedChange={(checked) => handleInputChange("autoriseMarketing", checked as boolean)}
              />
              <Label htmlFor="autoriseMarketing" className="text-sm">
                J'autorise l'envoi d'emails et SMS de communication par ce centre de formation ou ses partenaires
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer l'inscription"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

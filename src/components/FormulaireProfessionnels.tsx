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

export const FormulaireProfessionnels = () => {
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
    typeContrat: "",
    nomEntreprise: "",
    formationSouhaitee: "",
    formationSource: "",
    autoriseMarketing: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL du webhook prédéfinie pour les professionnels
    const webhookUrl = "https://support.simplonmaroc.com/webhook/af7f7289-6cb1-4227-9631-7eeda426b7f5";

    setIsLoading(true);
    console.log("Envoi des données:", formData);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          type: "inscription_professionnels",
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
        typeContrat: "",
        nomEntreprise: "",
        formationSouhaitee: "",
        formationSource: "",
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
        <CardHeader className="bg-simplonRed text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center font-title">Formulaire d'inscription</CardTitle>
        </CardHeader>
        <CardContent className="p-6 font-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prenom" className="text-simplonBlue font-medium">Prénom *</Label>
                <Input
                  id="prenom"
                  required
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                  className="border-simplonGrayBg focus:border-simplonBlue"
                />
              </div>
              <div>
                <Label htmlFor="nom" className="text-simplonBlue font-medium">Nom *</Label>
                <Input
                  id="nom"
                  required
                  value={formData.nom}
                  onChange={(e) => handleInputChange("nom", e.target.value)}
                  className="border-simplonGrayBg focus:border-simplonBlue"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-simplonBlue font-medium">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-simplonGrayBg focus:border-simplonBlue"
              />
            </div>

            <div>
              <Label htmlFor="telephone" className="text-simplonBlue font-medium">Numéro de téléphone *</Label>
              <Input
                id="telephone"
                type="tel"
                required
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                className="border-simplonGrayBg focus:border-simplonBlue"
              />
            </div>

            <div>
              <Label htmlFor="dateNaissance" className="text-simplonBlue font-medium">Date de naissance *</Label>
              <Input
                id="dateNaissance"
                type="date"
                required
                value={formData.dateNaissance}
                onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                className="border-simplonGrayBg focus:border-simplonBlue"
              />
            </div>

            <div>
              <Label htmlFor="genre" className="text-simplonBlue font-medium">Genre *</Label>
              <Select onValueChange={(value) => handleInputChange("genre", value)}>
                <SelectTrigger className="border-simplonGrayBg focus:border-simplonBlue">
                  <SelectValue placeholder="Sélectionnez votre genre" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-simplonGrayBg">
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ville" className="text-simplonBlue font-medium">Ville *</Label>
              <Input
                id="ville"
                required
                value={formData.ville}
                onChange={(e) => handleInputChange("ville", e.target.value)}
                className="border-simplonGrayBg focus:border-simplonBlue"
              />
            </div>

            <div>
              <Label htmlFor="situationActuelle" className="text-simplonBlue font-medium">Situation actuelle *</Label>
              <Select onValueChange={(value) => handleInputChange("situationActuelle", value)}>
                <SelectTrigger className="border-simplonGrayBg focus:border-simplonBlue">
                  <SelectValue placeholder="Sélectionnez votre situation" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-simplonGrayBg">
                  <SelectItem value="Working / Large Company">Working / Large Company</SelectItem>
                  <SelectItem value="Working / Startup">Working / Startup</SelectItem>
                  <SelectItem value="Working / Institution of public sector">Working / Institution of public sector</SelectItem>
                  <SelectItem value="Auto-entrepreneur / Freelancer">Auto-entrepreneur / Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.situationActuelle.split('/')[0].trim() === "Working" && (
              <div>
                <Label htmlFor="typeContrat" className="text-simplonBlue font-medium">Type de contrat *</Label>
                <Select onValueChange={(value) => handleInputChange("typeContrat", value)}>
                  <SelectTrigger className="border-simplonGrayBg focus:border-simplonBlue">
                    <SelectValue placeholder="Sélectionnez le type de contrat" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-simplonGrayBg">
                    <SelectItem value="cdi">CDI</SelectItem>
                    <SelectItem value="cdd">CDD</SelectItem>
                    <SelectItem value="anapec">Anapec</SelectItem>
                    <SelectItem value="stage_pre_embauche">Stage pré-embauche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.situationActuelle === "Auto-entrepreneur / Freelancer" && (
              <div>
                <Label htmlFor="nomEntreprise" className="text-simplonBlue font-medium">Nom de votre entreprise / profil sur les sites de freelance *</Label>
                <Input
                  id="nomEntreprise"
                  required
                  value={formData.nomEntreprise}
                  onChange={(e) => handleInputChange("nomEntreprise", e.target.value)}
                  className="border-simplonGrayBg focus:border-simplonBlue"
                  placeholder="Entrez le nom de votre entreprise ou votre profil freelance"
                />
              </div>
            )}

            <div>
              <Label htmlFor="formationSouhaitee" className="text-simplonBlue font-medium">Formation souhaitée *</Label>
              <Select onValueChange={(value) => handleInputChange("formationSouhaitee", value)}>
                <SelectTrigger className="border-simplonGrayBg focus:border-simplonBlue">
                  <SelectValue placeholder="Sélectionnez la formation" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-simplonGrayBg">
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="dev_mobile">Développement Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="formationSource">Où avez-vous entendu parler de cette formation ? *</Label>
              <Select onValueChange={(value) => handleInputChange("formationSource", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la source" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Linkedin">Linkedin</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Tiktok">Tiktok</SelectItem>
                  <SelectItem value="Influenceur">Influenceur</SelectItem>
                  <SelectItem value="Ami">Par un ami</SelectItem>
                  <SelectItem value="Recherche sur Google">Recherche sur Google</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-simplonBgRed rounded-lg">
              <Checkbox
                id="autoriseMarketing"
                checked={formData.autoriseMarketing}
                onCheckedChange={(checked) => handleInputChange("autoriseMarketing", checked as boolean)}
                className="border-simplonRed data-[state=checked]:bg-simplonRed"
              />
              <Label htmlFor="autoriseMarketing" className="text-sm text-simplonGrayBody">
              J’autorise Simplon Maghreb et ses partenaires à utiliser mes données personnelles dans le cadre de ce projet, conformément à la réglementation en vigueur, notamment pour recevoir des communications par e-mail, WhatsApp et téléphone
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-simplonRed hover:bg-red-700 py-3 text-lg font-body font-medium"
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

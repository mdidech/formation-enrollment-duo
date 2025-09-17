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
    telephone: "(+212)",
    dateNaissance: "",
    genre: "",
    ville: "",
    situationActuelle: "",
    niveauEtudes: "",
    formationSouhaitee: "",
    formationSource: "",
    autoriseMarketing: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    /* 1. Liste des champs qui ne doivent pas être vides.
       On ignore ici "telephone" si tu veux garder « (+212) » comme valeur par défaut
       et on traite le booléen autoriseMarketing à part. */
    const requiredFields: (keyof typeof formData)[] = [
      "prenom",
      "nom",
      "email",
      "telephone",
      "dateNaissance",
      "genre",
      "ville",
      "situationActuelle",
      "niveauEtudes",
      "formationSouhaitee",
      "formationSource",
    ];
  
    // 2. Détecter les champs vides ou composés uniquement d’espaces.
    const missing = requiredFields.filter(
      (field) =>
        !formData[field] ||
        (typeof formData[field] === "string" &&
          (formData[field] as string).trim() === "")
    );
  
    // 3. Ajouter le cas du consentement marketing (case à cocher).
    if (!formData.autoriseMarketing) missing.push("autoriseMarketing");
  
    if (missing.length) {
      toast({
        title: "Champs manquants",
        description:
          "Merci de compléter tous les champs obligatoires avant de continuer.",
        variant: "destructive",
      });
      return; // ⛔️ on ne poursuit pas si le formulaire est incomplet
    }
  
    // ------------------------------------------------------------------
    // Si tout est OK, on continue le flux actuel d’envoi des données.
    // ------------------------------------------------------------------
  
    const webhookUrl =
      "https://support.simplonmaroc.com/webhook/57f34999-1386-4403-b950-6e22f8b3a342";
  
    setIsLoading(true);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          type: "inscription_etudiants",
        }),
      });
  
      toast({
        title: "Inscription envoyée",
        description:
          "Votre demande d'inscription a été transmise avec succès et nous vous contacterons bientôt si vous n'êtes pas déjà inscrit",
      });
  
      // Réinitialiser le formulaire
      setFormData({
        prenom: "",
        nom: "",
        email: "",
        telephone: "(+212)",
        dateNaissance: "",
        genre: "",
        ville: "",
        situationActuelle: "",
        niveauEtudes: "",
        formationSouhaitee: "",
        formationSource: "",
        autoriseMarketing: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast({
        title: "Erreur",
        description:
          "Erreur lors de l'envoi de l'inscription. Veuillez réessayer.",
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
                  placeholder="Entrez votre prénom"
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  required
                  value={formData.nom}
                  placeholder="Entrez votre nom"
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
                placeholder="Entrez votre email"
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
                pattern="^+212\s\d{2}\s\d{2}\s\d{2}\s\d{2}$"
                placeholder="Entrez votre numéro de téléphone"
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
                placeholder="Entrez votre date de naissance"
                onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre *</Label>
              <Select onValueChange={(value) => handleInputChange("genre", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre genre" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
  <Label htmlFor="ville">Ville *</Label>
  <Select onValueChange={(value) => handleInputChange("ville", value)} required>
    <SelectTrigger>
      <SelectValue placeholder="Sélectionnez votre ville" />
    </SelectTrigger>

    <SelectContent className="bg-white max-h-64 overflow-y-auto">
      <SelectItem value="Casablanca">Casablanca</SelectItem>
      <SelectItem value="Fès">Fès</SelectItem>
      <SelectItem value="Marrakech">Marrakech</SelectItem>
      <SelectItem value="Tangier">Tangier</SelectItem>
      <SelectItem value="Sale">Sale</SelectItem>
      <SelectItem value="Rabat">Rabat</SelectItem>
      <SelectItem value="Meknès">Meknès</SelectItem>
      <SelectItem value="Oujda-Angad">Oujda-Angad</SelectItem>
      <SelectItem value="Kenitra">Kenitra</SelectItem>
      <SelectItem value="Agadir">Agadir</SelectItem>
      <SelectItem value="Tétouan">Tétouan</SelectItem>
      <SelectItem value="Taourirt">Taourirt</SelectItem>
      <SelectItem value="Temara">Temara</SelectItem>
      <SelectItem value="Safi">Safi</SelectItem>
      <SelectItem value="Khénifra">Khénifra</SelectItem>
      <SelectItem value="El Jadid">El Jadid</SelectItem>
      <SelectItem value="Laâyoune">Laâyoune</SelectItem>
      <SelectItem value="Mohammedia">Mohammedia</SelectItem>
      <SelectItem value="Kouribga">Kouribga</SelectItem>
      <SelectItem value="Béni Mellal">Béni Mellal</SelectItem>
      <SelectItem value="Ait Melloul">Ait Melloul</SelectItem>
      <SelectItem value="Nador">Nador</SelectItem>
      <SelectItem value="Taza">Taza</SelectItem>
      <SelectItem value="Settat">Settat</SelectItem>
      <SelectItem value="Barrechid">Barrechid</SelectItem>
      <SelectItem value="Al Khmissat">Al Khmissat</SelectItem>
      <SelectItem value="Inezgane">Inezgane</SelectItem>
      <SelectItem value="Ksar El Kebir">Ksar El Kebir</SelectItem>
      <SelectItem value="My Drarga">My Drarga</SelectItem>
      <SelectItem value="Larache">Larache</SelectItem>
      <SelectItem value="Guelmim">Guelmim</SelectItem>
      <SelectItem value="Berkane">Berkane</SelectItem>
      <SelectItem value="Ad Dakhla">Ad Dakhla</SelectItem>
      <SelectItem value="Bouskoura">Bouskoura</SelectItem>
      <SelectItem value="Al Fqih Ben Çalah">Al Fqih Ben Çalah</SelectItem>
      <SelectItem value="Oued Zem">Oued Zem</SelectItem>
      <SelectItem value="Sidi Slimane">Sidi Slimane</SelectItem>
      <SelectItem value="Errachidia">Errachidia</SelectItem>
      <SelectItem value="Guercif">Guercif</SelectItem>
      <SelectItem value="Oulad Teïma">Oulad Teïma</SelectItem>
      <SelectItem value="Ben Guerir">Ben Guerir</SelectItem>
      <SelectItem value="Sefrou">Sefrou</SelectItem>
      <SelectItem value="Fnidq">Fnidq</SelectItem>
      <SelectItem value="Sidi Qacem">Sidi Qacem</SelectItem>
      <SelectItem value="Tiznit">Tiznit</SelectItem>
      <SelectItem value="Moulay Abdallah">Moulay Abdallah</SelectItem>
      <SelectItem value="Youssoufia">Youssoufia</SelectItem>
      <SelectItem value="Martil">Martil</SelectItem>
      <SelectItem value="Aïn Harrouda">Aïn Harrouda</SelectItem>
      <SelectItem value="Souq Sebt Oulad Nemma">Souq Sebt Oulad Nemma</SelectItem>
      <SelectItem value="Skhirate">Skhirate</SelectItem>
      <SelectItem value="Ouezzane">Ouezzane</SelectItem>
      <SelectItem value="Sidi Yahya Zaer">Sidi Yahya Zaer</SelectItem>
      <SelectItem value="Al Hoceïma">Al Hoceïma</SelectItem>
      <SelectItem value="M’diq">M’diq</SelectItem>
      <SelectItem value="Midalt">Midalt</SelectItem>
      <SelectItem value="Azrou">Azrou</SelectItem>
      <SelectItem value="El Kelaa des Srarhna">El Kelaa des Srarhna</SelectItem>
      <SelectItem value="Ain El Aouda">Ain El Aouda</SelectItem>
      <SelectItem value="Beni Yakhlef">Beni Yakhlef</SelectItem>
      <SelectItem value="Ad Darwa">Ad Darwa</SelectItem>
      <SelectItem value="Al Aaroui">Al Aaroui</SelectItem>
      <SelectItem value="Qasbat Tadla">Qasbat Tadla</SelectItem>
      <SelectItem value="Boujad">Boujad</SelectItem>
      <SelectItem value="Jerada">Jerada</SelectItem>
      <SelectItem value="Mrirt">Mrirt</SelectItem>
      <SelectItem value="El Aïoun">El Aïoun</SelectItem>
      <SelectItem value="Azemmour">Azemmour</SelectItem>
      <SelectItem value="Temsia">Temsia</SelectItem>
      <SelectItem value="Zagora">Zagora</SelectItem>
      <SelectItem value="Ait Ourir">Ait Ourir</SelectItem>
      <SelectItem value="Aziylal">Aziylal</SelectItem>
      <SelectItem value="Sidi Yahia El Gharb">Sidi Yahia El Gharb</SelectItem>
      <SelectItem value="Biougra">Biougra</SelectItem>
      <SelectItem value="Zaïo">Zaïo</SelectItem>
      <SelectItem value="Aguelmous">Aguelmous</SelectItem>
      <SelectItem value="El Hajeb">El Hajeb</SelectItem>
      <SelectItem value="Zeghanghane">Zeghanghane</SelectItem>
      <SelectItem value="Imzouren">Imzouren</SelectItem>
      <SelectItem value="Tit Mellil">Tit Mellil</SelectItem>
      <SelectItem value="Mechraa Bel Ksiri">Mechraa Bel Ksiri</SelectItem>
      <SelectItem value="Al ’Attawia">Al ’Attawia</SelectItem>
      <SelectItem value="Demnat">Demnat</SelectItem>
      <SelectItem value="Arfoud">Arfoud</SelectItem>
      <SelectItem value="Tameslouht">Tameslouht</SelectItem>
      <SelectItem value="Bou Arfa">Bou Arfa</SelectItem>
      <SelectItem value="Sidi Smai’il">Sidi Smai’il</SelectItem>
      <SelectItem value="Souk et Tnine Jorf el Mellah">Souk et Tnine Jorf el Mellah</SelectItem>
      <SelectItem value="Mehdya">Mehdya</SelectItem>
      <SelectItem value="Aïn Taoujdat">Aïn Taoujdat</SelectItem>
      <SelectItem value="Chichaoua">Chichaoua</SelectItem>
      <SelectItem value="Tahla">Tahla</SelectItem>
      <SelectItem value="Oulad Yaïch">Oulad Yaïch</SelectItem>
      <SelectItem value="Moulay Bousselham">Moulay Bousselham</SelectItem>
      <SelectItem value="Iheddadene">Iheddadene</SelectItem>
      <SelectItem value="Missour">Missour</SelectItem>
      <SelectItem value="Zawyat ech Cheïkh">Zawyat ech Cheïkh</SelectItem>
      <SelectItem value="Bouknadel">Bouknadel</SelectItem>
      <SelectItem value="Oulad Tayeb">Oulad Tayeb</SelectItem>
      <SelectItem value="Oulad Barhil">Oulad Barhil</SelectItem>
      <SelectItem value="Bir Jdid">Bir Jdid</SelectItem>
      <SelectItem value="Tifariti">Tifariti</SelectItem>
    </SelectContent>
  </Select>
</div>



            <div>
              <Label htmlFor="situationActuelle">Situation actuelle *</Label>
              <Select onValueChange={(value) => handleInputChange("situationActuelle", value)} required>
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
              <Select onValueChange={(value) => handleInputChange("niveauEtudes", value)} required>
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
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="formationSouhaitee">Formation souhaitée *</Label>
              <Select onValueChange={(value) => handleInputChange("formationSouhaitee", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la formation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {/* <SelectItem value="Développement IA">Développement IA</SelectItem> */}
                  <SelectItem value="Développement Web">Développement Web</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="formationSource">Où avez-vous entendu parler de cette formation ? *</Label>
              <Select onValueChange={(value) => handleInputChange("formationSource", value)} required>
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

            <div className="flex items-start space-x-2 p-4 bg-simplonBgRed rounded-lg">
              <Checkbox
                id="autoriseMarketing"
                checked={formData.autoriseMarketing}
                required
                onCheckedChange={(checked) => handleInputChange("autoriseMarketing", checked as boolean)}
              />
              <Label htmlFor="autoriseMarketing" className="text-xs text-simplonGrayBody">
              J’autorise Simplon Maghreb et ses partenaires à utiliser mes données personnelles dans le cadre de ce projet, conformément à la réglementation en vigueur, notamment pour recevoir des communications par e-mail, WhatsApp et téléphone
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-simplonRed hover:bg-red-700 py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

import Header from './Header'
import Footer from './Footer'

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Conditions Générales de Vente (CGV) – BtoC
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              TerraStab SAS – www.terrastab.fr<br />
              Dernière mise à jour : [date]
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Champ d'application</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les présentes Conditions Générales de Vente (ci-après « CGV ») s'appliquent à toute vente conclue entre TerraStab SAS (ci-après « le Vendeur ») et un consommateur particulier (ci-après « le Client »).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Toute commande implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Produits et services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TerraStab propose des solutions de stabilisation des sols, comprenant des équipements matériels (sondes, dispositifs d'irrigation, boîtiers de contrôle) et des services associés.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les descriptions, notices et images disponibles sur le site ou dans les documents commerciaux ont une valeur indicative.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                <p className="text-gray-800 font-medium">⚠️ Important :</p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  La technologie TerraStab repose sur des principes scientifiques et empiriques validés par des tests. Cependant, l'efficacité des solutions dépend de nombreux facteurs (nature du sol, environnement, conditions climatiques, entretien, installation, etc.).
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  TerraStab n'est tenue qu'à une obligation de moyens et ne peut garantir un résultat d'efficacité absolue ni l'absence totale de désordres liés aux sols.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Commandes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La commande est ferme et définitive dès confirmation par le Client et paiement du prix.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Le Vendeur se réserve le droit de refuser une commande en cas de problème de paiement ou d'indisponibilité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prix et paiement</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les prix sont exprimés en euros TTC, hors frais de livraison éventuels.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Le paiement est exigible immédiatement à la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Livraison</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les délais de livraison indiqués sont donnés à titre indicatif. Un retard ne peut entraîner ni pénalités, ni annulation, sauf cas prévu par la loi.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Le transfert des risques intervient dès la réception par le Client. Le Client doit vérifier la conformité et l'état des produits lors de la livraison.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Droit de rétractation (conformément au Code de la consommation)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le Client dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motifs.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour exercer ce droit, le Client doit notifier sa décision par écrit (e-mail ou courrier).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le produit doit être retourné dans son état d'origine, aux frais du Client.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le remboursement interviendra dans les 14 jours suivant la réception du produit retourné.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                <p className="text-gray-700 leading-relaxed">
                  ⚠️ Le droit de rétractation ne s'applique pas aux produits personnalisés ou ayant fait l'objet d'une installation sur mesure.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Garanties légales</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Conformément à la loi, les produits bénéficient :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li className="mb-2">de la garantie légale de conformité (articles L217-4 à L217-14 du Code de la consommation),</li>
                <li>de la garantie contre les vices cachés (articles 1641 à 1649 du Code civil).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le Client dispose d'un délai de deux ans à compter de la délivrance du produit pour agir au titre de la garantie légale de conformité.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                En cas de défaut de conformité ou de vice caché, le Client peut obtenir la réparation ou le remplacement du produit, ou à défaut le remboursement.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2">Sont exclus de la garantie :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li className="mb-2">les défauts liés à une installation non conforme,</li>
                <li className="mb-2">une utilisation non prévue,</li>
                <li className="mb-2">l'usure normale,</li>
                <li className="mb-2">un manque d'entretien,</li>
                <li>toute modification non autorisée.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation de responsabilité</h2>
              <p className="text-gray-700 leading-relaxed mb-4">TerraStab ne peut être tenue responsable des dommages résultant :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li className="mb-2">d'une installation ou utilisation non conforme aux instructions,</li>
                <li className="mb-2">d'un environnement inadapté ou de conditions climatiques exceptionnelles,</li>
                <li>d'un défaut d'entretien ou d'une modification non autorisée.</li>
              </ul>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                <p className="text-gray-700 leading-relaxed">
                  ⚠️ Le Client reconnaît expressément que les solutions TerraStab constituent une aide technique et préventive, mais ne garantissent pas un résultat d'efficacité totale, ni la suppression intégrale des risques liés aux sols argileux ou instables.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                La responsabilité de TerraStab est limitée au montant de la commande et exclut toute indemnisation pour pertes indirectes (perte de valeur immobilière, frais annexes, préjudices immatériels).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Réserve de propriété</h2>
              <p className="text-gray-700 leading-relaxed">
                Le Vendeur conserve la propriété des produits jusqu'au paiement complet du prix.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Données personnelles</h2>
              <p className="text-gray-700 leading-relaxed">
                Les données personnelles sont traitées conformément au RGPD et à la politique de confidentialité disponible sur le site. Le Client dispose d'un droit d'accès, de rectification et de suppression.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                Les marques, brevets, modèles, logiciels et contenus relatifs aux produits TerraStab demeurent la propriété exclusive de TerraStab.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Force majeure</h2>
              <p className="text-gray-700 leading-relaxed">
                Aucune partie ne pourra être tenue responsable d'un manquement dû à un cas de force majeure tel que défini par la loi et la jurisprudence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Droit applicable – litiges</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Les présentes CGV sont régies par le droit français.
              </p>
              <p className="text-gray-700 leading-relaxed">
                En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le Client pourra saisir le tribunal compétent conformément au Code de la consommation.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

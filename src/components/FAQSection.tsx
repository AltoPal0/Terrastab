import { motion } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, Shield, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FAQSection = () => {
  const faqs = [
    {
      question: "Est-ce que ça fonctionne sur tous les types de maison ?",
      answer: "TerraStab s'adapte à la plupart des constructions individuelles sur sols argileux. Notre équipe évalue la faisabilité lors du diagnostic initial et propose des solutions personnalisées selon votre configuration."
    },
    {
      question: "En combien de temps voit-on les effets ?",
      answer: "Les premiers effets stabilisateurs apparaissent généralement sous 3 à 6 mois. Pour les cas correctifs, la stabilisation complète peut prendre 12 à 18 mois selon l'ampleur des désordres initiaux."
    },
    // {
    //   question: "Quelle est la garantie ?",
    //   answer: "TerraStab propose une garantie décennale sur l'installation et un engagement contractuel de performance. En cas de non-fonctionnement avéré, nous intervenons gratuitement ou procédons au remboursement."
    // },
    {
      question: "Y a-t-il un entretien ou un abonnement ?",
      answer: "Le système fonctionne de manière autonome avec un abonnement de maintenance préventive inclus la première année. Les années suivantes, un contrat de suivi optionnel assure le bon fonctionnement."
    },
    {
      question: "Peut-on arrêter le système ?",
      answer: "Oui, vous gardez un contrôle total sur votre installation. Le système peut être mis en pause ou arrêté à tout moment via l'application mobile ou sur simple demande."
    },
    {
      question: "Et si j'ai déjà des fissures ?",
      answer: "TerraStab intervient aussi en mode correctif. Nous stabilisons d'abord le sol pour éviter l'aggravation, puis proposons si nécessaire des solutions de réparation en partenariat avec des entreprises spécialisées."
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Toutes les réponses aux questions essentielles pour bien comprendre TerraStab
            et faire le bon choix pour votre maison.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * index, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Accordion.Item value={`item-${index}`}>
                  <Accordion.Trigger className="group w-full text-left p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {faq.question}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-all duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

        {/* Quality Engagement Block */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-600 rounded-full">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Une intervention, une garantie.
                </h3>

                <p className="text-blue-800 leading-relaxed mb-6 max-w-2xl mx-auto">
                  TerraStab s'engage contractuellement à assurer le bon fonctionnement du système.
                  Une fois installé, vous bénéficiez d'un suivi à distance, de diagnostics réguliers,
                  et d'une assistance technique dédiée.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Suivi à distance</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Diagnostics réguliers</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Assistance dédiée</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
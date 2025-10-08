# 🔒 TerraStab – Security Model (Supervised, No RLS)


## 🧱 Principe Général

- **Toutes les tables Supabase** ont les RLS **désactivées**.  
- **Aucune opération critique** n’est effectuée directement depuis le frontend.  
- **Toutes les écritures et lectures sensibles** passent par des **Edge Functions** sécurisées avec la **clé `service_role`**.

L’application reste ainsi fluide et débogable, sans blocages liés à RLS, tout en gardant un contrôle strict via les fonctions serveur.

---

## ⚙️ Désactivation des RLS

Désactiver la sécurité RLS sur toutes les tables métier :

```sql
alter table users disable row level security;
alter table results disable row level security;
alter table quotes disable row level security;
alter table price_book disable row level security;
alter table algo_table disable row level security;
```

Les Edge Functions jouent ensuite le rôle de garde-fou applicatif.

---

## 🧩 Architecture Sécurisée

### 1. **Frontend (Public Key)**
- Utilise la clé publique `anon` fournie par Supabase.  
- Peut lire certaines données non sensibles (`price_book`, `algo_table`).  
- Ne peut pas écrire directement dans les tables sensibles.

### 2. **Edge Functions (Service Role Key)**
- Hébergées sur Supabase (`supabase/functions/*`).  
- Appelées depuis le frontend via `fetch()` ou le SDK.  
- Authentifiées par un secret (`Authorization: Bearer <EDGE_FUNCTION_KEY>`).  
- Utilisent la clé `service_role` pour lire/écrire librement dans la base.

---

## 🔧 Exemple de Fonctions Supervisées

| Fonction | Rôle | Type d’accès | Description |
|-----------|------|--------------|--------------|
| `calculate-quote` | Calculer le devis à partir des réponses | Lecture seule sur `algo_table` / écriture sur `results` | Appel anonyme autorisé |
| `save-quote` | Enregistrer un devis avec un utilisateur ou un e-mail | Lecture/écriture `users`, `quotes`, `results` | Exécutée avec `service_role` |
| `get-quote` | Récupérer un devis spécifique via un token | Lecture `quotes`, `results` | Token signé JWT, expiration 30 jours |
| `send-quote` | Envoyer le devis par e-mail | Appelle SendGrid / Resend / Postmark | Aucun accès direct à la base |

---

## 🔐 Bonnes Pratiques de Sécurité

1. **Ne jamais exposer la clé `service_role`** au frontend.  
   - Elle doit être stockée uniquement dans les Edge Functions.  

2. **Limiter les domaines CORS** dans la configuration Supabase.  
   - Exemple : `https://terrastab.com`, `https://app.terrastab.com`.  

3. **Valider toutes les entrées** côté Edge Functions.  
   - Vérifier les formats d’e-mail, de téléphone, et d’identifiants UUID.  

4. **Logger les appels sensibles** dans Supabase Logs (ou Logflare).  

5. **Réactiver les RLS plus tard** sur les tables sensibles (`users`, `quotes`) quand :  
   - un espace personnel “mes devis” existera,  
   - et que la session utilisateur Supabase Auth sera en production.  

---

## 🧱 Schéma Simplifié

```plaintext
Frontend (anon key)
     │
     ▼
  Edge Function (service_role key)
     │
     ▼
 Supabase Tables
  ├── users
  ├── results
  ├── quotes
  ├── algo_table
  └── price_book
```

---

## ✅ Avantages du Modèle Supervisé

| Aspect | Avantage |
|--------|-----------|
| 🧩 Simplicité | Aucune policy RLS à gérer ni bug “spinning” |
| 🔒 Sécurité | Contrôle centralisé dans les Edge Functions |
| 🚀 Performance | Pas de latence RLS ni de conditions SQL complexes |
| 🧠 Clarté | Debug plus simple, logs explicites |
| 🌱 Évolutif | RLS activables progressivement plus tard |

---

## 🔚 En résumé

- **RLS désactivées** sur toutes les tables.  
- **Edge Functions** = seul point d’entrée sécurisé pour les opérations sensibles.  
- **Clé publique Supabase** utilisée uniquement pour lecture publique.  
- **Sécurité supervisée**, simple, claire et adaptée au stade MVP TerraStab.


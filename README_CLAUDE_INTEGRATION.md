Intégration Claude (Anthropic) — guide rapide

1) Définir la clé API (Windows)
- PowerShell (session actuelle):
  $Env:ANTHROPIC_API_KEY = "VOTRE_CLE_ICI"
- PowerShell (persistant):
  setx ANTHROPIC_API_KEY "VOTRE_CLE_ICI"
- CMD (persistant):
  setx ANTHROPIC_API_KEY "VOTRE_CLE_ICI"

2) Exemples de configuration VS Code (workspace .vscode/settings.json)
- Si l'extension supporte la substitution d'env: ajoutez
  "anthropic.apiKey": "${env:ANTHROPIC_API_KEY}"

3) Tester localement (Node.js)
- Installez Node 18+ (ou `npm install node-fetch` si Node plus ancien)
- Lancez:
  node claude_test.js

4) Remarques
- Ne commitez jamais votre clé dans le dépôt.
- Adaptez le champ `model` selon les modèles disponibles sur votre compte Anthropic.
- Si votre extension VS Code a une autre clé de config, remplacez la clé `anthropic.apiKey` par le nom attendu.

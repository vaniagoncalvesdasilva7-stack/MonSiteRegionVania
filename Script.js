/* script.js - fonctionnalités : recherche, budget, transports */

// ------------------- Données -------------------
const experiences = [
  { titre: "Randonnée au lac Bleu", lien: "activites.html" },
  { titre: "Parc d’aventure", lien: "activites.html" },
  { titre: "Concert Parc central", lien: "sorties.html" }
];

const sorties = [
  { titre: "Marché artisanal", lien: "sorties.html" },
  { titre: "Parc d’aventure", lien: "sorties.html" },
  { titre: "Concert Parc central", lien: "sorties.html" }
];

// ------------------- Recherche dynamique -------------------
function rechercheExperiences(inputId, resultDivId, data) {
  const input = document.getElementById(inputId);
  const resultDiv = document.getElementById(resultDivId);
  if (!input || !resultDiv) return;

  input.addEventListener("input", function () {
    const mot = this.value.trim().toLowerCase();
    if (!mot) {
      resultDiv.innerHTML = "";
      return;
    }
    const resultats = data.filter(item => item.titre.toLowerCase().includes(mot));
    resultDiv.innerHTML = resultats.length
      ? resultats.map(r => `<p><a href="${r.lien}">${r.titre}</a></p>`).join("")
      : `<p class="muted">Aucun résultat.</p>`;
  });
}

// ------------------- Calculateur de budget -------------------
function calculerBudget() {
  const checkboxes = document.querySelectorAll('input[name="activite"]:checked');
  let total = 0;
  checkboxes.forEach(cb => {
    const val = Number(cb.value) || 0;
    total += val;
  });
  const totalDiv = document.getElementById("totalBudget");
  if (totalDiv) totalDiv.innerText = "Budget estimé : " + total + " €";
}

// ------------------- Transports par ville -------------------
const transports = {
  villeA: [
    { type: "Bus", info: "Ligne 1 — toutes les 20 min", lien: "https://site-bus-villeA.com" },
    { type: "Train", info: "Gare centrale — toutes les 30 min", lien: "https://sncf.com/villeA" }
  ],
  villeB: [
    { type: "Bus", info: "Ligne 3 — toutes les 15 min", lien: "https://site-bus-villeB.com" },
    { type: "Vélo", info: "Stations publiques partout en centre", lien: "https://velovilleB.com" }
  ]
};

function selectionVille() {
  const select = document.getElementById("villeSelect");
  const div = document.getElementById("infoTransport");
  if (!select || !div) return;

  // afficher au changement
  select.addEventListener("change", function () {
    const ville = this.value;
    if (!ville) {
      div.innerHTML = "";
      return;
    }
    const list = transports[ville];
    if (!list) {
      div.innerHTML = `<p class="muted">Informations temporairement indisponibles pour cette ville.</p>`;
      return;
    }
    div.innerHTML = list.map(t =>
      `<p><strong>${t.type} :</strong> ${t.info} — <a href="${t.lien}" target="_blank" rel="noopener noreferrer">Voir horaires</a></p>`
    ).join("");
  });
}

// ------------------- Initialisation -------------------
window.addEventListener("DOMContentLoaded", function () {
  // recherche sur page expériences (si présent)
  rechercheExperiences('rechercheExp', 'resultatsExp', experiences);

  // recherche sur page sorties (si tu as un champ dédié)
  rechercheExperiences('rechercheSorties', 'resultatsSorties', sorties);

  // transport
  selectionVille();

  // budget : laisse l'appel depuis le bouton, mais tu peux ajouter un listener si tu veux
  // ex: document.querySelector('button[data-role="calc"]').addEventListener('click', calculerBudget);
});

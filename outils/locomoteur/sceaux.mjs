/* MSK Morand : sceaux temporaires (5 emblèmes) dans le cadre des sceaux de Morand (double anneau, nom en haut,
   devise en bas, 20 et 26 sur les côtés). Produit du SVG à insérer dans une page : le texte prend les polices du site.
     node outils/locomoteur/sceaux.mjs [emblème] [nom] [devise]     → SVG sur la sortie standard
   Emblèmes : vitruve, genou, colonne, heron, marteau. */
export const EMBLEMES = {
  vitruve: `<circle cx="100" cy="102" r="47"/><rect x="62" y="66" width="76" height="76"/>
    <circle cx="100" cy="72" r="6.5"/><path d="M100 78.5 V117 M62 88 H138 M100 88 L66 70 M100 88 L134 70 M100 117 L86 141 M100 117 L114 141 M100 117 L74 136 M100 117 L126 136"/>`,
  genou: `<path d="M88 46 V82 C88 90 80 92 78 99 C76 107 84 111 92 109 C96 108 98 105 100 105 C102 105 104 108 108 109 C116 111 124 107 122 99 C120 92 112 90 112 82 V46"/>
    <path d="M80 115 C80 112 86 112 92 113 L100 114 L108 113 C114 112 120 112 120 115 C120 120 113 123 111 128 V154 M89 154 V128 C87 123 80 120 80 115 Z"/>
    <path d="M118 125 C121 125 122 127 122 129 V152"/><path d="M84 111.5 Q91 109.5 97 111.5 M103 111.5 Q109 109.5 116 111.5"/>
    <ellipse class="s-fond" cx="100" cy="93" rx="8" ry="10"/>`,
  colonne: Array.from({ length: 9 }, (_, i) => {
    const y = 47 + i * 12.6, x = 100 + 7 * Math.sin((i / 8) * Math.PI * 2 - 0.4), w = 15 + i * 1.3;
    return `<rect x="${(x - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="9" rx="2.5"/><path d="M${(x + w / 2).toFixed(1)} ${(y + 4.5).toFixed(1)} l${(7 + i * .4).toFixed(1)} 3"/>`;
  }).join(""),
  heron: `<path d="M78 99 C84 85 110 83 122 93 C128 98 126 106 116 108 C104 110 88 108 78 99 Z M78 99 L66 106"/>
    <path d="M118 93 C125 81 112 73 108 65 C104 57 110 49 118 51"/><circle cx="118" cy="51" r="3.6"/><path d="M121.5 50 L140 55 L121.5 53"/>
    <path d="M104 108 V152 M95 152 H113 M111 108 L119 122 L107 128"/>`,
  marteau: `<path d="M68 64 L120 54 L113 84 Z" stroke-linejoin="round"/><path d="M110 70 L139 148"/><circle cx="140.5" cy="152" r="3.6"/>
    <path d="M76 66 L114 59"/>`,
};
export function sceau(embleme, nom = "MSK", devise = "Anamnèse · Examen · Conduite", id = "s") {
  return `<svg class="sceau" viewBox="0 0 200 200" role="img" aria-label="Sceau de ${nom} Morand">
  <defs><path id="${id}-haut" d="M28 100 A72 72 0 0 1 172 100"/><path id="${id}-bas" d="M22 100 A78 78 0 0 0 178 100"/></defs>
  <circle class="s-trait" cx="100" cy="100" r="96" stroke-width="1.8"/><circle class="s-trait" cx="100" cy="100" r="91" stroke-width=".7"/>
  <circle class="s-trait" cx="100" cy="100" r="62" stroke-width=".7"/>
  <text class="s-titre"><textPath href="#${id}-haut" startOffset="50%" text-anchor="middle">${nom.toUpperCase()} ✦ MORAND</textPath></text>
  <text class="s-devise"><textPath href="#${id}-bas" startOffset="50%" text-anchor="middle">${devise.toUpperCase()}</textPath></text>
  <text class="s-an" x="31" y="103" text-anchor="middle">20</text><text class="s-an" x="169" y="103" text-anchor="middle">26</text>
  <g class="s-trait" stroke-width="1.6">${EMBLEMES[embleme]}</g>
</svg>`;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const [embleme = "vitruve", nom, devise] = process.argv.slice(2);
  process.stdout.write(sceau(embleme, nom, devise));
}

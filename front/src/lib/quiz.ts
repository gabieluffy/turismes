export type Category =
  | "PRAIA"
  | "MONTANHA"
  | "HISTORIA"
  | "GASTRONOMIA"
  | "CULTURA"
  | "FAMILIA"
  | "AVENTURA"
  | "VIDA_NOTURNA";

export type Answer = {
  label: string;
  category: Category;
  points: number;
};

export type Question = {
  id: number;
  prompt: string;
  answers: Answer[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "Qual cenário você prefere?",
    answers: [
      { label: "Praia ensolarada", category: "PRAIA", points: 3 },
      { label: "Montanhas frias", category: "MONTANHA", points: 3 },
      { label: "Centro histórico", category: "HISTORIA", points: 3 },
      { label: "Restaurantes famosos", category: "GASTRONOMIA", points: 3 },
    ],
  },
  {
    id: 2,
    prompt: "O que mais te anima em uma viagem?",
    answers: [
      { label: "Experimentar comidas", category: "GASTRONOMIA", points: 4 },
      { label: "Conhecer cultura local", category: "CULTURA", points: 4 },
      { label: "Natureza", category: "MONTANHA", points: 4 },
      { label: "Relaxar na praia", category: "PRAIA", points: 4 },
    ],
  },
  {
    id: 3,
    prompt: "Você prefere:",
    answers: [
      { label: "Passeios tranquilos", category: "FAMILIA", points: 1 },
      { label: "Trilhas", category: "AVENTURA", points: 1 },
      { label: "Museus", category: "HISTORIA", points: 1 },
      { label: "Bares e festas", category: "VIDA_NOTURNA", points: 1 },
    ],
  },
];

export const CATEGORY_META: Record<
  Category,
  { name: string; icon: string; color: string; description: string }
> = {
  PRAIA: {
    name: "Praia",
    icon: "beach_access",
    color: "primary",
    description:
      "Você ama o mar capixaba! Areia, sol e o som das ondas são seu refúgio perfeito.",
  },
  MONTANHA: {
    name: "Montanha",
    icon: "terrain",
    color: "secondary",
    description:
      "Você é um Explorador Capixaba Nato! Seu coração bate mais forte pelo ar puro das montanhas.",
  },
  HISTORIA: {
    name: "História",
    icon: "account_balance",
    color: "tertiary",
    description:
      "Você ama mergulhar no passado. Centros históricos e museus são sua paixão.",
  },
  GASTRONOMIA: {
    name: "Gastronomia",
    icon: "restaurant",
    color: "tertiary",
    description:
      "Você viaja pelo paladar! Moqueca em panela de barro? Pode mandar ver.",
  },
  CULTURA: {
    name: "Cultura",
    icon: "theater_comedy",
    color: "primary",
    description:
      "Você se encanta com tradições, festas locais e a alma capixaba.",
  },
  FAMILIA: {
    name: "Família",
    icon: "family_restroom",
    color: "secondary",
    description:
      "Você prefere passeios tranquilos e momentos inesquecíveis com quem ama.",
  },
  AVENTURA: {
    name: "Aventura",
    icon: "hiking",
    color: "secondary",
    description:
      "Trilhas, cachoeiras, escaladas — você está sempre em busca da próxima emoção.",
  },
  VIDA_NOTURNA: {
    name: "Vida Noturna",
    icon: "nightlife",
    color: "tertiary",
    description:
      "Bares, festas e o agito das noites capixabas são o seu lugar.",
  },
};

export function computeWinner(
  scores: Partial<Record<Category, number>>,
): Category {
  let best: Category = "PRAIA";
  let bestScore = -Infinity;
  (Object.keys(CATEGORY_META) as Category[]).forEach((c) => {
    const s = scores[c] ?? 0;
    if (s > bestScore) {
      best = c;
      bestScore = s;
    }
  });
  return best;
}

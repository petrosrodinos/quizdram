export interface NewQuiz {
  prompt: string;
  source: "ai" | "doc" | "video" | "text";
  difficulty?: "easy" | "medium" | "hard";
  type?: "multiple" | "boolean";
}

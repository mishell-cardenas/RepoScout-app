export const LANG_COLORS = {
  javascript: "#f1e05a",
  python: "#3572A5",
  typescript: "#3178c6",
  java: "#b07219",
  go: "#00ADD8",
  rust: "#dea584",
  c: "#555555",
  "c++": "#f34b7d",
  ruby: "#701516",
  php: "#4F5D95",
  html: "#e34c26",
  css: "#563d7c",
  shell: "#89e051",
  swift: "#F05138",
  kotlin: "#A97BFF",
};

export function langColor(language) {
  return LANG_COLORS[(language || "").toLowerCase()] || "#8b949e";
}

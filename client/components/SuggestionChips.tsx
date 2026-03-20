"use client";

type Props = {
  onSelect: (text: string) => void;
};

const suggestions = [
  "Rewrite this ad",
  "Make it more catchy",
  "Add urgency",
  "Improve headline",
];

export default function SuggestionChips({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((item, i) => (
        <button
          key={i}
          onClick={() => onSelect(item)}
          className="text-sm px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
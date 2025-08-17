import { Award } from "lucide-react";

export default function Badge({ level }: { level: "Bronze" | "Silver" | "Gold" | "Platinum" }) {
  const colors: Record<string, string> = {
    Bronze: "from-amber-700 to-amber-500",
    Silver: "from-gray-400 to-gray-200",
    Gold: "from-yellow-500 to-amber-300",
    Platinum: "from-slate-300 to-slate-100"
  };
  return (
    <div className="card p-6 flex items-center gap-4">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${colors[level]}`}>
        <Award className="w-8 h-8 text-black/80" />
      </div>
      <div>
        <p className="text-lg font-semibold">Badge Earned</p>
        <p className="text-2xl">{level}</p>
      </div>
    </div>
  );
}

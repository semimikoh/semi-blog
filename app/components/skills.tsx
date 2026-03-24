interface 스킬그룹 {
  카테고리: string;
  목록: string[];
}

interface SkillsProps {
  스킬: 스킬그룹[];
}

export default function Skills({ 스킬 }: SkillsProps) {
  return (
    <div className="flex flex-col gap-3">
      {스킬.map((group) => (
        <div key={group.카테고리} className="flex items-baseline gap-3">
          <span className="w-[90px] shrink-0 text-sm font-semibold">
            {group.카테고리}
          </span>
          <span className="text-sm text-foreground/70">
            {group.목록.join(', ')}
          </span>
        </div>
      ))}
    </div>
  );
}

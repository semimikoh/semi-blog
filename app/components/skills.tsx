interface 스킬그룹 {
  카테고리: string;
  목록: string[];
}

interface SkillsProps {
  스킬: 스킬그룹[];
}

export function Skills({ 스킬 }: SkillsProps) {
  return (
    <div className="flex flex-col gap-2">
      {스킬.map((group) => (
        <div key={group.카테고리} className="flex items-baseline gap-3 text-sm">
          <span className="w-[140px] shrink-0 text-xs font-semibold tracking-wide text-muted uppercase">
            {group.카테고리}
          </span>
          <span className="text-foreground/75">{group.목록.join(', ')}</span>
        </div>
      ))}
    </div>
  );
}

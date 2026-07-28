interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => {
  if (tags.length === 0) return null;

  return (
    <div class="flex flex-wrap gap-2 mb-4 text-xs">
      {tags.map((tag) => (
        <span key={tag} class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
        </span>
      ))}
    </div>
  );
};
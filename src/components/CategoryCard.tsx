import type { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  articleCount: number;
  onClick: () => void;
}

export default function CategoryCard({ icon: Icon, title, description, articleCount, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 text-left w-full group"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
          <Icon className="text-primary-600" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <span className="text-primary-600 text-sm font-medium">
            {articleCount} {articleCount === 1 ? 'artigo' : 'artigos'}
          </span>
        </div>
      </div>
    </button>
  );
}

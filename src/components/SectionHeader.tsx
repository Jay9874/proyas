interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  eyebrowClassName?: string;
}

/** Centred eyebrow pill, title and intro paragraph that open each content section. */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
  eyebrowClassName = 'text-teal-700 bg-teal-50 border-teal-100',
}: SectionHeaderProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${eyebrowClassName}`}>
        {eyebrow}
      </span>
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed sm:leading-6">{description}</p>
    </div>
  );
}

/**
 * ContactChannelCard Component
 * Reusable card component for contact channels
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.icon - Material icon name
 * @param {string} props.accentColor - Accent color variant ('orange' | 'green' | 'purple')
 * @param {React.ReactNode} props.children - Card content
 */
import React from 'react';

const accentStyles = {
  orange: {
    iconBg: 'bg-gradient-to-br from-accent-orange to-accent-orange-light',
    border: 'border-accent-orange/20',
    hoverBorder: 'hover:border-accent-orange/40',
    highlight: 'bg-accent-orange/5',
  },
  green: {
    iconBg: 'bg-gradient-to-br from-accent-green to-emerald-400',
    border: 'border-accent-green/20',
    hoverBorder: 'hover:border-accent-green/40',
    highlight: 'bg-accent-green/5',
  },
  purple: {
    iconBg: 'bg-gradient-to-br from-accent-purple to-fuchsia-400',
    border: 'border-accent-purple/20',
    hoverBorder: 'hover:border-accent-purple/40',
    highlight: 'bg-accent-purple/5',
  },
};

function ContactChannelCard({ title, icon, accentColor = 'orange', children }) {
  const accent = accentStyles[accentColor] || accentStyles.orange;
  
  return (
    <div className={`
      relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 
      shadow-card hover:shadow-card-xl 
      transition-all duration-300 ease-out
      border-2 ${accent.border} ${accent.hoverBorder}
      hover:-translate-y-1
      group
    `}>
      {/* Decorative Corner Accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${accent.highlight} rounded-bl-[100px] rounded-tr-2xl md:rounded-tr-3xl`}></div>
      
      {/* Icon Badge */}
      <div className={`
        relative inline-flex items-center justify-center 
        w-14 h-14 md:w-16 md:h-16 
        ${accent.iconBg} 
        rounded-xl md:rounded-2xl 
        shadow-lg 
        mb-5 md:mb-6
        group-hover:scale-110 transition-transform duration-300
      `}>
        <i className="material-icons text-white text-2xl md:text-3xl">{icon}</i>
      </div>
      
      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-5 md:mb-6 relative">
        {title}
      </h3>
      
      {/* Content */}
      <div className="space-y-4 md:space-y-5 text-brand-text-secondary relative">
        {children}
      </div>
    </div>
  );
}

export default ContactChannelCard;

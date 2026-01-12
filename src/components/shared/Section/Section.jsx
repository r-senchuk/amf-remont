const paddingClasses = {
  none: 'py-0',
  compact: 'py-14 sm:py-16',
  normal: 'py-16 sm:py-20',
  loose: 'py-20 sm:py-24'
};

const widthClasses = {
  narrow: 'max-w-5xl',
  base: 'max-w-6xl',
  wide: 'max-w-7xl'
};

function Section({
  as: Component = 'section',
  padding = 'normal',
  width = 'base',
  className = '',
  innerClassName = '',
  before = null,
  after = null,
  children,
  ...rest
}) {
  const paddingClass = paddingClasses[padding] || paddingClasses.normal;
  const widthClass = widthClasses[width] || widthClasses.base;

  return (
    <Component className={`${paddingClass} ${className}`.trim()} {...rest}>
      {before}
      <div className={`mx-auto ${widthClass} px-4 sm:px-6 lg:px-8 ${innerClassName}`.trim()}>
        {children}
      </div>
      {after}
    </Component>
  );
}

export default Section;

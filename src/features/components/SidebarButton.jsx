export const SideBarButton = ({
  icon,
  label,
  onClick,
  isActive = false,
  isDisabled = false,
  sideBarCollapsed = false,
  className = "",
  addTopMargin = false,
}) => {
  const baseClasses = `btn btn-wide ${addTopMargin ? "mt-2" : ""} ${
    isActive ? "btn-primary" : "bg-transparent"
  } flex items-center ${sideBarCollapsed ? "justify-center" : "justify-start"} ${className}`;

  const Icon = icon;

  const tooltip = sideBarCollapsed ? label : undefined;

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={isDisabled}
      title={tooltip}
    >
      {sideBarCollapsed ? (
        <Icon className="shrink-0" />
      ) : (
        <>
          <Icon className="shrink-0" />
          <p className="text-nowrap">{label}</p>
        </>
      )}
    </button>
  );
};

import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Tooltip from 'antd/lib/tooltip';

const selectType = (iconName, className = '', type = null, tooltip = true, tooltipPlacement = "bottom") =>{

  const validateSet = () =>{
    switch(iconName){
      case "classic": return "hs-logo";
      case "curse-of-naxxramas": return "naxxramas";
      case "one-night-in-karazhan": return "karazhan";
      default: return iconName;
    }
  };
  const validateMode = iconName === "standard" ? "mammoth" : iconName;

  const iconWrapper = (icon) => {
    return (
        <Tooltip title={startCase(iconName)}
                 placement={tooltipPlacement}
                 arrowPointAtCenter={true}>
          {icon}
        </Tooltip>
    )
  };

  let icon = (name) => {
    let icon = <span className={`hs-icon icon-${name} ${className}`}></span>;
    return tooltip ? iconWrapper(icon) : icon;
  };

  let manaIcon = (name) => {
    let icon = <span className={`hs-icon icon-mana-${name} ${className}`}></span>;
    return tooltip ? iconWrapper(icon) : icon;
  };

  switch(type){
    case 'set': return icon(validateSet(iconName));
    case 'mode': return icon(validateMode);
    case 'mana': return manaIcon(iconName);
    default: return icon(iconName);
  }
};

const Icon = ({name, className, type, tooltip, tooltipPlacement}) => selectType(name, className, type, tooltip, tooltipPlacement);

export default Icon;

Icon.propTypes = {
  name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  tooltipPlacement: PropTypes.string
};
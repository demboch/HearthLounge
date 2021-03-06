import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Icon from "../icon";

const ManaCurveBar = ({cost, deck, icon, max, barHeight = "100%", barWidth = "1.5vh", barSpacing = ".2vh", showCount = true, showIcons = true, barColor, manaCurveObj}) => {

  const costBelowSeven = (number) =>{
    return _.filter(deck, {cost: number}).length
  };
  let costSevenOrMore = _.filter(deck, (value)=>value.cost >= 7).length;
  let s = cost < 7 ? costBelowSeven(cost) : costSevenOrMore;

  const count = () => {
    if(showCount){
      return <div className="count">{manaCurveObj ? manaCurveObj : s}</div>;
    }
  };

  const showIcon = () =>{
    if(showIcons){
      return  <Icon name={icon} type="mana" />;
    }
  };

  return (
      <li style={{marginRight: barSpacing}}>
        {count()}
        <div className="bar" style={{"width": barWidth, height: barHeight}}>
          <span className={`${barColor} gradient-linear-top`} style={{height: `${((manaCurveObj ? manaCurveObj : s)/max)*100 || 0}%`}}></span>
        </div>
        {showIcon()}
      </li>
  );
};

ManaCurveBar.propTypes = {
  cost: PropTypes.number,
  deck: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  barHeight: PropTypes.string,
  barWidth: PropTypes.string,
  barSpacing: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  max: PropTypes.number
};

export default ManaCurveBar;

import React from 'react';
import ClassSelectionRow from './row';
import {hs_class} from '../../../../../../data/filters';
export const ClassSelectionView = (props) => {
  return (
      <table onClick={props.handleClassSelectionClick} className={`pick-class ${props.displayInlineFlex}`}>
        <tbody>
        <tr>
          <th colSpan="3">Wybierz klasę</th>
        </tr>
        <tr>
          {hs_class.slice(0, 3).map((element, index) =>
              <ClassSelectionRow key={index}
                                 handleChoosenClassClick={props.handleChoosenClassClick}
                                 elementEn={element.url}
                                 elementUrl={element.url}
                                 elementPl={element.name}
                                 elementApi={element.url}/>
          )}
        </tr>
        <tr>
          {hs_class.slice(3, 6).map((element, index) =>
              <ClassSelectionRow key={index}
                                 handleChoosenClassClick={props.handleChoosenClassClick}
                                 elementEn={element.url}
                                 elementUrl={element.url}
                                 elementPl={element.name}
                                 elementApi={element.url}/>
          )}
        </tr>
        <tr>
          {hs_class.slice(6, 9).map((element, index) =>
              <ClassSelectionRow key={index}
                                 handleChoosenClassClick={props.handleChoosenClassClick}
                                 elementEn={element.url}
                                 elementUrl={element.url}
                                 elementPl={element.name}
                                 elementApi={element.url}/>
          )}
        </tr>
        </tbody>
      </table>
  )
};

export default ClassSelectionView;

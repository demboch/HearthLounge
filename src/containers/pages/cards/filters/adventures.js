import React, { Component } from 'react';
import {adventures} from '../../../../data/filters';
import {IconsWrapper} from './icons-wrapper';

export class AdventureFilter extends Component {
  render() {
    return (
        <div>
          <h3>Przygody</h3>
          <ul className="sidebar-icons">
            {adventures.map((element, index) =>
                <li value={element.en_url} key={index}>

                  <IconsWrapper icon_name={element.en_url} element_name={element.en_url} label={element.pl} index={index} data={element.en}/>
                </li>
            )}
          </ul>
        </div>
    );
  }
}
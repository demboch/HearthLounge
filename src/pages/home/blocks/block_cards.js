import React, { Component } from 'react';
import { Link } from 'react-router'
export class CardsBlock extends Component {
  render() {
    return (
        <li className={'cards block-width-1'}>
          <Link to={'/karty'}>
            <div>Karty</div>
          </Link>
        </li>
    );
  }
}
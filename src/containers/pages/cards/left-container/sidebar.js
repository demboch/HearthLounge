import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import {NameFilter} from '../filters/name';
import {StatisticsFilter} from '../filters/statistics';
import {FactionFilter} from '../filters/faction';
import {RaceFilter} from '../filters/race';
import {DustFilter} from '../filters/dust';
import {MechanicsFilter} from '../filters/mechanics';
import {ExpansionFilter} from '../filters/expansions';
import {AdventureFilter} from '../filters/adventures';
import {RarityFilter} from '../filters/rarity';
import {IsGoldenFilter} from '../filters/is-golden';

export class Sidebar extends Component {
  render() {
    return (
        <div className="sidebar">
          <h3 className="filter-header">Filters</h3>
          <NameFilter/>
          {/*<StatisticsFilter handleInputFilter={this.props.handleInputFilter} statistics={this.props.statistics}/>*/}
          {/*<FactionFilter    handleInputFilter={this.props.handleInputFilter} faction={this.props.faction}/>*/}
          {/*<RaceFilter       handleInputFilter={this.props.handleInputFilter} race={this.props.race}/>*/}
          {/*<MechanicsFilter  handleInputFilter={this.props.handleInputFilter} mechanics={this.props.mechanics}/>*/}
          {/*<DustFilter       handleInputFilter={this.props.handleInputFilter} dust={this.props.dust}/>*/}

          {/*// <ExpansionFilter  handleFilterClick={this.props.handleFilterClick} expansion={this.props.expansion}/>*/}
          {/*<AdventureFilter  handleFilterClick={this.props.handleFilterClick} adventure={this.props.adventure}/>*/}
          {/*<RarityFilter     handleFilterClick={this.props.handleFilterClick} rarity={this.props.rarity}/>*/}
          {/*<IsGoldenFilter/>*/}
        </div>
    );
  }
}
import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_PAPER, SHOW_BOOK, SHOW_WORK_BY_GRADUATE,
         SHOW_OTHERS } from '../constants/WorksFilters';

const WORKS_FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_PAPER]: 'Paper',
  [SHOW_BOOK]: 'Book',
  [SHOW_WORK_BY_GRADUATE]: 'Work by graduate',
  [SHOW_OTHERS]: 'Others',
};

export default class WorksSelector extends Component {
  constructor(props) {
    super(props);
    this.handleSelectWorksFilter = this.handleSelectWorksFilter.bind(this);
  }

  handleSelectWorksFilter(e) {
    e.stopPropagation();
    this.props.handleShowByWorksFilter(e.target.value);
  }

  render() {
    const { selectedWorksFilter } = this.props;
    return (
      <div className="block">
        <select
          className="select"
          value={selectedWorksFilter}
          onChange={this.handleSelectWorksFilter}
        >
          {
            [SHOW_ALL, SHOW_PAPER, SHOW_BOOK, SHOW_WORK_BY_GRADUATE, SHOW_OTHERS].map(filter =>
              <option
                value={filter}
                key={filter}
              >
                {WORKS_FILTER_TITLES[filter]}
              </option>,
            )
          }
        </select>
      </div>
    );
  }
}

WorksSelector.propTypes = {
  handleShowByWorksFilter: PropTypes.func.isRequired,
  selectedWorksFilter: PropTypes.string.isRequired,
};

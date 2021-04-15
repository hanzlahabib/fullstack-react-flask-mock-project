import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Weekend } from '@material-ui/icons';
const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
  { id: 'language', numeric: true, disablePadding: false, label: 'Language' },
  {
    id: 'genre',
    numeric: true,
    disablePadding: false,
    label: 'Genre(s)',
    sortDisable: true,
  },
  { id: 'runtime', numeric: true, disablePadding: false, label: 'Runtime' },
];

const headWrapperCells = [
  {
    id: 'tv-show',
    numeric: false,
    disablePadding: true,
    label: 'TV Show',
    colSpan: 2,
  },
  {
    id: 'Details',
    numeric: false,
    disablePadding: true,
    label: 'Details',
    colSpan: 3,
  },
];
export function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  // isSortDisable = (row) => {
  //   return
  // }
  return (
    <TableHead>
      <TableRow>
        {headWrapperCells.map((each) => {
          return (
            <TableCell key={each.id} align="center" colSpan={each.colSpan}>
              {each.label}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
          >
            {headCell?.sortDisable ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={Weekend}
                align="center"
              >
                {headCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

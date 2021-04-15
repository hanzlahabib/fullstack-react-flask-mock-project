import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firstLetterToUpperCase } from '../utils';
import ChipsArray from './chips';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { EnhancedTableHead } from './EnhancedTableHead';
import { makeStyles } from '@material-ui/core';
import { servies } from '../services';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '10px',
    margin: '10px',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, _] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [rows, setRows] = React.useState([]);
  const [activeFilter, setActiveFilter] = React.useState([]);

  const handleRequestSort = (event, property) => {
    setOrderBy(property);

    servies(`api/movies?sortBy=${property}`)
      .then((data) => {
        setRows(data);
      })
      .catch((a) => {
        console.log(a);
      });
  };

  const clearFilters = (data) => {
    setActiveFilter(data);
    // could be refactored into servicesJs file but keeping it here
    servies(`api/movies`)
      .then((data) => {
        setRows(data);
      })
      .catch((a) => {
        console.log(a);
      });
  };
  useEffect(() => {
    servies(`api/movies`)
      .then((data) => {
        setRows(data);
      })
      .catch((a) => {
        console.log(a);
      });
  }, []);

  const getGenres = (genre) =>
    genre.map((each, index) => {
      if (genre.length - 1 == index) {
        return firstLetterToUpperCase(each.name);
      } else {
        return `${firstLetterToUpperCase(each.name)}, `;
      }
    });
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {activeFilter.length != 0 ? (
          <ChipsArray chipData={activeFilter} />
        ) : null}
        <EnhancedTableToolbar
          setRows={setRows}
          clearFilters={clearFilters}
          setActiveFilter={setActiveFilter}
          isFilterSet={activeFilter.length ? true : false}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.length < 1 ? (
                <TableCell>No Result Found</TableCell>
              ) : (
                rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell component="th" scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.language}</TableCell>
                      <TableCell align="center">
                        {getGenres(row.genre)}
                      </TableCell>
                      <TableCell align="center">{row.runtime}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

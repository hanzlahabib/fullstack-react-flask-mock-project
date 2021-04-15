import React, { useEffect } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormDialog from './formDialog';
import { useToolbarStyles } from '../App';
import { debounce } from '../utils';
import SearchBar from 'material-ui-search-bar';
import { servies } from '../services';

export const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const [open, setOpen] = React.useState(false);
  const [searchOptions, setSearchOptions] = React.useState([]);
  const handleFormDialog = () => {
    setOpen(true);
  };
  const resetClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    servies(`api/genres`)
      .then((data) => {
        setSearchOptions(data);
      })
      .catch((a) => {
        console.log(a);
      });
  }, []);

  const handleSearch = (value) => {
    servies(`api/movies?search=${value}`)
      .then((data) => {
        props.setRows(data);
      })
      .catch((a) => {
        console.log(a);
      });
  };
  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Mocked Table
      </Typography>
      {props.isFilterSet ? null : (
        <SearchBar options={searchOptions} onChange={handleSearch} />
      )}
      {props.isFilterSet ? (
        <Tooltip title="Clear Filter">
          <IconButton
            aria-label="filter list"
            onClick={(e) => props.clearFilters([])}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={handleFormDialog}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

      <FormDialog
        open={open}
        resetClose={resetClose}
        setRows={props.setRows}
        setActiveFilter={props.setActiveFilter}
      />
    </Toolbar>
  );
};

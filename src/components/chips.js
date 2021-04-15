import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(props.chipData);

  useEffect(() => {
    setChipData(props.chipData);
  }, [props.chipData]);

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        return Object.keys(data).map((eachDataKey) => {
          if (data[eachDataKey] == '') return;
          return (
            <li key={eachDataKey}>
              <Chip
                label={eachDataKey + ':' + data[eachDataKey]}
                className={classes.chip}
              />
            </li>
          );
        });
      })}
    </Paper>
  );
}

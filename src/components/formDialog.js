import React, { useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  const initialValues = {
    type: '',
    language: '',
  };
  const [selectedFilters, setSelectedFilters] = useReducer(
    (currentValue, newValue) => {
      return { ...currentValue, ...newValue };
    },
    initialValues
  );

  const handleClose = () => {
    setOpen(false);
    props.resetClose();
  };

  const handleFilter = () => {
    let isValid = Object.keys(selectedFilters).some(
      (each) => selectedFilters[each] != ''
    );
    if (isValid) {
      let str = [];
      Object.keys(selectedFilters).map((key) => {
        if (selectedFilters[key] != '') {
          str.push(`${key}=${selectedFilters[key]}`);
        }
      });
      let qs = str.join('&');
      fetch(`api/movies?${qs}`, {
        headers: {
          accepts: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          props.setRows(data);
        });
      props.setActiveFilter([selectedFilters]);
    }
    setOpen(false);
    setSelectedFilters(initialValues);
    props.resetClose();
  };
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Type</InputLabel>
              <Input
                onChange={(e) => setSelectedFilters({ type: e.target.value })}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Language </InputLabel>
              <Input
                onChange={(e) =>
                  setSelectedFilters({ language: e.target.value })
                }
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFilter} color="primary">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
// function getFormFields(classes, selectedGenre, handleChange, genres) {
//   let fields = ['genre', 'language', 'type']
//   let finalFields = []
//   fields.map(each => {

//     switch(each) {
//       case 'genre':
//         finalFields.push(<FormControl className={classes.formControl}>
//         <InputLabel id="demo-dialog-select-label">Genres</InputLabel>
//         <Select
//           labelId="demo-dialog-select-label"
//           id="demo-dialog-select"
//           value={selectedGenre}
//           onChange={handleChange}
//           input={<Input />}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>

//           {genres.map(each => {
//             return <MenuItem value={each.name}>{firstLetterToUpperCase(each.name)}</MenuItem>;
//           })}
//         </Select>
//       </FormControl>)
//       break;
//       default:
//       fields = 'default'
//     }
//   }
//   )

//   return fields
// }

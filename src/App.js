import { Container } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import EnhancedTable from './components/EnhancedTable';

export const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

export default function App() {
  return (
    <Container style={{ padding: '10px', margin: '10px' }}>
      <EnhancedTable />
    </Container>
  );
}

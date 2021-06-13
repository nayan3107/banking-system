const formContainerStyles = (theme) => ({
  root: {
    '& > * ': {
      marginTop: theme.spacing(3),
      width: '25ch',
    },
  },
  grid: {
    minWidth: '350px',
    maxWidth: '500px',
    marginTop: '30px',
    marginBottom: '40px',
  },
  paper: {
    marginTop: theme.spacing(0),
    padding: '15px',
    borderRadius: '5px',
  },
});
export default formContainerStyles;

const AlertStyles = (theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

export default AlertStyles;

import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ComputerIcon from "@material-ui/icons/Computer";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500
  },
});

export default function Navigationtab({ onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue)

  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<ComputerIcon />} label="Rooms" />
        <Tab icon={<AccountBoxIcon />} label="Online" />
      </Tabs>
    </Paper>
  );
}

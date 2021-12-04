import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";

import { signUp } from "../../store/actions/authActions";

const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
  },
  spacing: {
    marginTop: "20px",
  },
});

const SignUp = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
    country: "",
    dob: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(user));
    setUser({
      name: "",
      email: "",
      password: "",
      phone: "",
      profession: "",
      country: "",
      dob: "",
    });
  };

  if (auth._id) return <Redirect to="/" />;

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Register</Typography>
        <TextField
          className={classes.spacing}
          id="enter-name"
          label="Name"
          variant="outlined"
          fullWidth
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-email"
          label="Email"
          variant="outlined"
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-phone"
          label="Phone"
          variant="outlined"
          fullWidth
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-profession"
          label="Profession"
          variant="outlined"
          fullWidth
          value={user.profession}
          onChange={(e) => setUser({ ...user, profession: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-country"
          label="Country"
          variant="outlined"
          fullWidth
          value={user.country}
          onChange={(e) => setUser({ ...user, country: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-dob"
          type="date"
          variant="outlined"
          fullWidth
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.spacing}
          type="submit"
        >
          SignUp
        </Button>
      </form>
    </>
  );
};

export default SignUp;

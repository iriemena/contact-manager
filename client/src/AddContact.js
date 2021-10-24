import TextField from "@material-ui/core/TextField";
import { makeStyles, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyle = makeStyles({
  field: {
    marginBottom: 10,
  },
});

function AddContact({ addContact }) {
  const history = useHistory();
  const classes = useStyle();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  function addForm(e) {
    e.preventDefault();
    const add = { name, email, phone };
    setNameError(false);
    setEmailError(false);
    setPhoneError(false);

    if (name === "") {
      setNameError(true);
      return;
    }
    if (email === "") {
      setEmailError(true);
      return;
    }
    if (phone === "") {
      setPhoneError(true);
      return;
    }

    addContact(add);
    setName("");
    setEmail("");
    setPhone("");
    history.push("/");
  }

  return (
    <form onSubmit={addForm} noValidate>
      <Typography style={{ marginTop: 80 }} variant="h5">
        Add Contact
      </Typography>
      <TextField
        required
        fullWidth
        className={classes.field}
        variant="outlined"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
      />

      <TextField
        fullWidth
        className={classes.field}
        variant="outlined"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />

      <TextField
        required
        fullWidth
        type="number"
        className={classes.field}
        variant="outlined"
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={phoneError}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIosIcon />}
      >
        Add Contact{" "}
      </Button>
    </form>
  );
}

export default AddContact;

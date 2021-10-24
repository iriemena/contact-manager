import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default class EditContact extends Component {
  constructor(props) {
    super(props);
    const { _id, name, email, phone } = props.location.state.contact;

    this.state = {
      _id,
      name,
      email,
      phone,
    };
  }
  state = {
    nameError: false,
    emailError: false,
    phoneError: false,
  };
  addForm = (e) => {
    this.setState({ nameError: false, phoneError: false, emailError: false });
    e.preventDefault(e);
    if (this.state.name === "") {
      this.setState({ nameError: true });
      return;
    }
    if (this.state.email === "") {
      this.setState({ emailError: true });
      return;
    }
    if (this.state.phone === "") {
      this.setState({ phoneError: true });
      return;
    }
    this.props.updateContact(this.state);

    this.props.history.push("/");
  };
  render() {
    return (
      <form onSubmit={this.addForm} noValidate>
        <Typography style={{ marginTop: 80 }} variant="h5">
          Add Contact
        </Typography>
        <TextField
          style={{ marginBottom: 10 }}
          required
          fullWidth
          variant="outlined"
          label="Name"
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          error={this.state.nameError}
        />

        <TextField
          style={{ marginBottom: 10 }}
          required
          fullWidth
          variant="outlined"
          label="Email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
          error={this.state.emailError}
        />

        <TextField
          style={{ marginBottom: 10 }}
          required
          fullWidth
          variant="outlined"
          label="Phone"
          value={this.state.phone}
          onChange={(e) => this.setState({ phone: e.target.value })}
          error={this.state.phoneError}
        />

        <Button type="submit" variant="contained" color="primary">
          UPDATE Contact
        </Button>
      </form>
    );
  }
}

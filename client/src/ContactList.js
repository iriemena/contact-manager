import React from "react";
import { Typography, Divider, ButtonGroup } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const useStyle = makeStyles({
  btn: {
    position: "fixed",
    bottom: 10,
    right: 170,
    borderRadius: 50,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
  },
});

// TO GENERATE RANDOM HEX COLOR FOR AVATAR
function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);
  return color;

  // ****OR PICKING FROM ARRAY OF COLORS****
  // const colors = ['red', 'blue', 'green', 'purple', 'orange'];
  // return colors[Math.floor(Math.random() * colors.length)]
}

function ContactList({ contacts, deleteContact, search, getSearch }) {
  const classes = useStyle();

  return (
    <div>
      <Link to="/add">
        <Button variant="contained" color="primary" className={classes.btn}>
          <AddIcon variant="" />
        </Button>
      </Link>
      <Typography
        variant="p"
        component="h3"
        align="center"
        color="textSecondary"
        style={{ marginTop: 70, marginBottom: 10 }}
      >
        {" "}
        <br />
        Contact List
      </Typography>

      <br />
      {contacts.length < 1
        ? "No contact is available"
        : contacts.map((contact) => (
            <div style={{ background: "#fefefe" }}>
              <Divider />
              <Card elevation={0} className={classes.card}>
                <Link
                  to={{
                    pathname: `/contact/${contact._id}`,
                    state: { name: contact },
                  }}
                  className={classes.link}
                >
                  <CardHeader
                    avatar={
                      <Avatar style={{ backgroundColor: randomColor() }}>
                        {contact.name[0].toUpperCase()}
                      </Avatar>
                    }
                    title={contact.name}
                    subheader={contact.email}
                  />
                </Link>

                <ButtonGroup>
                  <Link
                    to={{
                      pathname: "/update/" + contact._id,
                      state: { contact: contact },
                    }}
                  >
                    <BorderColorIcon
                      style={{ color: "blue", marginTop: "20px" }}
                    />
                  </Link>

                  <Link>
                    <Delete
                      style={{
                        color: "red",
                        marginLeft: "15px",
                        marginTop: "20px",
                      }}
                      onClick={() => deleteContact(contact._id)}
                    />
                  </Link>
                </ButtonGroup>
              </Card>
            </div>
          ))}
    </div>
  );
}

export default ContactList;

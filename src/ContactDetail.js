import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";

const useStyle = makeStyles({
  btn: {
    position: "fixed",
    bottom: 10,
  },
  root: {
    marginTop: 100,
    display: "flex",
  },
  detail: {
    textAlign: "center",
  },
  img: {
    width: "30%",
    borderRadius: "50%",
    marginLeft: "50%",
    transform: "translate(-50%)",
  },
});

const ContactDetail = (props) => {
  const { name, email, phone } = props.location.state.name;

  const classes = useStyle();
  return (
    <div style={{ marginTop: 80 }}>
      <Card className={classes.root}>
        <CardActionArea>
          <img src="/user.jpg" alt="user" className={classes.img}></img>
          <CardContent className={classes.detail}>
            <Typography variant="h3" component="h2">
              {name}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <EmailIcon /> {email}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CallIcon />
              {phone}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Link to="/">
        <Button variant="contained" color="primary" className={classes.btn}>
          Go back
        </Button>
      </Link>
    </div>
  );
};

export default ContactDetail;

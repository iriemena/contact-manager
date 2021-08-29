import { Typography } from "@material-ui/core";
import ToolBar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Search from "./Search";

function ContactHeader({ getSearch, search }) {
  return (
    <AppBar position="fixed" color="default">
      <ToolBar align="left">
        <Typography
          variant="p"
          component="strong"
          color="primary"
          style={{ display: "flex", flexGrow: 1, fontSize: "18px" }}
        >
          CONTACT MANAGER
        </Typography>

        <Search search={search} getSearch={getSearch} />
      </ToolBar>
    </AppBar>
  );
}

export default ContactHeader;

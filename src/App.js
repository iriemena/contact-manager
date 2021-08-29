import { Container } from "@material-ui/core";
import AddContact from "./AddContact";
import ContactHeader from "./ContactHeader";
import ContactList from "./ContactList";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import Database from "./Database/db";
import EditContact from "./EditContact";

const App = () => {
  const [contacts, setContact] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // **********************LOCAL STORAGE BEGIN***************************************

  // const LOCAL_STORAGE_KEY = "contact";
  // useEffect(() => {
  //   const retContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retContact) setContact(retContact);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  // **************************LOCAL STORAGE ENDS*********************************

  // GET ALL CONTACT
  useEffect(() => {
    const allContacts = async () => {
      const retrieveContact = await Database.get("/contacts");
      setContact(retrieveContact.data);
    };
    allContacts();
  }, []);

  // ADD CONTACT
  const addContact = async (contact) => {
    const postContact = await Database.post("/contacts", contact);
    setContact([...contacts, postContact.data]);
  };

  // EDIT CONTACT
  const updateContact = async (contact) => {
    const edit = await Database.put(`/contacts/${contact.id}`, contact);
    const { id } = edit.data;
    const newData = contacts.map((contact) =>
      contact.id === id ? edit.data : contact
    );
    setContact(newData);
  };

  // DELETE CONTACT
  const deleteContact = async (id) => {
    await Database.delete(`/contacts/${id}`);
    const newContact = contacts.filter((contact) => contact.id !== id);
    setContact(newContact);
  };

  const getSearch = (searched) => {
    setSearch(searched);
    if (search !== "") {
      const newContact = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newContact);
    } else {
      setSearchResult(contacts);
    }
  };

  return (
    <Container>
      <Router>
        <ContactHeader search={search} getSearch={getSearch} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ContactList
                contacts={search.length < 1 ? contacts : searchResult}
                deleteContact={deleteContact}
              />
            )}
          />
          <Route
            path="/add"
            component={() => <AddContact addContact={addContact} />}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContact={updateContact} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;

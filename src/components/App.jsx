import React, { Component } from 'react';

import css from './App.module.css';

import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      name: '',
      filter: '',
    };
  }

  addContact = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const id = nanoid();
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const newContact = { id, name, number };

    const alreadyExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      return toast.error(`${name} is already in contacts`);
    } else {
      return this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  removeContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  handleFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  render() {
    return (
      <div className={css.container}>
        <section className={css.section}>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2>Contacts</h2>
          {this.state.contacts.length !== 0 ? (
            <>
              <Filter filteredContacts={this.handleFilter} />
              <ContactList
                contacts={this.state.contacts}
                filter={this.state.filter}
                removeContact={this.removeContact}
              />
            </>
          ) : (
            <p>There are no contacts saved yet</p>
          )}
        </section>
        <Toaster />
      </div>
    );
  }
}

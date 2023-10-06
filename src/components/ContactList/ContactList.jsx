import PropoTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, filter, removeContact }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <li key={contact.id} className={css.listItem}>
            {contact.name}: {contact.number}
            <button type="button" onClick={() => removeContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropoTypes.arrayOf(
    PropoTypes.shape({
      id: PropoTypes.string.isRequired,
      name: PropoTypes.string.isRequired,
      number: PropoTypes.number.isRequired,
    })
  ),
  filter: PropoTypes.string.isRequired,
  removeContact: PropoTypes.func.isRequired,
};

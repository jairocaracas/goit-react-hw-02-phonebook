export const Filter = ({ filteredContacts }) => (
  <>
    <p>Find contacts by name</p>
    <input type="text" name="filter" onChange={filteredContacts} />
  </>
);

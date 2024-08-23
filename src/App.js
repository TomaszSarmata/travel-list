import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="app">
      <Logo />
      <Form
        items={items}
        setItems={setItems}
      />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}
function Form({ items, setItems }) {
  const [userInput, setUserInput] = useState('');
  const [userSelection, setUserSelection] = useState(1);
  // const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((curr) => {
      return [item, ...curr];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInput) {
      alert('Please type in the item name');
      return;
    }

    const newItem = {
      description: userInput,
      quantity: userSelection,
      packed: false,
      id: Date.now(),
    };

    handleAddItems(newItem);

    setUserInput('');
    setUserSelection(1);
  };

  return (
    <form
      className="add-form"
      onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={userSelection}
        onChange={(e) => {
          setUserSelection(+e.target.value);
        }}
        name=""
        id="">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option
            value={num}
            key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items }) {
  return (
    <div className="list">
      <ul className="list">
        {items.length > 0
          ? items.map((item) => (
              <Item
                item={item}
                key={item.id}
              />
            ))
          : initialItems.map((item) => (
              <Item
                item={item}
                key={item.id}
              />
            ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li key={item.id}>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
        <button>❌</button>
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have x items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

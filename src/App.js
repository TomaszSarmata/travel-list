import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((curr) => {
      return [item, ...curr];
    });
  };

  const handleDeleteItem = (itemToDelete) => {
    setItems((curr) => {
      return curr.filter((item) => item.id !== itemToDelete.id);
    });
  };

  const onToggleItem = (item) =>
    setItems((curr) =>
      curr.map((element) => {
        return element.id !== item.id
          ? element
          : { ...element, packed: !element.packed };
      })
    );

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        setItems={setItems}
        onDeleteItem={handleDeleteItem}
        onToggleItem={onToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
  const [userInput, setUserInput] = useState('');
  const [userSelection, setUserSelection] = useState(1);

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

    onAddItems(newItem);

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
function PackingList({ items, setItems, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul className="list">
        {items.length > 0 ? (
          items.map((item) => (
            <Item
              item={item}
              setItems={setItems}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))
        ) : (
          <p>Add items to your travel list to see them displayed over here</p>
        )}
      </ul>
    </div>
  );
}

function Item({ item, setItems, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        onChange={() => onToggleItem(item)}
        value={item.packed}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
        <button
          onClick={() => {
            onDeleteItem(item);
          }}>
          ❌
        </button>
      </span>
    </li>
  );
}

function Stats({ items }) {
  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} {items.length > 1 ? 'items' : 'item'} on your
        list, and you already packed{' '}
        {items.filter((item) => item.packed === true).length}
      </em>
    </footer>
  );
}

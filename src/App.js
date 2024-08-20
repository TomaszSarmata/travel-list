export default function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}
function Form() {
  return (
    <div class="add-form">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  );
}
function PackingList() {
  return <div class="list">List</div>;
}
function Stats() {
  return (
    <footer class="stats">
      <em>💼 You have x items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

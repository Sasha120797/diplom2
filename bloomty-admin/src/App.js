import ProductTable from "./components/ProductTable";
import OrderTable from "./components/OrderTable";

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Админ панель</h1>

      <h2>Товары</h2>
      <ProductTable />

      <h2 style={{ marginTop: 40 }}>Заказы</h2>
      <OrderTable />
    </div>
  );
}

export default App;

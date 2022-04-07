import AddDog from "./AddDog";
import "./App.css";
import DogOutPut from "./DogOutPut";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditDog from "./EditDog";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/edit/:id" component={EditDog} />
          <Route path="/create" component={AddDog} />
          <Route path="/" component={DogOutPut} exact={true} />
        </Switch>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

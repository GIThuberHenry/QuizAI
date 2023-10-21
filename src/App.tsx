import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Profile from "./pages/Profile";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import ShopItemsContextProvider from "./data/shopitemsContextProvider";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <ShopItemsContextProvider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/wishlist" exact={true}>
              <Wishlist />
            </Route>
            <Route path="/history" exact={true}>
              <History />
            </Route>
            <Route path="/history/:code" exact={true}>
              <HistoryDetail />
            </Route>
            <Route path="/profile" exact={true}>
              <Profile />
            </Route>
            <Route path="/cart" exact={true}>
              <Cart />
            </Route>
            {/* <Route path="/:name" exact={true}>
              <Page />
            </Route> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </ShopItemsContextProvider>
    </IonApp>
  );
};

export default App;

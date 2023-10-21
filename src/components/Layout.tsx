import React, { useEffect, useState } from "react";
import { IonBadge, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar, ToggleCustomEvent } from "@ionic/react";
import { bagHandle } from "ionicons/icons";

import ShopItemsContext from "../data/shopitem-context";

const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const itemsContext = React.useContext(ShopItemsContext);

  const [cartLength, setCartLength] = useState<number>(JSON.parse(sessionStorage.getItem("cart") || "[]").length);

  useEffect(() => {
    const cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartLength(cartData.length);
  }, [itemsContext.cartItems]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar style={{ padding: "0 0.5em" }}>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{title}</IonTitle>
            <IonButtons
              slot="end"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              <IonIcon aria-hidden="true" slot="start" size="large" ios={bagHandle} md={bagHandle} />
            </IonButtons>
            
            <IonBadge style={{ position: "absolute", right: "0", bottom: "0", margin: "1em", fontSize: "8px", zIndex: "9999" }}>
                {cartLength}
            </IonBadge>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>{children}</IonContent>
      </IonPage>
    </>
  );
};

export default Layout;

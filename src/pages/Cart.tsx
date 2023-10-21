import Layout from "../components/Layout";
import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";

import { shopItems } from "../data/shopItems.json";
import PriceToString from "../components/PriceToString";
import ShopItemsContext, { ShopItem } from "../data/shopitem-context";
import React from "react";

const Cart: React.FC = () => {

  const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");

  const itemsContext = React.useContext(ShopItemsContext);

  const increaseCartItemQuantity = (itemId: string) => {
    itemsContext.increaseCartItemQuantity(itemId);
  }
   
  const decreaseCartItemQuantity = (itemid: string) => {
    itemsContext.decreaseCartItemQuantity(itemid);
  }

  const checkout = (item: any) => {
    itemsContext.checkout(item);
  }

  return (
    <>
    {cartItems === undefined || cartItems.length == 0 ? (
      <>
        <Layout title="U-Shop">
        <div style={{ margin: "2em 2em", padding: "1em", background: "gray", borderRadius: "0.5em", fontSize: "16px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IonLabel>
                    Your cart is empty
                  </IonLabel>
                </div>
          </div>
        </Layout>
      </>
    ) : (
      <>
        <Layout title="U-Shop">
          <IonList>
            {cartItems.map((item: ShopItem) => { // Assuming ShopItem is your item type
              return (
                <IonItem key={item.id} style={{ padding: "0.5em" }}>
                  <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <img alt={item.name} src="https://ionicframework.com/docs/img/demos/card-media.png" style={{ width: "75px", height: "75px", marginRight: "1em", borderRadius: "1em" }} />
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <IonLabel style={{ fontSize: "18px", fontWeight: "600" }}>{item.name}</IonLabel>
                        <IonLabel style={{ fontSize: "14px", fontWeight: "200" }}>Rp. {PriceToString(item.price)}</IonLabel>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: "0.5em" }}>
                      <IonButton expand="block" size="default" color="dark" style={{ margin: "0" }} onClick={() => { decreaseCartItemQuantity(item.id) }}>
                        -
                      </IonButton>
                      <IonLabel style={{ margin: "0 0.75em", color: "black" }}>
                        {item.quantity}
                      </IonLabel>
                      <IonButton expand="block" size="default" color="dark" style={{ margin: "0" }} onClick={() => { increaseCartItemQuantity(item.id) }}>
                        +
                      </IonButton>
                    </div>
                  </div>
                </IonItem>
              );
            })}
          </IonList>
          <div style={{ margin: "2em 2em", padding: "1em", background: "gray", borderRadius: "0.5em", fontSize: "16px" }}>
            {cartItems.map((item: ShopItem) => {
              return (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
                  <IonLabel>{item.name} ({item.quantity}x)</IonLabel>
                  <IonLabel>: Rp. {PriceToString(item.price * item.quantity)}</IonLabel>
                </div>
              )
            })}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
              <IonButton shape="round" onClick={()=>{ checkout(cartItems) }}>
                <IonLabel>Checkout</IonLabel>
              </IonButton>
            </div>
          </div>
        </Layout>
      </>
    ) }
    </>
  );
};

export default Cart;

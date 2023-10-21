import React from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react';
import { bagHandle, heart, trash } from 'ionicons/icons';

import Layout from '../components/Layout';

import ShopItemsContext, { ShopItem } from "../data/shopitem-context";
import PriceToString from '../components/PriceToString';

const Wishlist: React.FC = () => {

    const wishlistItems = JSON.parse(sessionStorage.getItem("wishlist") || "[]");

    const itemsContext = React.useContext(ShopItemsContext);

    const removeFromWishlist = (itemId: string) => {
        itemsContext.removeFromWishlist(itemId);
    }
    const addToCart = (item: any) => {
        itemsContext.addToCart(item);
      }


    return (
        <>
        {wishlistItems === undefined || wishlistItems.length == 0 ? (
            <>
            <Layout title="Wishlist">
                <div style={{ margin: "2em 2em", padding: "1em", background: "gray", borderRadius: "0.5em", fontSize: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                        <IonLabel>
                            Your Wishlist is empty
                        </IonLabel>
                        </div>
                </div>
            </Layout>
            </>
        ):
        (
            <>
                <Layout title="Wishlist">
                    <IonList>
                        {wishlistItems.map((item:ShopItem) => {
                            return(
                                <IonItemSliding>
                                    <IonItemOptions side="start">
                                        <IonItemOption color="danger" onClick={()=>{removeFromWishlist(item.id)}} >
                                            <IonIcon slot="icon-only" icon={trash}></IonIcon>
                                        </IonItemOption>
                                    </IonItemOptions>
                                    <IonItem>
                                    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                                        <img alt={"tes"} src="https://ionicframework.com/docs/img/demos/card-media.png" style={{ width: "75px", height: "75px", marginRight: "1em", borderRadius: "1em" }} />
                                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                            <div>
                                                <IonLabel style={{ fontSize: "18px", fontWeight: "600" }}>{item.name}</IonLabel>
                                                <IonLabel style={{ fontSize: "14px", fontWeight: "200" }}>Rp. {item.price}</IonLabel>
                                            </div>
                                        </div>
                                    </div>
                                    </IonItem>
                                    <IonItemOptions side="end">
                                        <IonItemOption color={"success"} onClick={() => {addToCart(item)}}>
                                            <IonIcon icon={bagHandle} slot="icon-only" />
                                        </IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>

                            )
                        })}
                    </IonList>
                </Layout>
            </>
        )
        }
        </>
    )
}

export default Wishlist;
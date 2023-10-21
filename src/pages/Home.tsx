import React from "react";

import Layout from "../components/Layout";
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCol, IonGrid, IonRow, IonIcon } from "@ionic/react";
import { heartOutline, addCircleOutline } from "ionicons/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Home.css";

import { shopItems } from "../data/shopItems.json";
import PriceToString from "../components/PriceToString";
import ShopItemsContext from "../data/shopitem-context";

const Home: React.FC = () => {

  const itemsContext = React.useContext(ShopItemsContext);

  const addToCart = (item: any) => {
    itemsContext.addToCart(item);
  }

  const addToWishlist = (item: any) => {
    itemsContext.addToWishlist(item);
  }

  return (
    <>
      <Layout title="U-Shop">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        <div className="ion-padding">
          <IonGrid fixed={true}>
            <IonRow>
              {itemsContext.items.map((item) => {
                return (
                  <IonCol key={item.id} className="shop-items-card" size="6" size-md="4" size-lg="4">
                    <IonCard>
                      <img alt={item.name} src="https://ionicframework.com/docs/img/demos/card-media.png" />
                      <IonCardHeader>
                        <IonCardTitle>{item.name}</IonCardTitle>
                        <IonCardSubtitle>Rp. {PriceToString(item.price)}</IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div onClick={() => {addToWishlist(item)} }>
                          <IonIcon aria-hidden="true" slot="start" ios={heartOutline} md={heartOutline} />
                        </div>
                        <div onClick={() => { addToCart(item) }}>
                          <IonIcon aria-hidden="true" slot="end" ios={addCircleOutline} md={addCircleOutline} />
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        </div>
      </Layout>
    </>
  );
};

export default Home;

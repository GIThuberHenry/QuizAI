import Layout from "../components/Layout";
import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";

import PriceToString from "../components/PriceToString";

import { TransactionHistory } from "../data/shopitem-context";
import { useEffect } from "react";

import { useParams } from 'react-router-dom';

const HistoryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const transactionHistory = JSON.parse(sessionStorage.getItem("transactionHistory") || "[]");

  return (  
    <>
      <Layout title="U-Shop">
        <IonButton onClick={() => window.history.back()} shape="round" style={{ margin: "1em 1em 0 1em" }}>Back</IonButton>
          <div style={{ width:"100%", height:"10em", padding:"1em", marginBottom:"1em", backgroundColor:"gray", borderRadius:"1em",  }}>
              <div >
                  <div>
                    Code: {code}
                  </div>
                  <br/>
                  <div>
                    {transactionHistory.filter((item: any) => item.transactionCode === code).map((item: TransactionHistory) => {
                      return (
                        <>
                          <div>
                            {item.transactionItems.map((item: any) => {
                              return(
                                <>
                                  <div>{item.id}. {item.name} ({item.quantity}x) = Rp.{item.quantity * item.price}</div>
                                </>
                              )
                            })}
                          </div>
                          <br/>
                          <hr style={{ border: '2px solid #000' }} />
                          <div>
                            Total: Rp. {PriceToString(item.transactionTotal)}
                          </div>
                        </>
                      )
                    })}
                  </div>
              </div>
          </div>
      </Layout>
    </>
  );
};

export default HistoryDetail;

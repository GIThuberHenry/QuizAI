
import Layout from "../components/Layout";
import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";

import PriceToString from "../components/PriceToString";

import { TransactionHistory } from "../data/shopitem-context";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";

const History: React.FC = () => {
  const history = useHistory();
  const [sortOrder, setSortOrder] = useState('asc');
  const transactionHistory = JSON.parse(sessionStorage.getItem("transactionHistory") || "[]");

  const sortedTransactionHistory = [...transactionHistory].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.transactionCode.localeCompare(b.transactionCode);
    } else {
      return b.transactionCode.localeCompare(a.transactionCode);
    }
  });

  const handleFilterClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Layout title="U-Shop">
        <IonButton shape="round" style={{ margin: "1em 1em 0 1em" }} onClick={handleFilterClick}>{sortOrder === 'asc' ? 'Filter A-Z' : 'Filter Z-A'}</IonButton>
        <div style={{ margin:"1em" }}>
          {sortedTransactionHistory.map((item: TransactionHistory) => {
            return (
              <div style={{ width:"100%", height:"10em", padding:"1em", marginBottom:"1em", backgroundColor:"gray", borderRadius:"1em",  }}>
                  <div >
                      <div>
                          code: {item.transactionCode}
                      </div>
                      <div>
                          Total: Rp. {PriceToString(item.transactionTotal)}
                      </div>
                      <div style={{ marginTop: "2em", textAlign:"center" }}>
                          <IonButton onClick={() => history.push(`/history/${item.transactionCode}`)} shape="round">Detail</IonButton>
                      </div>
                  </div>
              </div>
            )
          })}
        </div>
      </Layout>
    </>
  );
};

export default History;

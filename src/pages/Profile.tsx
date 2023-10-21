import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/react";
import Layout from "../components/Layout";

const Profile: React.FC = () => {
  return (
    <>
      <Layout title="Profile">
        <div style={{ margin: "2em" }}>
          <div></div>
          <IonCard style={{ height: "30em", margin: "auto", padding: "2em 1em" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img alt="profile" src="https://ionicframework.com/docs/demos/api/card/madison.jpg" style={{ width: "10em", height: "10em", borderRadius: "100%" }} />
            </div>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: "center" }}>Muhammad Naufal Syarif</IonCardTitle>
            </IonCardHeader>

            <IonCardContent style={{ textAlign: "center" }}>00000055788</IonCardContent>
          </IonCard>
        </div>
      </Layout>
    </>
  );
};

export default Profile;

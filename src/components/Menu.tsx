import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToggle, ToggleCustomEvent } from "@ionic/react";

import { useLocation } from "react-router-dom";
import { heartSharp, timeSharp, personSharp, moonSharp } from "ionicons/icons";
import "./Menu.css";
import { useState, useEffect } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}
import "../main.css";

const appPages: AppPage[] = [
  {
    title: "Wishlist",
    url: "/wishlist",
    iosIcon: heartSharp,
    mdIcon: heartSharp,
  },
  {
    title: "History",
    url: "/history",
    iosIcon: timeSharp,
    mdIcon: timeSharp,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: personSharp,
    mdIcon: personSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  const [themeToggle, setThemeToggle] = useState(false);

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

   // Add or remove the "dark" class on the document body
   const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));
  }, []);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{ marginBottom: "0.5em" }}>U-Shop</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem>
            <IonIcon aria-hidden="true" slot="start" ios={moonSharp} md={moonSharp} />
            <IonToggle checked={themeToggle} onIonChange={toggleChange}>Dark Mode</IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

import type React from "react"
import { IonApp, IonContent, setupIonicReact } from "@ionic/react"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"
import MacKeyboard from "./components/MacKeyboard"

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonContent className="ion-padding">
      <h1>macOS Keyboard for iOS</h1>
      <p>
        This is a preview of the keyboard. When built as a keyboard extension, only the keyboard portion will be
        visible.
      </p>
      <div className="keyboard-preview">
        <MacKeyboard />
      </div>
    </IonContent>
  </IonApp>
)

export default App

import React, { useState, useRef } from 'react';
import { 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonModal,
  IonItem,
  IonInput,
  IonTextarea,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { OverlayEventDetail } from '@ionic/core/components';
import './Tab1.css';

const Tab1: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  //const input = useRef<HTMLIonInputElement>(null);
  const [noteInput,setNoteInput] = useState("");

  const testData = [
    {text:"Note 1",level:1},
    {text:"Note 2",level:2},
    {text:"Note 3",level:3}
  ];

  const [notes, setNotes] = useState(testData);

  // function addOne() {
  //   setNotes((prevNotes) => [
  //     ...prevNotes,
  //     {
  //       text: noteInput,
  //       level: prevNotes.length + 1
  //     },
  //   ]);
  //   //modal.current?.dismiss(input.current?.value, 'confirm');
  //   modal.current?.dismiss();
  //   console.log(notes);
  // };

  // Bug workaround from Jameson

  async function addOne() {
    await modal.current?.dismiss();
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        text: noteInput,
        level: prevNotes.length + 1
      },
    ]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Notes</IonTitle>
          <IonButtons slot="end">
            <IonButton id="open-modal">
              <IonIcon icon={addOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonItem>Storage Test</IonItem>
      {/* test add note without modal */}
      <IonItem>{notes.length}</IonItem>
      <IonItem>
        <IonButton onClick={addOne}>plus one</IonButton>
      </IonItem>
      {/* test end */}
      <IonContent fullscreen>
        {
          // comment this out to test without cards
          notes.map((e, index) => {
            return (
          <IonCard key={index}>
            <IonCardContent>{e.text}</IonCardContent>
            <IonItem>
              <IonIcon icon={createOutline} slot="end" />
              <IonIcon icon={trashOutline} slot="end" />
            </IonItem>
          </IonCard>
            );
          })
        }
      <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={addOne}>
                  Save
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput className="new-note-input" type="text">
              <IonTextarea value={noteInput} onIonChange={e => setNoteInput(e.detail.value!)} autoGrow maxlength={280} placeholder="What's a quote of yours?"></IonTextarea>
            </IonInput> 
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

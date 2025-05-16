import { registerRootComponent } from 'expo';

import App from './App';

export type RootStackParamList = {
  MyComments: undefined;
  MinhasAvaliacoes: undefined;
  EventDetails: { idevento: number };
  ComentariosScreen: { idevento: number };
};

// Regista a aplicação
registerRootComponent(App);

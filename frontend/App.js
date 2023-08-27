
import Main from './src/Main.js';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store.js';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Provider store={store} style={styles.container}>
        <Main></Main>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import {Author, AuthorRepository} from '../../services/author';

type Props = {
  name?: string;
};

type CountAction = {
  type: 'increment' | 'decrement';
};

const HomeScreen: React.FC<Props> = ({name}) => {
  const [nameState, setNameState] = React.useState<string | undefined>(name);
  const countReducer = (currentCount: number, action: CountAction) => {
    switch (action.type) {
      case 'increment':
        return currentCount + 1;
      case 'decrement':
        return currentCount - 1;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };
  const [countState, dispatch] = React.useReducer(countReducer, 0);

  const data = React.useMemo(() => {
    return (
      <View style={styles.countContainer}>
        <Text>{countState}</Text>
      </View>
    );
  }, [countState]);

  const changeTitle = React.useCallback((newName: string) => {
    setNameState(newName);
  }, []);

  const renderAuthorItem = React.useCallback(({item}: {item: Author}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      {data}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => dispatch({type: 'increment'})}>
          <Text>Increase</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => dispatch({type: 'decrement'})}>
          <Text>Decrease</Text>
        </Pressable>
      </View>
      <View>
        <FlatList
          data={AuthorRepository.getAll()}
          keyExtractor={item => item.id.toString()}
          renderItem={renderAuthorItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    margin: 10,
  },
});

export default HomeScreen;

import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';


// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../redux/actions';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo, editTodo }) => {
  const [task, setTask] = React.useState('');
  const [status, setStatus] = React.useState('due');
  const [selectedTodoId, setSelectedTodoId] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);

  const handleAddTodo = () => {
    addTodo({ task, status });
    setTask('');
    setStatus('due');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleEditTodo = () => {
    if (selectedTodoId !== null) {
      editTodo(selectedTodoId, task, status);
      setTask('');
      setSelectedTodoId(null);
      setEditMode(false);
    }
  };

  const handleEditPress = (id, currentTask, currentStatus) => {
    setTask(currentTask);
    setStatus(currentStatus);
    setSelectedTodoId(id);
    setEditMode(true);
  };

  const handleCardPress = (id, currentTask, currentStatus) => {
    if (!editMode) {
      handleEditPress(id, currentTask, currentStatus);
    }
  };

  const placeholder = {
      label: 'Select Task Status',
      value: null,
    };

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>
          ToDo App with React Native and Redux
        </Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>{editMode ? 'Edit Task' : 'Add ToDo Here'}</Title>

          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={(task) => setTask(task)}
          />

          <Spacer/>
          <Title>Add Task Status</Title>
          
          <RNPickerSelect
            placeholder ={(placeholder)}
            onValueChange={(value) => setStatus(value)}
            items={[
              { label: 'Due', value: 'due' },
              { label: 'Done', value: 'done' },
              { label: 'Late', value: 'late' },
            ]}
          />

          <Spacer />
          <Button
            mode="contained"
            onPress={editMode ? handleEditTodo : handleAddTodo}
            disabled={!task.trim()}>
            {editMode ? 'Edit Task' : 'Add Task'}
          </Button>
        </Card.Content>
      </Card>
      <Spacer />

      <ScrollView>
      {todo_list.map((item) => (
        <React.Fragment key={item.id}>
          <TouchableOpacity onPress={() => handleCardPress(item.id, item.task, item.status)}>
            <Card
              style={{
                backgroundColor: getStatusColor(item.status),
                borderWidth: 1,
                borderColor: '#000',
              }}>
              <Card.Title
                title={`Task#${item.id}`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => (
                  <ButtonIcon
                    iconName="close"
                    color="red"
                    onPress={() => handleDeleteTodo(item.id)}
                  />
                )}
              />
              <Card.Content>
                <Paragraph>{item.task}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <Spacer />
        </React.Fragment>
      ))}
      </ScrollView>
      <Spacer />
    </View>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'due':
      return '#FFD700'; // Yellow
    case 'done':
      return '#00FF00'; // Green
    case 'late':
      return '#610612'; // Red
    default:
      return '#FFD700'; // Default is due (yellow)
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = { addTodo, deleteTodo, editTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

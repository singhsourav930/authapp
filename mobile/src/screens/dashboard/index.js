import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>Welcome to Dashboard</Text>
        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.handleLogout()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    marginVertical: 25,
    textAlign: 'center',
  },
});

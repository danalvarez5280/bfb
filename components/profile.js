// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Picker, Linking, Alert } from 'react-native';
export default class Profile extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      scores: '',
      email: ''
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  goToInputPage = () => {
    this.props.navigation.navigate('Input', {
      user_id: route.params.user_id,
      name: route.params.name,
      email: !!this.state.email ? this.state.email : route.params.email,
      phone_number: route.params.phoneNumber,
      password: route.params.password,
      pledge_score: route.params.pledgeType,
      pledge_amount: route.params.pledgeAmount,
      score_amount: route.params.score_amount + this.state.scores,
      outstanding_balance: route.params.outstanding_balance,
      amount_paid_to_date: route.params.amount_paid_to_date
    });
  }  
  goToPledgePage = () => {
    this.props.navigation.navigate('Pledge', {
      user_id: route.params.user_id,
      name: !!this.state.username ? this.state.username : route.params.email,
      email: route.params.email,
      phone_number: route.params.phoneNumber,
      password: route.params.password,
      pledge_score: route.params.pledgeType,
      pledge_amount: route.params.pledgeAmount,
      score_amount: route.params.score_amount + this.state.scores,
      outstanding_balance: route.params.outstanding_balance,
      amount_paid_to_date: route.params.amount_paid_to_date
    });
  }  

  updateEmailAddress = () => {
    if (this.state.username == '') {
        Alert.alert('Please enter a new email address')
    } else {
      this.setState({
        isLoading: true,
      });
      fetch('https://birdies-for-books.herokuapp.com/updateUser', 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: {
            name: route.params.displayName,
            email: this.state.email,
            phone_number: route.params.phoneNumber,
            password: route.params.password,
            pledge_score: route.params.pledgeType,
            pledge_amount: route.params.pledgeAmount,
            score_amount: route.params.score_amount,
            outstanding_balance: route.params.outstanding_balance,
            amount_paid_to_date: route.params.amount_paid_to_date
          }
        }
      ).then((response) => response.json()).then((json) => {
        console.log(json);
        Alert.alert('Successfully updated email address!')
        this.setState({
          isLoading: false,
        });
      }).catch((error) => {
        Alert.alert(error.Message);
        this.setState({
          isLoading: false,
        });
      });
    }
  } 
  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Want to update your email address?
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <Button
          color="white"
          title="Update Email Address"
          onPress={() => this.updateEmailAddress()}
        />
        <Text style = {styles.textStyle}>
          To edit your pledge amount or type, click the button below
        </Text>
        <Button
          color="white"
          title="Edit Pledge Type/Amount"
          onPress={() => this.goToPledgePage()}
        />
        <Button
          color="white"
          title="Return to Input Page"
          onPress={() => this.goToInputPage()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#c2282d'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 15,
    color: 'white'
  },
  inputStyle: {
    fontSize: 20,
    marginBottom: 50,
    height: 50,
    width: 150,
    textAlign: 'center',
    color: 'white'
  },
  pickerStyle: {
    height: 30,
    width: 150,
    marginBottom: 200,
    color: 'white'
  }
});
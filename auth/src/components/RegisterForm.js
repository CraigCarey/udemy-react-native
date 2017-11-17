import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from "./common";
import firebase from 'firebase';

export default class RegisterForm extends Component {

    state = {
        email: '',
        password1: '',
        password2: '',
        error: '',
        loading: false
    };

    onButtonPress()
    {
        const { email, password1, password2 } = this.state;

        if (password1 !== password2) {
            this.setState({ error: 'Passwords do not Match', loading: false });
            return;
        }

        this.setState({ error: '', loading: true });

        firebase.auth().createUserWithEmailAndPassword(email, password1)
                    .then(this.onRegisterSuccess.bind(this))
                    .catch(this.onRegisterFail.bind(this));
    }

    onRegisterSuccess() {
        this.setState({
            email: '',
            password1: '',
            password2: '',
            error: '',
            loading: false
        });
    }

    onRegisterFail() {
        this.setState({
            error: 'Registration Failed',
            loading: false
        });
    }

    renderButtons() {
        if (this.state.loading) {
            return (
                <CardSection>
                    <Spinner size="small" />
                </CardSection>
            );
        }

        return (
            <View>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Register
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.props.modeSwitcher}>
                        Login
                    </Button>
                </CardSection>
            </View>
        );
    }

    render() {
        return (
            <Card>

                <CardSection>

                    <Input
                        label={'Email'}
                        placeholder={'user@gmail.com'}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />

                </CardSection>

                <CardSection>

                    <Input
                        label={'Password'}
                        placeholder={'password'}
                        value={this.state.password1}
                        secureTextEntry={true}
                        onChangeText={password1 => this.setState({ password1 })}
                    />

                </CardSection>

                <CardSection>

                    <Input
                        label={'Confirm'}
                        placeholder={'password'}
                        value={this.state.password2}
                        secureTextEntry={true}
                        onChangeText={password2 => this.setState({ password2 })}
                    />

                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                {this.renderButtons()}

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

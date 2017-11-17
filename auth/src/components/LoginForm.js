import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from "./common";
import firebase from 'firebase';

export default class LoginForm extends Component {

    state = {
        email: '',
        password1: '',
        password2: '',
        error: '',
        loading: false,
        registerMode: false
    };

    onLoginButtonPress()
    {
        const { email, password1 } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password1)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password1: '',
            password2: '',
            error: '',
            loading: false
        });
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed',
            loading: false
        });
    }

    onRegisterFail() {
        this.setState({
            error: 'Registration Failed',
            loading: false
        });
    }

    onRegisterButtonPress() {
        const { email, password1, password2 } = this.state;

        if (password1 !== password2) {
            this.setState({ error: 'Passwords do not Match', loading: false });
            return;
        }

        this.setState({ error: '', loading: true });

        firebase.auth().createUserWithEmailAndPassword(email, password1)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onRegisterFail.bind(this));
    }

    switchMode() {
        this.setState({ registerMode: !this.state.registerMode });
    }

    renderButtons() {
        if (this.state.loading) {
            return (
                <CardSection>
                    <Spinner size="small" />
                </CardSection>
            );
        }

        if (this.state.registerMode) {
            return (
                <View>
                    <CardSection>
                        <Button onPress={this.onRegisterButtonPress.bind(this)}>
                            Register
                        </Button>
                    </CardSection>

                    <CardSection>
                            <Button onPress={this.switchMode.bind(this)}>
                                Login
                            </Button>
                    </CardSection>
                </View>
            );
        }

        return (
            <View>
                <CardSection>
                    <Button onPress={this.onLoginButtonPress.bind(this)}>
                        Login
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.switchMode.bind(this)}>
                        Register
                    </Button>
                </CardSection>
            </View>
        );
    }

    renderConfirmBox() {
        if (this.state.registerMode) {
            return (
                <CardSection>

                    <Input
                        label={'Confirm'}
                        placeholder={'password'}
                        value={this.state.password2}
                        secureTextEntry={true}
                        onChangeText={password2 => this.setState({ password2 })}
                    />

                </CardSection>
            );
        }
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

                {this.renderConfirmBox()}

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

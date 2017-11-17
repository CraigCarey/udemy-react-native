import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from "./common";
import firebase from 'firebase';

export default class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onButtonPress()
    {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
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
                        Login
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.props.modeSwitcher}>
                        Register
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
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
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

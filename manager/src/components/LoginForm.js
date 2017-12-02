import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, BorderlessButton, Spinner } from './common';

class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onLoginButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({email, password});
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />;
        }

        return (
            <Button onPress={this.onLoginButtonPress.bind(this)}>Login</Button>
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    onRegisterButtonPress() {
        Actions.register({ type: 'replace' })
    }

    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='email@email.com'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email} />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label='Password'
                        placeholder='password'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password} />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <CardSection>
                    <BorderlessButton onPress={this.onRegisterButtonPress.bind(this)}>Register</BorderlessButton>
                </CardSection>

            </Card>
        );
    };
}

const styles={
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {

    const { email, password, error, loading } = state.auth;

    return { email, password, error, loading };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);

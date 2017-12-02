import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import LoadingScreen from "./components/LoadingScreen";

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' hideNavBar>

                <Scene key='auth'>
                    <Scene key='loading' component={LoadingScreen} title='Loading' hideNavBar='true' initial />
                    <Scene key='login' component={LoginForm} title='Login' />
                </Scene>

                <Scene key='main'>
                    <Scene
                        rightTitle='Add'
                        onRight={() => Actions.employeeCreate()}
                        leftTitle='Logout'
                        onLeft={() => firebase.auth().signOut()}
                        key='employeeList'
                        component={EmployeeList}
                        title='Employees'
                        initial
                    />
                    <Scene key='employeeCreate' component={EmployeeCreate} title='Create Employee' />
                    <Scene key='employeeEdit' component={EmployeeEdit} title='Edit Employee' />
                </Scene>

            </Scene>
        </Router>
    );
};

export default RouterComponent;

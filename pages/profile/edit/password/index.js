import React from 'react';
import request from 'utils/request';
import Dashboard from 'components/views/Dashboard';
import EditPassword from 'components/views/Profile/Password';
import { validateFormData } from 'utils/validations';
import 'isomorphic-fetch';
import {
    createRequestOptions,
    submitFormData
  } from 'utils/helperFuncs';
import cookies from 'utils/cookies';



class EditPasswordPage extends React.Component {

    static async getInitialProps({ req }) {
        
        const isServer = typeof window === 'undefined';
        return { isServer };
    }


    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false,
            formDetails: {
                old_password: {
                    status: false,
                    errorText: '',
                    value: "",
                    rules: ['isRequired'],
                },
                new_password: {
                    status: false,
                    errorText: '',
                    value: "",
                    rules: ['isRequired'],
                },
                new_password_confirm: {
                    status: false,
                    errorText: '',
                    value: "",
                    rules: ['isRequired'],
                },
            },
        }
    }

    updateFormDetails = (formDetails) => {
        this.setState({ formDetails });
    }

    validateForm = (formData) => {
        return validateFormData(formData);
    }

    submitForm = (formDetails) => { // eslint-disable-line no-unused-vars
        const userData = submitFormData(formDetails);
        this.onEditPassword(userData);
    }
    
    onEditPassword = async (data) => {
        this.setState({ error: false, success: false });
        const requestBody = { data };
        const requestURL = '/api/profile/password';
        const token = cookies.load('token');
        const options = createRequestOptions('PUT', requestBody, { Authorization: `Bearer ${token}` });
        const response = await request(requestURL, options);
        if(!response.err) {
            const user = response.data;
            this.setState({ success: "Your password is edited successfully!" });
        } else {
            this.setState({ error: response.err.reason });
        }
    }
    
	render() {
        const { formDetails, error, success } = this.state;
        return (
            <Dashboard>
                <EditPassword            
                    formDetails={formDetails}
                    error={error}
                    success={success}

                    validateForm={this.validateForm}
                    updateFormDetails={this.updateFormDetails}
                    submitForm={this.submitForm}
                />
            </Dashboard>
		);
	}
}

export default EditPasswordPage;

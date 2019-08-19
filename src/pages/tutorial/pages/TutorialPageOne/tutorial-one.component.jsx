import React, { Component } from 'react';
import { auth, firestore } from '../../../../firebase/firebase.utils'

import FormInput from '../../../../components/form-input/form-input.component'
import CustomButton from '../../../../components/custom-button/custom-button.component'

import Typed from 'typed.js';

import './tutorial-one.styles.scss'

class TutorialPageOne extends Component{
    constructor(){
        super()

        this.state = {
            questionAsked: false,
            notificationEmail: '',
            notificationPhone: '',
            notificationsSelected: {
                text: false,
                email: false,
                push: false
            }
        }
    }

    componentDidMount(){
     
        var options = {
        strings: ["Hello, how would you like to receive your leads?"],
        typeSpeed: 15,
        showCursor: false,
        onComplete: () => {
            this.setState({
                questionAsked: true
            })
        }
        }

        var typed = new Typed("#questionTitle", options);
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        let { uid } = auth.currentUser;
        let userRef = firestore.collection("users").doc(uid);

        if(this.state.notificationPhone) 
            userRef.update({
                notificationPhone: this.state.notificationPhone,
                tutorialCurrentPage: 2
            });

        if(this.state.notificationEmail) 
            userRef.update({
                notificationEmail: this.state.notificationEmail,
                tutorialCurrentPage: 2
            });
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    handleClick = (notificationType) => {
        switch(notificationType){
            case 'text':
                this.setState({
                    notificationsSelected: {
                        text: !this.state.notificationsSelected.text,
                        email: this.state.notificationsSelected.email,
                        push: this.state.notificationsSelected.push,
                    }
                })
                break;
            case 'email':
                console.log('email')
                this.setState({
                    notificationsSelected: {
                        text: this.state.notificationsSelected.text,
                        email: !this.state.notificationsSelected.email,
                        push: this.state.notificationsSelected.push,
                    }
                })
                break;
            case 'push':
                console.log('push')
                this.setState({
                    notificationsSelected: {
                        text: this.state.notificationsSelected.text,
                        email: this.state.notificationsSelected.email,
                        push: !this.state.notificationsSelected.push,
                    }
                })
                break;
            default:
                console.log('Type unspecified.')
                break;
        }
    }

    render(){

        let { text, email, push } = this.state.notificationsSelected;

        return (
                <div>
                    <h2 style={{textAlign: 'center', position: 'absolute', top: 0, width: '100%'}}>Let's Get Started - 1/5</h2>
                    <h1 id='questionTitle' style={{marginTop: '5em'}}></h1>
                    {
                        this.state.questionAsked ? (
                            <div>
                            
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: '4em', marginLeft: '2em'}}>
                                <p className={'receiveMethodButtons' + (text ? ' buttonActive' : '') } onClick={() => this.handleClick('text')}>Text</p>
                                <p className={'receiveMethodButtons' + (email ? ' buttonActive' : '') } onClick={() => this.handleClick('email')}>Email</p>
                                <p className={'receiveMethodButtons' + (push ? ' buttonActive' : '') } onClick={() => this.handleClick('push')}>Push Notification</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <form style={{ width: '500px', marginRight: '3em', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} onSubmit={this.handleSubmit}>
                                    {
                                        email ? 
                                        (
                                            <FormInput style={{ margin: '0em' }} type={'email'} name='notificationEmail' label='email' value={this.state.notificationEmail} handleChange={this.handleChange} required />
                                        )
                                        :
                                        null
                                    }
                                    {
                                        text || push ? 
                                        (
                                            <FormInput name='notificationPhone' type='tel' pattern="^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$" title='xxx-xxx-xxxx' label='phone' value={this.state.notificationPhone} handleChange={this.handleChange} required />
                                        )
                                        :
                                        null
                                    }
                                    <div className='buttons'>
                                        <CustomButton id='submitButton' type="submit" disabled={!this.state.notificationEmail && !this.state.notificationPhone}>Continue</CustomButton>
                                    </div>
                                </form>
                            </div>
                            </div>
                        ) : null
                    }
                </div>
            );
    }

} 

export default TutorialPageOne;
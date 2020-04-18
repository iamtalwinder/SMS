import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputCol: 'col-11 col-lg-8',
            inputExtra: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            inputCol: props.inputCol || state.inputCol,
            inputExtra: props.inputExtra || state.inputExtra
        };
    }

    render() {

        return (
            <div className={this.state.inputCol + ' ' + this.state.inputExtra + ' align-self-center'}>
                <input  
                    className='form-control'
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.email}
                    onChange={this.props.onChange}
                />
            </div>
        );

    }
}


export class Icon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconSize: 'fontsize-xs-24 fontsize-lg-38',
            iconCol: 'col-xs-1',
            iconExtra: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            iconSize: props.iconSize || state.iconSize,
            iconCol: props.iconCol || state.iconCol,
            iconExtra: props.iconExtra || state.iconExtra
        };
    }

    render() {
        return(
            <div className={this.state.iconCol + ' ' + this.state.iconExtra + ' align-self-center'}>
                <i className={this.props.icon + ' ' + this.state.iconSize}></i>
            </div>
        );
    }
}

export class RadioInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formCheck: 'form-check-inline'
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            formCheck: props.formCheck || state.formCheck
        };
    }

    render() {
        return (
            <div className={this.state.formCheck}>
                <label className="form-check-label">
                    <input 
                        type="radio" 
                        className="form-check-input" 
                        name={this.props.name} 
                        value={this.props.value}
                        onChange={this.props.onChange} 
                    />{this.props.label}
                </label>
            </div>
        );

    }
}
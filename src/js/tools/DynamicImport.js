import React, {Component} from 'react';

class DynamicComponent extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            Component: null
        }
    }

    async componentDidMount() {
        const name = this.props.component;
        let component;
        try {
            component = await import(/* webpackChunkName: "component-[index]" */`components/${name}/${name}`);
            this.setState({
                Component: component.default
            })
        }
        catch(err) {
            console.log(err);
            this.props.history.push('/500');
        };
    }

    render() {
        const {Component} = this.state;
        return  Component ?  <Component {...this.props}/> : null;
    }
}

export default DynamicComponent;
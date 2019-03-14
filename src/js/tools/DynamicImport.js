import React, {Component} from 'react';

function DynamicImport(options) {
    const {resolve, loader} = options;

    return class DynamicComponent extends  Component{
        constructor(props) {
            super(props);
            this.state = {
                Component: null
            }
        }

        async componentDidMount() {
            try {
                const component = await resolve();
                this.setState({
                    Component: component.default
                })
            }
            catch(err) {
                console.log(err);
                this.props.history.push('/500');
            }
        }

        render() {
            const {Component} = this.state;
            return  Component ?  <Component/> : React.createElement(loader);
        }
    }
}

export default DynamicImport;

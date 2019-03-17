import React, {Component} from 'react';
import RequestService from "../../services/RequestService";

function withRequest(WrappedComponent, options) {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                data: null
            };
            this.options = options;
        }

        componentWillReceiveProps(nextProps, nextContext) {
            if (nextProps.location.pathname !== this.props.location.pathname) {
                this.makeRequest(nextProps);
            }
        }

        componentDidMount () {
            this.makeRequest(this.props);
        }

        async makeRequest(props) {
            const options = typeof this.options.options === 'function' && this.options.options(props);
            try {
                const {data} = await RequestService.get(this.options.request, options);
                this.setState({
                    data,
                    loading: false
                })
            }
            catch (e) {
                this.setState({
                    error: 'Error occured while requesting',
                    loading: false
                })
            }
        }

        render () {
            const props =  {
                loading: this.state.loading,
                [this.options.name ? this.options.name : 'data'] : this.state.data
            };
            return (
                <WrappedComponent {...props}/>
            )
        }
    }
}


withRequest.propTypes = {};

export default withRequest;

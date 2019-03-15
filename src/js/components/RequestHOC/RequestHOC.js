import React, {Component} from 'react';
import RequestService from "../../services/RequestService";

function withRequest(WrappedComponent, options) {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                data: null
            }
        }

        async componentDidMount () {
            try {
                const {data} = await RequestService.get(options.request);
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
                [options.name] : this.state.data
            };
            return (
                <WrappedComponent {...props}/>
            )
        }
    }
}


withRequest.propTypes = {};

export default withRequest;

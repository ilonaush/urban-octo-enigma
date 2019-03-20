import React, {Component} from 'react';
import RequestService from "../../services/RequestService";
import {setLoading} from "../../reducers/actions";

function withRequest(WrappedComponent, opts) {

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
      setLoading(null, this.props.dispatch, true);
      this.opts = opts;
    }

    componentDidMount() {
      this.makeRequest(this.props);
    }

    /**
     * makes given request
     * @param props
     * @returns {Promise<void>}
     */
    async makeRequest(props) {
      try {
        const {data} = await RequestService.get(this.opts.request);
        this.setState({
          data
        });
        setLoading(null, this.props.dispatch, false);
      }
      catch (e) {
        this.setState({
          error: 'Error occured while requesting',
        });
        setLoading(null, this.props.dispatch, false);

      }
    }

    /**
     * formulate props for wrapped component
     * @returns {loading: boolean, [p: string]: data}
     */
    formProps() {
      return {
        loading: this.props.loading,
        [this.opts.name ? this.opts.name : 'data']: this.state.data,
        ...this.props
      }
    }

    render() {
      const props = this.formProps();
      return (
          <WrappedComponent {...props}/>
      )
    }
  }
}


withRequest.propTypes = {};


export default withRequest;

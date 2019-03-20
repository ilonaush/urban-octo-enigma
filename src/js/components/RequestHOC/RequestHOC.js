import React, {Component} from 'react';
import RequestService from "../../services/RequestService";

function withRequest(WrappedComponent, opts) {

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        data: null
      };
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
      // const options = typeof this.opts.options === 'function' && this.opts.options(props);
      try {
        const {data} = await RequestService.get(this.opts.request);
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

    /**
     * formulate props for wrapped component
     * @returns {loading: boolean, [p: string]: data}
     */
    formProps() {
      return {
        loading: this.state.loading,
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

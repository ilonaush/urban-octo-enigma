import React, {Component} from 'react';
import './Dashboard.styl';
import Intro from "../Intro/Intro";
import DashboardContent from "../DashboardContent/DashboardContent";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";
import PropTypes from 'prop-types';
import {PAGE_TITLES} from "../../constants";


export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: ''
        };
    }

    static propTypes = {
        pages: PropTypes.array,
        loading: PropTypes.bool,
        loadingType: PropTypes.string,
    };

    componentDidMount() {
        this.setState({
            page: this.getPage(this.props.location.pathname)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                page: this.getPage(nextProps.location.pathname)
            })
        }
    }

    /**
     * get page title based on route
     * @param path
     * @returns {{}}
     */
    getPage = (path) => {
        return {
            ...PAGE_TITLES.find((page) => page.path === path)
        };
    };

    render() {
        const {page} = this.state;
        const {loadingType, loading} = this.props;
        return (
            <div className='dashboard'>
                {loading && <Loader loadingType={loadingType}/>}
                <Intro>{page.title}</Intro>
                <DashboardContent/>
            </div>
        );
    }
}

export default connect((state) => ({loading: state.loading, loadingType: state.loadingType}))(Dashboard);


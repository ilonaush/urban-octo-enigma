import React, {Component} from 'react';
import './Dashboard.styl';
import Intro from "../Intro/Intro";
import DashboardContent from "../DashboardContent/DashboardContent";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";
import PropTypes from 'prop-types';


export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
            page: this.getPage(this.props.location.pathname, this.props.pages)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.props.loading) {
            this.setState({
                loading: nextProps.loading
            })
        }

        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                page: this.getPage(nextProps.location.pathname, nextProps.pages)
            })
        }
    }

    getPage = (path, pages = []) => {
        return {
            ...pages.find((page) => page.path === path)
        };
    };

    render() {
        const {page, loading} = this.state;
        const {loadingType} = this.props;
        return (
            <div className='dashboard'>
                {loading && <Loader loadingType={loadingType}/>}
                <Intro>{page.title}</Intro>
                <DashboardContent/>
            </div>
        );
    }
}

export default connect(
    (state) => ({pages: state.pages, loading: state.loading, loadingType: state.loadingType})
)(Dashboard);


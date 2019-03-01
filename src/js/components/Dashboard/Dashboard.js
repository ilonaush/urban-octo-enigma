import React, {Component} from 'react';
import './Dashboard.styl';
import Intro from "../Intro/Intro";
import DashboardContent from "../DashboardContent/DashboardContent";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            page: ''
        };
    }

    getPage = (path, pages = []) => {
        return {
            ...pages.find((page) => page.path === path)
        };

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.props.loading) {
            this.setState({
                loading: nextProps.loading
            })
        }
    }

    componentDidMount() {
        this.setState({
            page: this.getPage(this.props.location.pathname, this.props.pages)
        })
    }

    render() {
        const {page, loading} = this.state;
        return (
            <div className='dashboard'>
                {loading && <Loader/>}
                <Intro>{page.title}</Intro>
                <DashboardContent/>
            </div>
        );
    }
}

Dashboard.propTypes = {};


export default connect((state) => ({pages: state.pages, loading: state.loading}))(Dashboard);


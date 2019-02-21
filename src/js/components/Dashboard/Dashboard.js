import React, {Component} from 'react';
import './Dashboard.styl';
import Intro from "../Intro/Intro";
import DashboardContent from "../DashboardContent/DashboardContent";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import Loader from "../Loader/Loader";
import actions from "../../reducers/actions";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            page: ''
        };
        this.getPage = this.getPage.bind(this);
    }

    getPage(path, pages = []) {
        return {
            ...pages.find((page) => page.path === path)
        };

    }

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
    }


    render() {
        const {page} = this.state;
        return (
            <div className='dashboard'>
                {this.state.loading ?
                    <React.Fragment>
                        <Loader/>
                        <Intro>{page.title}</Intro>
                        <DashboardContent handleLoading={this.handleLoading}/>
                    </React.Fragment> :
                    <React.Fragment>
                        <Intro>{page.title}</Intro>
                        <DashboardContent handleLoading={this.handleLoading}/>
                    </React.Fragment>
                }
            </div>
        );
    }
}

Dashboard.propTypes = {};

function mapStateToProps(state) {
    return { ...state  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import CatManipulationPanel from "../CatManipulationPanel/CatManipulationPanel";
import {connect} from "react-redux";

class CatPage extends Component {

    getCat = () => {
        return this.props.cats.find((c) => c.id === +this.props.match.params.id)
    };

    render() {
        const cat = this.getCat();
        const {name, age, location, health, color, reason, img } = cat;
        return (
            <Fragment>
                <div className='info'>
                    <div>{location}</div>
                    <div>{health}</div>
                    <div>{color}</div>
                    <div>{reason}</div>
                </div>
                <div>
                    <img src={`images/${img}`} alt=""/>
                    <div>{name}</div>
                    <div>{age}</div>
                </div>
                <div>
                    <CatManipulationPanel cat={cat}/>
                </div>
            </Fragment>
        );
    }
}

CatPage.propTypes = {
    cat: PropTypes.object
};

export default connect((state) => ({cats: state.cats}))(CatPage);

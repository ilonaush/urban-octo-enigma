import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import CatManipulationPanel from "../CatManipulationPanel/CatManipulationPanel";
import {connect} from "react-redux";
import "./CatPage.styl";
import LazyLoad from "../../tools/LazyLoad";

class CatPage extends Component {

    getCat = () => {
        return this.props.cats.find((c) => c.id === +this.props.match.params.id)
    };

    render() {
        const cat = this.getCat();
        const {name, age, location, health, color, reason, img } = cat;
        return (
            <div className='cat-page'>
                    <div className="info-container">
                        <div>
                            <LazyLoad src={img} height={300}/>
                            <div className='name'>{name}</div>
                            <div className='age'>{age} years old</div>
                            <hr/>
                            <CatManipulationPanel cat={cat}/>
                        </div>
                        <div className='info'>
                            <h3>Info</h3>
                            <div>Location: {location ? location : 'unknown'}</div>
                            <div>Health: {health ? health : 'unknown'}</div>
                            <div>Color: {color ? color : 'unknown'}</div>
                        </div>

                    </div>
            </div>
        );
    }
}

CatPage.propTypes = {
    cat: PropTypes.object
};

export default connect((state) => ({cats: state.cats}))(CatPage);

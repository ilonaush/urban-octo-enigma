import React, {Component} from 'react';

class lazyLoadImage extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            img: null

        }
    }
    async componentDidMount() {
        try {
            const img = await import(/* webpackMode: "eager"  */`images/${this.props.src}`);
            this.setState({
                img: {
                    src: img.default
                },
            })
        }
        catch(err) {
            console.error(err, 'err')
        };
    }

    render () {
        return this.state.img ? <img src={this.state.img.src} alt=""/> : null
    }

};

export default lazyLoadImage;


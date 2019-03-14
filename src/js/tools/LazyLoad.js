import React, {Component} from 'react';

class lazyLoadImage extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            img: null,
            isVisible: false
        };
        this.io = null;
        this.box = null;
    }

     componentDidMount() {
        // this.io = new IntersectionObserver(entries => {
        //     console.log(entries)
        //     // if (entries[0].isIntersecting) {
        //     //     this.setState({ isVisible: entries[0].isIntersecting });
        //     // }
        // }, {});
        // this.io.observe(this.box);
    }

    // componentWillUnmount() {
    //     if (this.io) {
    //         this.io.disconnect();
    //     }
    // }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.isVisible) {
            this.loadImage();
        }
    }

    defineRef = (ref) => {
        this.box = ref;
    };

    loadImage = async () => {
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
        }
    };

    render () {
        const {height} = this.props;
        const {img, isVisible} = this.state;
        return (
            <div className='img-holder'
                 style={{height: `${height}px`}}
                 ref={this.defineRef}>
                    {img && isVisible ? <img src={img.src} alt=""/> : null }
            </div>
        )
    }
};

export default lazyLoadImage;


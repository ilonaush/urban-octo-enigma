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
        this.io = new IntersectionObserver(([entry]) => {
            const { isIntersecting } = entry;
            if (isIntersecting) {
                this.loadImage();
                this.io = this.io.disconnect();
            }
        }, {});
        this.io.observe(this.box);
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
        const {img} = this.state;
        return (
            <div className='img-holder'
                 style={{height: `${height}px`}}
                 ref={this.defineRef}>
                {img ? <img src={img.src}  alt=""/> : null}
            </div>
        )
    }
};

export default lazyLoadImage;


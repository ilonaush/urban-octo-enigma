import React, {Component} from 'react';

class lazyLoadImage extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            img: null,
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

    /**
     * assigns ref to the variable
     * @param ref
     */
    defineRef = (ref) => {
        this.box = ref;
    };

    /**
     * loads image when in viewport
     * @returns {Promise<void>}
     */
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
                 style={{height: `${height}px`, textAlign: 'center'}}
                 ref={this.defineRef}>
                {img ? <img style={{maxHeight: '100%'}} src={img.src}  alt=""/> : null}
            </div>
        )
    }
}

export default lazyLoadImage;


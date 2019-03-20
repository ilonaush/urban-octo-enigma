import React, {useState, Component} from 'react';
import PropTypes from 'prop-types';
import "./FindHomeForm.styl";
import Input from "../Input/Input";

// export function FindHomeForm ({onSubmit, cats}) {
//     const [catID, changeCatId] = useState('');
//     return (
//         <form className='fireWorkerForm' onSubmit={(e) => onSubmit(e, catID)}>
//             <select onChange={({target})=> changeCatId(target.value)}>
//                 <option value=" ">Choose the meowy</option>
//                 {cats.map((cat) =>
//                     <option key={cat.id} value={cat.id} >{cat.name}, {cat.age}</option>
//                 )}
//             </select>
//             <Input placeholder='Location of future home'/>
//             <textarea placeholder='Describe the family please'/>
//             <button id='submit-btn' type='submit'>Find home for the cat</button>
//         </form>
//     );
// };

export class FindHomeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cat: {},
    };
  }

  /**
   * handles select change
   * @param target
   */
  handleChange = ({target = null}) => {
    this.setState((prevState) => ({
      cat: {
        ...prevState.cat,
        [target.name]: target.value
      }
    }))
  };

  render() {
    const {onSubmit, cats} = this.props;
    const {cat} = this.state;
    return (
        <form className='fireWorkerForm' onSubmit={(e) => onSubmit(e, cat)}>
          <select name="id" onChange={this.handleChange} required>
            <option value=" ">Choose the meowy</option>
            {cats.map((cat) =>
                <option key={cat.id} value={cat.id}>{cat.name}, {cat.age}</option>
            )}
          </select>
          <Input
              name="address"
              placeholder='Location of future home'
              onChange={this.handleChange}
              value={cat.address}
              required
          />
          <textarea
              name="family"
              placeholder='Describe the family please'
              onChange={this.handleChange}
              value={cat.family}
              required
          />
          <button id='submit-btn' type='submit'>Find home for the cat</button>
        </form>
    );
  }
}

FindHomeForm.propTypes = {
  cats: PropTypes.array,
  onSubmit: PropTypes.func
};

FindHomeForm.defaultProps = {
  cats: [],
};

export default FindHomeForm;


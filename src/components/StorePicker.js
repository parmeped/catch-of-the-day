import React from 'react';
import { getFunName } from "../helpers";
import PropTypes from "prop-types"

class StorePicker extends React.Component {    
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object,
    }

    goToStore = event => {
        // Stop form from submitting
        event.preventDefault();
        // get text from input
        const storeName = this.myInput.value.value
        // change page to /store/anything
        this.props.history.push(`/store/${storeName}`)
    
    }

    render() {
        return (        
            <form className="store-selector" onSubmit={this.goToStore}>                
                <h2>Please Enter A Store</h2>
                <input 
                    type="text" 
                    ref = {this.myInput}
                    required 
                    placeholder="Enter Store Name"
                    defaultValue={getFunName()}
                />
                <button type="submit">Visit Store</button>
            </form>        
        )
    }
}

export default StorePicker;

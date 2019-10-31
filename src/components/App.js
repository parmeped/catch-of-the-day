import React from "react";
import PropTypes from "prop-types"
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'


class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object
    }
    
    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    loadSampleFishes = ()  => {        
        this.setState({ fishes: sampleFishes })
    }

    addFish = fish => {
        // take a copy of existing state = ...
        const fishes = {...this.state.fishes} 
        // add new fish to fishes
        fishes[`fish${Date.now()}`] = fish
        // set new fishes object to state
        // just have to pass the state to update
        this.setState({
            fishes // if property == value, then just referencing to it works
        })

    }

    updateFish = (key, updatedFish) => {
        // take copy of current state
        const fishes = { ...this.state.fishes }
        // update that state
        fishes[key] = updatedFish
        // set to state
        this.setState({ fishes })
    }

    deleteFish = (key) => {
        // take copy of state
        const fishes = { ...this.state.fishes }
        // update state
        fishes[key] = null
        // set state
        this.setState({ fishes })
    }
 
    addToOrder = (key) => {
        // take a copy of state
        const order = {...this.state.order}
        // either add to the order or update the number in order
        order[key] = order[key] + 1 || 1
        // call setState to update state object
        this.setState({ order })
    }

    removeFromOrder = (key) => {        
        // copy of state
        const order = {...this.state.order} 
        // update state
        delete order[key]
        // set order
        this.setState({ order })
    }
 
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>      
                    <ul className="fishes">                        
                        {Object.keys(this.state.fishes).map(
                            key => 
                                <Fish 
                                    key={key}
                                    index={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder}>
                                    {key}
                                </Fish>
                            )
                        }
                    </ul>
                </div>                
                <Order                     
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;
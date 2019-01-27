import React, { Component } from 'react';
import { Panel, Table, Button, Glyphicon, Badge } from 'react-bootstrap';
import store from './../store';

const styles = {
  footer: {
    fontWeight: 'bold'
  }
};


class ShoppingCart extends Component {

  constructor() {
    super();
    this.removeFromCart = this.removeFromCart.bind(this);

    this.state = {
      cart: [],
    };

    //more code
    store.subscribe(() => {
      this.setState({
        cart: store.getState().cart,
      });
    });
  }

  getKey() {
    const key = Math.random() * 100000000;
    //console.log(key);
    return key;
  }

  render() {
    console.log(this.state.cart);
    return (
      <Panel header="Shopping Cart">
        <Table fill>
          <tbody>
            {this.state.cart.map(object =>

              <tr key={this.getKey()}>
                <td>{object.item.name}<Badge color="warning" >{object.quantity}</Badge></td>
                <td className="text-right">${object.item.price} * ({object.quantity}) = ${object.item.price*object.quantity} </td>
                <td className="text-right"><Button bsSize="xsmall" bsStyle="danger" onClick={() => this.removeFromCart(object.item.id)}><Glyphicon glyph="trash" /></Button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={styles.footer}>
                Total: ${this.state.cart.reduce((sum, object) => sum + object.item.price * object.quantity, 0)}
              </td>
            </tr>
          </tfoot>
        </Table>

      </Panel>
    )
  }

  removeFromCart(id) {
    //new code
    store.dispatch({
      type: "REMOVE_FROM_CART",
      id: id
    });
  }
}

export default ShoppingCart;

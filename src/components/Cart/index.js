import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let Amount = 0
      cartList.forEach(each => {
        Amount += each.price * each.quantity
      })

      const LengthOfCarts = cartList.length

      const removingAllCartItems = () => {
        removeAllCartItems()
      }
      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="changeToRightRemoveAllButton">
                  <button
                    onClick={removingAllCartItems}
                    className="romoveAllButtonStyle"
                    type="button"
                  >
                    Remove All
                  </button>
                </div>

                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}

                <div className="OrderTotalAmount">
                  <div className="totalAmount">
                    <h1 className="h1">
                      <span className="oderTotal">Order Total: </span> Rs{' '}
                      {Amount}/-
                    </h1>
                    <p className="p">{LengthOfCarts} Items in cart</p>
                    <div>
                      <button className="CheckOut" type="button">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart

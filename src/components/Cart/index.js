import Popup from 'reactjs-popup'

import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        changeBasedOnPaymentMethod,
        basedOnPaymentMethod,
        changeBasedOnOtherInputs,
      } = value
      const showEmptyView = cartList.length === 0
      let Amount = 0
      cartList.forEach(each => {
        Amount += each.price * each.quantity
      })

      const changePayments = event => {
        console.log(event.target.value)
        changeBasedOnPaymentMethod()
      }
      console.log(basedOnPaymentMethod)

      const changePaymentsByOtherMethod = () => {
        changeBasedOnOtherInputs()
      }

      const LengthOfCarts = cartList.length

      const removingAllCartItems = () => {
        removeAllCartItems()
      }

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

                    <div className="bgForPopup">
                      <Popup
                        trigger={
                          <button className="CheckOut" type="button">
                            Checkout
                          </button>
                        }
                        modal
                      >
                        {close => (
                          <div className="PopUpCard">
                            <h1>Summery</h1>
                            <div>
                              Card, Net Banking, UPI, Wallet, and Cash on
                              Delivery
                              <br />
                              <input
                                onClick={changePaymentsByOtherMethod}
                                name="MoneySend"
                                id="Card"
                                type="radio"
                              />
                              <label htmlFor="Card">Card</label>
                              <br />
                              <input
                                name="MoneySend"
                                id="NetBanking"
                                type="radio"
                                disabled="true"
                              />
                              <label htmlFor="NetBanking">Net Banking</label>
                              <br />
                              <input
                                onClick={changePaymentsByOtherMethod}
                                name="MoneySend"
                                id="UPI"
                                type="radio"
                              />
                              <label htmlFor="UPI">UPI</label>
                              <br />
                              <input
                                onClick={changePaymentsByOtherMethod}
                                name="MoneySend"
                                id="Wallet"
                                type="radio"
                              />
                              <label htmlFor="Wallet">Wallet</label>
                              <br />
                              <input
                                onClick={changePayments}
                                name="MoneySend"
                                id="CashOnDelivery"
                                type="radio"
                              />
                              <label htmlFor="CashOnDelivery">
                                Cash on Delivery
                              </label>
                              <br />
                            </div>
                            <p>No of items: {LengthOfCarts}</p>
                            <p>Total price: {Amount}/-</p>

                            <div className="ButtonForEnableAndDisable">
                              {basedOnPaymentMethod === true ? (
                                <Popup
                                  trigger={
                                    <button className="show" type="button">
                                      Confirm Order
                                    </button>
                                  }
                                  position="top center"
                                  modal
                                >
                                  <div className="OrderPlaced">
                                    <p className="order-placed-para">
                                      Your order has been placed successfully
                                    </p>
                                  </div>
                                </Popup>
                              ) : (
                                <button
                                  disabled="true"
                                  className="Hiding"
                                  type="button"
                                >
                                  Confirm Order
                                </button>
                              )}

                              {/* TODO: hiding data
                              <Popup
                                trigger={
                                  <button
                                    type="button"
                                    disabled={
                                      basedOnPaymentMethod === true
                                        ? 'true'
                                        : 'false'
                                    }
                                    className={
                                      basedOnPaymentMethod === true
                                        ? 'show'
                                        : 'Hiding'
                                    }
                                  >
                                    Confirm Order
                                  </button>
                                }
                                position="top center"
                                modal
                              >
                                <div className="OrderPlaced">
                                  <p>Your order has been placed successfully</p>
                                </div>
                              </Popup>

                               */}
                            </div>
                            <div className="closeButtonFlex">
                              <button
                                className="CloseButton"
                                type="button"
                                onClick={() => {
                                  close()
                                }}
                              >
                                close
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
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

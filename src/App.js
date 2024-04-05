import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    basedOnPaymentMethod: false,
  }

  addCartItem = product => {
    const {cartList} = this.state

    const findingBasedOnId = cartList.find(
      eachCart => eachCart.id === product.id,
    )
    console.log(findingBasedOnId)
    if (findingBasedOnId) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (findingBasedOnId.id === each.id) {
            const quantityProduct = each.quantity + 1
            return {...each, quantity: quantityProduct}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removing = cartList.filter(each => each.id !== id)
    this.setState({cartList: removing})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const quantityDecreased = cartList.find(each => each.id === id)

    if (quantityDecreased.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            const decreasing = each.quantity - 1
            return {...each, quantity: decreasing}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id === id) {
          const increaseQuantity = each.quantity + 1
          return {...each, quantity: increaseQuantity}
        }
        return each
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  changeBasedOnPaymentMethod = () => {
    this.setState({basedOnPaymentMethod: true})
  }

  changeBasedOnOtherInputs = () => {
    this.setState({basedOnPaymentMethod: false})
  }

  render() {
    const {cartList, basedOnPaymentMethod} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          basedOnPaymentMethod,
          changeBasedOnPaymentMethod: this.changeBasedOnPaymentMethod,
          changeBasedOnOtherInputs: this.changeBasedOnOtherInputs,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 0.8,
    bacon: 0.3,
    cheese: 0.4,
}

class BurgerBuilder extends Component{

    state = { ingredient:{
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0,
                },
                totalPrice: 4,
                purchasable:false,
                purchasing:false,
            }


    purchasingStateHandler = ()=>{
        this.setState({
            purchasing:true
        })
    }

    cancelOrderHandler = () => {
        this.setState({
            purchasing:false
        })
    }

    continuePurchaseHandler = () => {
        alert("Yo hohoho yohoho")
    }

    updatePurchaseState(ingredient){
        // const ingredient = {
        //     ...this.state.ingredient
        // }

        const sum = Object.keys(ingredient)
                        .map(igkey => {
                            return ingredient[igkey];
                        })
                        .reduce((sum, el) => {
                            return sum + el
                        }, 0)

        this.setState({
            purchasable: sum > 0,
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredient};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({
            ingredient:updatedIngredients,
            totalPrice:updatedPrice,
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        if(oldCount <= 0){
            return;
        }else{
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredient };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState({
            ingredient:updatedIngredients,
            totalPrice:updatedPrice,
        })
        this.updatePurchaseState(updatedIngredients);
        } 
    }

    render(){

        const disabledInfo = { ...this.state.ingredient };

        for ( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <=0
        }


        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                        orderCanceled = {this.cancelOrderHandler}
                        >
                    <OrderSummary
                        orderCanceled = {this.cancelOrderHandler}
                        orderContinued = {this.continuePurchaseHandler} 
                        totalPrice = {this.state.totalPrice}
                        ingredients = {this.state.ingredient}/>
                </Modal>
                <Burger ingredients = {this.state.ingredient}/>
                <BurgerControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchasingStateHandler}  />
            </Aux>
        );
    }
}

export default BurgerBuilder;
import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((igkey)=>{
        return <li key = {igkey}><span style = {{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
    })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Pauroti with following ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Yeti vaye Pugxa ?</p>
            <Button btnType = "Danger" clicked = {props.orderCanceled} >CANCEL</Button>
            <Button btnType = "Success" clicked = {props.orderContinued} >CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;
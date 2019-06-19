import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(function(igkey){
        // console.log(props.ingredients[key])
        // console.log(key)
        return [...Array(props.ingredients[igkey])]
        .map((_,i)=>{
            return <BurgerIngredient key = {igkey+i} type = {igkey}/>
         });
    })
    .reduce((newarr,arrelement)=>{
        return newarr.concat(arrelement)
    });

    
        // console.log(transformedIngredients);

        // let abc = transformedIngredients.reduce(function(newarray,old2d){
        //     return newarray.concat(old2d)
        // })
        
        // console.log(abc);

        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please add some ingredients</p>
        }


    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {/* <BurgerIngredient type = "cheese"/>
            <BurgerIngredient type = "meat"/> */}
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    );
}

export default burger;
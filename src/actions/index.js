import * as Types from './../constants/ActioneTypes';
import callApi from './../utils/apiCaller';


export const actFetchProductsRequest=()=>
{
    return(dispatch)=> {
        return callApi('products','GET',null).then(res =>{
            dispatch(actFetchProducts(res.data));
        });
    }
}

export const actFetchProducts =(products) =>{
    return {
        type:Types.FETCH_PRODUCTS,
        products:products
    }
}


export const actDeleteProductRequest =(id)=>{
    return (dispatch)=>{
        return callApi(`products/${id}`,'DELETE',null).then(res =>{
            dispatch(actDeleteProduct(id));
        });

    }

}

export const actDeleteProduct = (id) =>
{
    return{
        type:Types.DELETE_PRODUCT,
        id:id

    }

}

export const actAddProductRequest =(product)=>
{
    return (dispatch) =>
    {
        return callApi('products','POST',product).then(res =>{
            dispatch(actAddProduct(res.data));

        });
    }

}

export const actAddProduct =(product) =>
{
    return {
        type:Types.ADD_PRODUCT,
        product:product
    }
}


export const actGetProductRequest=(id)=>
{
    return (dispatch) =>
    {
        return callApi(`products/${id}`,'GET',null).then(res =>
        {
            dispatch(actGetProduct(res.data));
        })
    }
}


export const actGetProduct =(product) =>
{
    return{
        type:Types.EDIT_PRODUCT,
        product:product
    }
}
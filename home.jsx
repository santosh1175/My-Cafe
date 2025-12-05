import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import Categories from "../Category";
import Card from "../components/Card";
import Food_items from "../food.js";
import { dataContext } from "../Context/UserContext.jsx";
import { RxCross2 } from "react-icons/rx";
import Cart from "../components/Cart.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Home(){
    let {cate, setCate, input, showCart, setShowCart}=useContext(dataContext)

    function filter(category){
        if (category==='All'){
            setCate(Food_items)
        } else{
            let newList=Food_items.filter((item)=>(item.food_category===category))
            setCate(newList)
        }
    }

    let items=useSelector(state=>state.cart)

    let subtotal=items.reduce((total,item)=>total+item.qty*item.price, 0)
    let deliveryFee=20;
    let taxes=subtotal*0.5/100;
    let total=Math.floor(subtotal+deliveryFee+taxes);

    return(
        <div className="w-full min-h-screen bg-slate-200"> 
            <Nav/>
            {!input ? <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
                {Categories.map((item)=>{
                    return <div className="w-[140px] h-[150px] bg-white flex flex-col items-start 
                    gap-5 p-5 justify-start text-[20px] font-semibold text-gray-700 rounded-xl shadow-xl
                    hover:bg-green-200 cursor-pointer transition-all duration-200" 
                    onClick={()=>filter(item.name)}>
                        {item.icon}
                        {item.name}
                    </div>
                })}
            </div> : null}
            
            <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center
                            pt-8 pb-8">
                {cate.length>1?cate.map((item)=>(
                    <Card name={item.food_name}
                          image={item.food_image}
                          price={item.price}
                          id={item.id}
                          type={item.food_type}/>
                )):<div className="text-center text-2xl text-gray-500 font-semibold pt-5">No dish found</div>}
                
            </div>

            <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 shadow-xl bg-white p-6 
                            flex flex-col items-center transition-all duration-500 overflow-auto            
                            ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
                <header className="w-[100%] flex justify-between items-ce   nter">
                    <span className="text-green-400 text-[18px] font-semibold">
                        Order items
                    </span>
                    <RxCross2 className="text-green-400 text-[18px] font-bold h-[30px] w-[30px]
                                         cursor-pointer hover:text-gray-700" onClick={()=>setShowCart(false)}/>
                </header>

                {items.length>0 ?  <>
                <div className="w-full mt-9 flex flex-col gap-8">
                    {items.map((item)=>
                    <Cart name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}/>
                    )}
                </div>
                <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8">
                    <div className="w-full flex justify-between items-center">
                        <span className="text-lg text-gray-600 font-semibold">
                            Subtotal
                        </span>
                        <span className="text-green-400 text-lg font-semibold">Rs {subtotal}/-</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-lg text-gray-600 font-semibold">
                            Delivery Fee
                        </span>
                        <span className="text-green-400 text-lg font-semibold">Rs {deliveryFee}/-</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-lg text-gray-600 font-semibold">
                            Taxes
                        </span>
                        <span className="text-green-400 text-lg font-semibold">Rs {taxes}/-</span>
                    </div>
                </div>
                <div>
                    <div className="w-full flex justify-between items-center p-9">
                        <span className="text-2xl text-gray-600 font-semibold">
                            Total
                        </span>
                        <span className="text-green-400 text-2xl font-semibold">Rs {total}/-</span>
                    </div>  
                </div>
                <button className="w-[80%] p-3 rounded-lg bg-green-400 text-black hover:bg-green-200
                                transition-all font-bold text-lg" 
                                onClick={()=>{
                                    toast.success("Order placed...")
                                }}>Place Order</button>
                </> : <div className="text-center text-2xl text-green-500 font-semibold pt-5">Empty Cart</div>}

            </div>
        </div>
    )
}
export default Home
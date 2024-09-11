"use server";

import axios from "axios"

export const getStaticController = async () :Promise<any[]> =>{
    let res:any = [];
    try {
        res = await axios.get("api/static")

    }catch (error) {
        console.log(error)
    }

    console.log(res.data)


    return res.data;

}
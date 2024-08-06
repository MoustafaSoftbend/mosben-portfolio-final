import axios from "axios"
import { get } from "http";

const getStatic = async () => {
    let images: object = {}

    const res = await axios.get("/api/static")
    if (res) {
        images = res.reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
        }, {});
        console.log(images)
    }
    return images;

}

export default getStatic;
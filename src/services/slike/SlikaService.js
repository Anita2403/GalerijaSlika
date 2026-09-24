
import { slike } from "./SlikaPodaci";

async function get() {
    return {data:[...slike]}

}

export default{
    get
}
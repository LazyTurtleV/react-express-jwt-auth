import { useEffect, useState } from "react";
import DataService from "../services/DataService";

export default function UserData() {
    const [data, setData] = useState();
    
    useEffect(() => {
        DataService.getData().then((d) => setData(d));
    })

    return <div>{data}</div>
}
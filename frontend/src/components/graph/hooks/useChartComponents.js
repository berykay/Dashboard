import { useState } from "react";

export const useChartComponents = () => {
    const [chartComponents, setChartComponents] = useState([]);
    return [chartComponents, setChartComponents];
}

export default useChartComponents;
 
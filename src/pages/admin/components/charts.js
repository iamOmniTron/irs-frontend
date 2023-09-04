import {BarChart,Bar,Legend,Tooltip,YAxis,XAxis,CartesianGrid} from "recharts"


const data = [
    {
      "name": "Keffi",
      "uv": 4000,
      "revenue": 2400
    },
    {
      "name": "Lafia",
      "uv": 3000,
      "revenue": 1398
    },
    {
      "name": "Awe",
      "uv": 2000,
      "revenue": 9800
    },
    {
      "name": "Karu",
      "uv": 2780,
      "revenue": 3908
    },
    {
      "name": "Nasarawa",
      "uv": 1890,
      "revenue": 4800
    },
    {
      "name": "Kokona",
      "uv": 2390,
      "revenue": 3800
    },
    {
      "name": "Akwanga",
      "uv": 3490,
      "revenue": 4300
    }
    ,
    {
      "name": "Awe",
      "uv": 2000,
      "revenue": 9800
    },
    {
      "name": "Karu",
      "uv": 2780,
      "revenue": 3908
    },
    {
      "name": "Nasarawa",
      "uv": 1890,
      "revenue": 4800
    },
    {
      "name": "Kokona",
      "uv": 2390,
      "revenue": 3800
    },
    {
      "name": "Akwanga",
      "uv": 3490,
      "revenue": 4300
    }
  ]
  

export default function Charts(){
    return(
        <>
  <BarChart width={1100} height={400} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="revenue" fill="#008000" />
  </BarChart>
        </>
    )
}
                              
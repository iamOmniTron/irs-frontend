import { Table } from "antd";

export default function DataTable({data,cols,...rest}){
    return  <Table bordered columns={cols} rowKey={(record)=>record.id?record.id:record.key} dataSource={data} pagination={{pageSize: 4,hideOnSinglePage:true}} {...rest} style={{maxWidth:"100%"}}/>
}
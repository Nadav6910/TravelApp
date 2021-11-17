import { Select } from 'antd';

export default function NumberOfChildrenMenu(){

    const { Option } = Select;

    const children = [];
    
    for (let i = 0; i < 18; i++) {
    children.push(<Option key={i}>{i}</Option>);
    }

    function handleChange(value) {
    console.log(`selected ${value}`);
    }

    return (

        <Select mode="tags" style={{ width: '30%' }} placeholder="Age" onChange={handleChange}>
            {children}
        </Select>
    )
}
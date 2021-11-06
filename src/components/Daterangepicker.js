import 'antd/dist/antd.css'
import { DatePicker, Space } from 'antd';

export default function DateRangePicker() {

    const { RangePicker } = DatePicker;

    return (
        <div className="datepicker">
            <Space direction="vertical" size={12}>
                <RangePicker/>
            </Space>
        </div>
    )
}

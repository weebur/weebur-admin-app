import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index.css';

const DayjsPicker = generatePicker(dayjsGenerateConfig);

export default DayjsPicker;

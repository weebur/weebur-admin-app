import React, { useRef } from 'react';
import { Input } from 'antd';
import { formatFilename, uploadFile } from '../services/fileService';

function FileUploader(props) {
    const ref = useRef(null);
    const handleInputChange = async (event) => {
        try {
            const input = event.target;

            if (!input.files?.length) {
                return;
            }

            const file = input.files[0];
            const filename = await uploadFile(file);
        } catch (e) {
            console.log(e);
            alert('이미지업로드에 실패하였습니다');
        }
    };

    return (
        <div>
            <Input ref={ref} type="file" onChange={handleInputChange} />
            <button
                onClick={async () => {
                    console.log(ref.current.files);
                }}
            >
                업로드
            </button>
        </div>
    );
}

export default FileUploader;

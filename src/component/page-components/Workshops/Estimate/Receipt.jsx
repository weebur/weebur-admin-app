import React from 'react';
import { PDFDownloadLink, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import ReceiptDocuments from './lib/ReceiptDocuments';
import CommonButton from '../../../Button';

function Receipt({ workshop }) {
    return (
        <div>
            <div>
                <PDFViewer style={styles.viewer}>{<ReceiptDocuments workshop={workshop} />}</PDFViewer>
            </div>
            <div>
                <PDFDownloadLink document={<ReceiptDocuments workshop={workshop} />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (
                        <CommonButton>{loading ? 'Loading document...' : '저장하기'}</CommonButton>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default Receipt;

const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth / 1.5,
        height: window.innerHeight * 0.7,
    },
});

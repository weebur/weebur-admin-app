import React from 'react';
import { PDFDownloadLink, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import CommonButton from '../../../Button';
import SettlementDocuments from './lib/SettlementDocuments';

function Settlement({ settlement }) {
    return (
        <div>
            <div>
                <PDFViewer style={styles.viewer}>{<SettlementDocuments settlement={settlement} />}</PDFViewer>
            </div>
            <div>
                <PDFDownloadLink document={<SettlementDocuments settlement={settlement} />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (
                        <CommonButton>{loading ? 'Loading document...' : '저장하기'}</CommonButton>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default Settlement;

const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth / 1.5,
        height: window.innerHeight * 0.7,
    },
});

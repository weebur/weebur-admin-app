import React from 'react';
import { PDFDownloadLink, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import CommonButton from '../../../Button';
import EstimateDocuments from './lib/EstimateDocuments';

function Estimate({ workshop }) {
    return (
        <div>
            <div>
                <PDFViewer style={styles.viewer}>{<EstimateDocuments workshop={workshop} />}</PDFViewer>
            </div>
            <div>
                <PDFDownloadLink document={<EstimateDocuments workshop={workshop} />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (
                        <CommonButton>{loading ? 'Loading document...' : '저장하기'}</CommonButton>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default Estimate;

const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth / 1.5,
        height: window.innerHeight * 0.7,
    },
});

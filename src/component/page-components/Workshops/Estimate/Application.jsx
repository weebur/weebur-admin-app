import React from 'react';
import { PDFDownloadLink, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import ApplicationDocuments from './lib/ApplicationDocuments';
import CommonButton from '../../../Button';

function Application({ workshop }) {
    return (
        <div>
            <div>
                <PDFViewer style={styles.viewer}>{<ApplicationDocuments workshop={workshop} />}</PDFViewer>
            </div>
            <div>
                <PDFDownloadLink document={<ApplicationDocuments workshop={workshop} />} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (
                        <CommonButton>{loading ? 'Loading document...' : '저장하기'}</CommonButton>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default Application;

const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth / 1.5,
        height: window.innerHeight * 0.7,
    },
});

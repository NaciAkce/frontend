import { ReportHandler } from 'web-vitals';

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        try {
            await import('web-vitals').then(
                ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                    getCLS(onPerfEntry);
                    getFID(onPerfEntry);
                    getFCP(onPerfEntry);
                    getLCP(onPerfEntry);
                    getTTFB(onPerfEntry);
                },
            );
        } catch (e) {
            console.log(e);
        }
    }
};

export default reportWebVitals;
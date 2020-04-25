import React, { useEffect, useState, useMemo } from 'react';
import styles from './ConfusionMatrix.module.css';

function IntentRow(props) {
    return props.intents.map(key => {
        return <td key={key}>{props.confusionMatrix[props.intent][key] && props.confusionMatrix[props.intent][key]}</td>
    });
}

export function ConfusionMatrix() {

    const [confusionMatrix, setConfusionMatrix] = useState({});

    useEffect(() => {
        fetch('/conf_matrix.json').then(res => {
            return res.json();
        }).then(res => {
            let cm = {};
            res.data.forEach(rec => {
                if (cm[rec.expectedIntent] === undefined)
                    cm[rec.expectedIntent] = {};
                if (cm[rec.expectedIntent][rec.watsonIntent1] === undefined)
                    cm[rec.expectedIntent][rec.watsonIntent1] = 1;
                else
                    cm[rec.expectedIntent][rec.watsonIntent1]++;
            });
            setConfusionMatrix(cm);
        });
    }, []);

    const confusionMatrixTable = useMemo(() => {
        console.log('################### BUILDING CONFUSION MATRIX TABLE ###################');
        let intents = Object.keys(confusionMatrix).reduce((list, intent) => { list.push(intent); return list }, []);
        intents.sort();
        let cmTableHeader = intents.map(key => <td key={key}><div><span>{key}</span></div></td>);
        return (
            <table className={styles.ConfusionMatrix}>
                <thead className={styles.IntentHeader}><tr><td></td>{cmTableHeader}</tr></thead>
                <tbody>
                    {intents.map(key => {
                        return <tr key={key} className={styles.IntentCMRow}><td className={styles.IntentLabel}>{key}</td><IntentRow intent={key} intents={intents} confusionMatrix={confusionMatrix} /></tr>
                    })}
                </tbody>
            </table>
        )
    }, [confusionMatrix]);

    return (<>{confusionMatrixTable}</>);
}

export default ConfusionMatrix;
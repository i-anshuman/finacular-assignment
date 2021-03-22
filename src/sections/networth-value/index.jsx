import { useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import BarChart from '../../components/barchart';
import { formatNetWorth } from '../../lib';
import styles from '../../styles/sections/section.module.scss';

const NetWorth = props => {
  const [netWorth, handleNetWorth] = useState([]);
  const [currentNetWorth, handleCurrentNetWorth] = useState({});
  const [error, handleError] = useState({});

  const onChange = e => {
    handleCurrentNetWorth(netWorth => ({
      ...netWorth,
      [e.target.name]: e.target.value
    }));
  };

  const onBlur = e => {
    const err = {...error};
    if (e.target.value === ""){
      err[e.target.name] = "Field Required.";
    }
    else {
      err[e.target.name] = "";
    }
    handleError(err);
  };

  const submit = () => {
    if (error.month !== "") {
      handleError(err => ({...err, month: "Valid input required."}));
    }
    if (error.value !== "") {
      handleError(err => ({...err, value: "Valid input required."}));
    }
    if (error.month === "" && error.value === "") {
      handleNetWorth(net => formatNetWorth(net, currentNetWorth));
      handleCurrentNetWorth({});
      handleError({});
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>Net Worth Value</h1>
      <div className={styles.section__form}>
        <Input
          label="Month"
          name="month"
          type="date"
          value={currentNetWorth.month || ""}
          error={error.month}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Input
          type="number"
          label="Value"
          name="value"
          value={currentNetWorth.value || ""}
          error={error.value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Button className={styles.section__btn} onClick={submit} >
          Add Net Worth
        </Button>
      </div>
      {
        (netWorth.length > 0) && (
          <div className={styles.section__table}>
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Value (in INR)</th>
                  <th>Change (in INR)</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                {
                  netWorth.map(({month, value, change, changePercent}, idx) => (
                    <tr key={idx}>
                      <td>{month}</td>
                      <td>{value}</td>
                      <td>{change}</td>
                      <td>{changePercent}{changePercent !== 'N/A' && '%'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
      {
        (netWorth.length > 0) && (
          <BarChart dataset={netWorth} width={500} height={300}/>
        )
      }
    </section>
  );
};

export default NetWorth;

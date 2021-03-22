import { useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import PieChart from '../../components/piechart';
import styles from '../../styles/sections/section.module.scss';

const SectorAllocation = props => {
  const [sectors, handleSectors] = useState([]);
  const [currentSector, handleCurrentSector] = useState({});
  const [error, handleError] = useState({});

  const onChange = e => {
    handleCurrentSector(sector => ({
      ...sector,
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
    if (error.sector !== "") {
      handleError(err => ({...err, sector: "Valid input required."}));
    }
    if (error.allocation !== "") {
      handleError(err => ({...err, allocation: "Valid input required."}));
    }
    if (error.sector === "" && error.allocation === "") {
      handleSectors(sectors => ([
        ...sectors, {...currentSector}
      ]));
      handleCurrentSector({});
      handleError({});
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.section__title}>Sector Allocation</h1>
      <div className={styles.section__form}>
        <Input
          label="Sector"
          name="sector"
          pattern="/\d+/"
          value={currentSector.sector || ""}
          error={error.sector}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Input
          type="number"
          label="Alocation"
          name="allocation"
          value={currentSector.allocation || ""}
          error={error.allocation}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Button className={styles.section__btn} onClick={submit}>
          Add Sector
        </Button>
      </div>
      {
        (sectors.length > 0) && (
          <div className={styles.section__table}>
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>Current Allocation</th>
                  <th>Allocation (in %)</th>
                </tr>
              </thead>
              <tbody>
                {
                  sectors.map(({sector, allocation}, idx) => (
                    <tr key={idx}>
                      <td>{sector}</td>
                      <td>{allocation}</td>
                      <td>
                        {
                          Math.round(
                            (allocation * 100) / (sectors.reduce((pv, cv) => pv + parseInt(cv.allocation), 0))
                          )
                        }%
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
      {
        (sectors.length > 0) && 
        <PieChart data={sectors} outerRadius={150} innerRadius={50}/>
      }
    </section>
  );
};

export default SectorAllocation;

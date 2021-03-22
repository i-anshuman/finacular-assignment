import Header from '../components/header';
import Footer from '../components/footer';
import Sector from '../sections/sector-allocation';
import NetWorth from '../sections/networth-value';

const Finacular = props => {
  return (
    <>
      <Header />
      <main id="main">
        <NetWorth />
        <br/>
        <Sector/>
      </main>
      <Footer />
    </>
  );
};

export default Finacular;

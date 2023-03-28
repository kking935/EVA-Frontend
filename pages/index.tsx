import Layout from '../components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout>
      <h1 className='font-bold text-3xl text-center mb-5'>
        ABOUT MASLOW
      </h1>

      <p className='text-md leading-7'><b>MASLOW</b> is a pre-screening health platform that leverages natural language processing to identify each patient's unique Social Determinants of Health (SDOH) prior to receiving medical care. 
      By referencing to a patient&lsquo;s <b>MASLOW SDOH Report</b>, care teams can better address social risk factors and improve patient health outcomes.</p>

      <div className='inline-flex justify-center items-center w-full mt-10'>
        {/* <Link className='action-item text-dark font-bold' href='/survey'>New Survey</Link> */}
        <a className='action-item text-dark font-bold'
          href="javascript:void(
            window.open(
              'https://form.jotform.com/230605807378157',
              'blank',
              'scrollbars=yes,
              toolbar=no,
              width=700,
              height=500'
            )
          )
        ">
          SDOH Survey
        </a>
      </div>
      
    </Layout>
  );
}

export default HomePage;

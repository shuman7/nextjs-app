import { ReactElement } from 'react';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
    return (
        <div>
            <h1>設定画面</h1>

            
        </div>
    )
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }

export default Profile;

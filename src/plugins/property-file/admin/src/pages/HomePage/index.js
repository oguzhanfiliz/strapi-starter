/*
 *
 * HomePage
 *
 */
// import { Layout, BaseHeaderLayout,ContentLayout } from '@strapi/design-system/Layout';
import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { EmptyStateLayout,Button,Layout, BaseHeaderLayout,ContentLayout } from '@strapi/design-system';
import Plus from '@strapi/icons/Plus';
import { Illo } from '../../components/Illo';

const HomePage = () => {
  const [propertyData, setPropertyData] = React.useState(
  []
  );
  return (
    <Layout>
      <BaseHeaderLayout
      title = "Property File"
      subtitle = "Manage your property file"
      as = "h1"
      />
       <ContentLayout>
    {
      propertyData.length === 0 ? (
        <EmptyStateLayout
          content="You don't have any content yet..."
          icon={<Illo />}
          action={
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              variant="secondary"
              startIcon={<Plus />}
            >
              Add your first content
            </Button>
          }
          />
      ) : (
        <p> count and table</p>
      )
    }
        </ContentLayout>
    </Layout>
  );
};

export default HomePage;

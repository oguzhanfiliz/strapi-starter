import React, { memo, useEffect, useCallback } from 'react';
import pluginId from '../../pluginId';
import { nanoid } from 'nanoid';
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import propertyRequest from '../../api/property';
import { EmptyStateLayout, Button, Layout, BaseHeaderLayout, ContentLayout } from '@strapi/design-system';
import Plus from '@strapi/icons/Plus';

import { Illo } from '../../components/Illo';
import PropertyModal from '../../components/PropertyModal';
import PropertyTable from "../../components/PropertyTable";
import { property } from '../../../../server/content-types';

const HomePage = () => {
  const [propertyData, setPropertyData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = useCallback(async () => {
    if (isLoading === false) setIsLoading(true);
    const property = await propertyRequest.getAllData();
    await setPropertyData(property);
    await console.log(propertyData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <BaseHeaderLayout title="Properties">
        <Button
          icon={<Plus />}
          label="Add Property"
          onClick={() => setShowModal(true)}
        />
      </BaseHeaderLayout>
      <ContentLayout>
        {isLoading ? (
          <LoadingIndicatorPage />
        ) : propertyData.length === 0 ? (
          <EmptyStateLayout
            title="No Properties Found"
            description="Create a new property to get started."
            primaryAction={
              <Button
                label="Add Property"
                onClick={() => setShowModal(true)}
              />
            }
            illo={<Illo />}
          />
        ) : (
          <PropertyTable
          propertyData={propertyData}
          />
        )}
      </ContentLayout>
      <PropertyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => fetchData()}
      />
    </Layout>
  );
};

export default memo(HomePage);

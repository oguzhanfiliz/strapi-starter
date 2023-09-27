import React, { memo, useEffect, useCallback } from 'react';
import pluginId from '../../pluginId';
import { nanoid } from 'nanoid';
// @ts-ignore
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import propertyRequest from '../../api/property';
import { EmptyStateLayout, Button, Layout, BaseHeaderLayout, ContentLayout } from '@strapi/design-system';
// @ts-ignore
import Plus from '@strapi/icons/Plus';

import { Illo } from '../../components/Illo';
import PropertyModal from '../../components/PropertyModal';
import PropertyTable from "../../components/PropertyTable";
import { property } from '../../../../server/content-types';

const HomePage = () => {
  const [propertyData, setPropertyData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  

  const fetchData = async (e) => {  
    if (isLoading === false) setIsLoading(true);
     // if e contains type
      if (e && e.type === "add") {
        await propertyRequest.addData(e.key, e.value);
      }


      const property = await propertyRequest.getAllData();
      await setPropertyData(property);
      setIsLoading(false);
  }
  
  useEffect(() => {
    const initFetchData = async () => {
      await fetchData();
    };
    setShowModal(false);

    initFetchData();
  }, []);
 
  async function addData(data) {
    await propertyRequest.addData(data);
    await fetchData();
  }

  async function toogleData(data) {
    await propertyRequest.toogleData(data.id);
  }

  async function deleteData(data) {
    await propertyRequest.deleteData(data.id);
    await fetchData();
  }

  async function updateData(id, data) {
      console.log("index.js: ", data);
    await propertyRequest.updateData(id, data.key, data.value);
    await fetchData();
  }

  return (
    <
// @ts-ignore
    Layout>
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
                onClick={() => setShowModal(false)}
              />
            }
            illo={<Illo />}
          />
        ) : (
          // @ts-ignore
          <PropertyTable
          propertyData={propertyData}
          setShowModal={setShowModal}
          deleteProperty={deleteData}
          editProperty={updateData}
          />
        )}
      </ContentLayout>
            <PropertyModal
            showModal={showModal}
            onClose={setShowModal}
            onSubmit={fetchData}
          />
    </Layout>
  );
};

export default memo(HomePage);

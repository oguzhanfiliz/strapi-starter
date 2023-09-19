/*
 *
 * HomePage
 *
 */
// import { Layout, BaseHeaderLayout,ContentLayout } from '@strapi/design-system/Layout';
import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { nanoid } from 'nanoid';
import { EmptyStateLayout,Button,Layout, BaseHeaderLayout,ContentLayout } from '@strapi/design-system';
import Plus from '@strapi/icons/Plus';
import { Illo } from '../../components/Illo';
import PropertyModal from '../../components/PropertyModal';
import PropertyTable from "../../components/PropertyTable";

const HomePage = () => {
  const [propertyData, setPropertyData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  async function addProperty(data) {
    setPropertyData([...propertyData, { ...data, id: nanoid(), isDone: false }]);
  }

  async function toggleProperty(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteProperty(data) {
    alert("Add Delete Todo in API");
  }

  async function editProperty(id, data) {
    alert("Add Edit Todo in API");
  }

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
        <>

        <PropertyTable
          propertyData={propertyData}
          setShowModal={setShowModal}
          toggleProperty={toggleProperty}
          deleteProperty={deleteProperty}
          editProperty={editProperty}
        />
      </>
      )
    }
        </ContentLayout>
        {showModal && (
          <PropertyModal
            setShowModal={setShowModal} addProperty={addProperty}
          />
        )}
    </Layout>
  );
};

export default HomePage;

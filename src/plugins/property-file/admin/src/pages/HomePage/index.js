import React, { memo, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import pluginId from '../../pluginId';
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { BaseHeaderLayout, Button, ContentLayout, EmptyStateLayout, Layout } from '@strapi/design-system';
import Plus from '@strapi/icons/Plus';
import PropertyModal from '../../components/PropertyModal';
import PropertyTable from "../../components/PropertyTable";
import propertyRequest from '../../api/property';
import { property } from '../../../../server/content-types';
import { Illo } from '../../components/Illo';

const HomePage = () => {
  const [propertyData, setPropertyData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [languages, setLanguages] = React.useState({});
  const [selectedValue, setSelectedValue] = React.useState();

  async function fetchLanguages() {
    try {
      const siteUrl = (window.location.origin === "http://localhost:8000") ? "http://localhost:1337" : window.location.origin; // for development mode not run 8000 port...
      const response = await axios.get(`${siteUrl}/api/i18n/locales`);
      const languageData = response.data;
      const sortedLanguages = languageData.sort((a, b) => {
        if (a.isDefault) {
          setSelectedValue(a.code);
          return -1;
        }
        if (b.isDefault) {
          return 1;
        }
        return a.name.localeCompare(b.name);
      });

      const formattedLanguages = sortedLanguages.reduce((acc, lang) => {
        acc[lang.code] = lang.name;
        return acc;
      }, {});
      await setLanguages(formattedLanguages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchData(e) {
    setIsLoading(true);

    if (e && e.type === "add") {
      await propertyRequest.addData(e.key, e.value);
    }

    if (!e) {
      await fetchLanguages();
    } else {
      setSelectedValue(e);
    }

    const property = await propertyRequest.getAllData(e);
    await setPropertyData(property);
    setIsLoading(false);
  }

  useEffect(() => {
    setShowModal(false);
    fetchData();
  }, []);

  async function addData(data) {
    await propertyRequest.addData(data);
    console.log("index.js: ", data);
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
        ) : (
          <PropertyTable
            propertyData={propertyData}
            setShowModal={setShowModal}
            deleteProperty={deleteData}
            editProperty={updateData}
            changeLanguage={fetchData}
            languages={languages}
            selectedValue={selectedValue}
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
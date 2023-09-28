import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
  // @ts-ignore
} from "@strapi/design-system/Table";
// @ts-ignore
import { Box } from "@strapi/design-system/Box";
// @ts-ignore
import { Flex } from "@strapi/design-system/Flex";
// @ts-ignore
import { Button } from "@strapi/design-system/Button";
// @ts-ignore
import { Typography } from "@strapi/design-system/Typography";
// @ts-ignore
import { IconButton } from "@strapi/design-system/IconButton";
// @ts-ignore
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
// @ts-ignore
import { BaseCheckbox } from "@strapi/design-system/BaseCheckbox";
// @ts-ignore
import { TextInput } from "@strapi/design-system/TextInput";
// @ts-ignore
import Pencil from "@strapi/icons/Pencil";
// @ts-ignore
import Trash from "@strapi/icons/Trash";
// @ts-ignore
import Plus from "@strapi/icons/Plus";
import {
  Combobox,
  ComboboxOption,
  CreatableCombobox,
} from "@strapi/design-system";
import {
  SingleSelect,
  SingleSelectOption,
  MultiSelect,
  MultiSelectOption,
  MultiSelectNested,
  /**
   * These imports are still valid, but will be removed in the
   * next major iteration
   */
  Select,
  Option,
  OptGroup,
} from "@strapi/design-system";
import axios from "axios";

function PropertyCheckbox({ value, checkboxID, callback, disabled }) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({ id: checkboxID, value: !isChecked });
    }
  }

  return (
    <BaseCheckbox
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function PropertyInput({ value, onChange }) {
  return (
    <TextInput
      type="text"
      aria-label="property-input"
      name="property-input"
      // error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}

const getAllLanguages = () => {
  return fetch("http://localhost:1337/api/i18n/locales")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
};



function LanguageCombobox({ value, onChange }) {
  const [inputValue, setInputValue] = useState("en");
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await axios.get("http://localhost:1337/api/i18n/locales");
        const languageData = response.data;
        // Transform the language data into the desired format, if needed
        const formattedLanguages = languageData.reduce((acc, lang) => {
          acc[lang.code] = lang.name;
          return acc;
        }, {});
        setLanguages(formattedLanguages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchLanguages();
  }, []);

  function handleOnChange(event) {
    // TODO Make the request to list the table in the selected language 
    setInputValue(event);
  }

  return (
    <SingleSelect
      selectButtonTitle={languages[value]}
      label="Language"
      placeholder="Select Translate language"
      value={inputValue}
      onChange={handleOnChange}
    >
      {Object.keys(languages).map((key) => (
        <SingleSelectOption key={key} value={key}>{languages[key]}</SingleSelectOption>
      ))}
    </SingleSelect>
  );
}

export default function PropertyTable({
  propertyData,
  toggleProperty,
  deleteProperty,
  editProperty,
  setShowModal,
}) {
  const [selectedValue, setSelectedValue] = useState("en");

  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <div>
        <Flex direction="column" alignItems="start" gap={11}>
          <LanguageCombobox
            value={selectedValue}
            onChange={(value) => setSelectedValue(value)}
          />
          <Flex  justifyContent="center"></Flex>
        </Flex>
      </div>
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add a property
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">property</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Status</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {propertyData.map((property) => {
            const [inputValue, setInputValue] = useState(property.value);
            const [inputKey, setInputKey] = useState(property.key);

            const [isEdit, setIsEdit] = useState(false);

            return (
              <Tr key={property.id}>
                <Td>
                  <Typography textColor="neutral800">{property.key}</Typography>
                </Td>

                <Td>
                  {isEdit ? (
                    <>
                      <PropertyInput
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                      />
                      <PropertyInput
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </>
                  ) : (
                    <Typography textColor="neutral800">
                      {property.value}
                    </Typography>
                  )}
                </Td>

                <Td>
                  <PropertyCheckbox
                    value={property.isDone}
                    checkboxID={property.id}
                    callback={toggleProperty}
                    disabled={isEdit}
                  />
                </Td>

                <Td>
                  {isEdit ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button
                        onClick={() =>
                          editProperty(property.id, {
                            key: inputKey,
                            value: inputValue,
                          })
                        }
                      >
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <IconButton
                        onClick={() => setIsEdit(true)}
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                      />

                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => deleteProperty(property)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

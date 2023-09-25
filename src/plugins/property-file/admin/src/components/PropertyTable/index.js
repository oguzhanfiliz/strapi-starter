import React, { useState } from "react";
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
      error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}

export default function PropertyTable({
  propertyData,
  toggleProperty,
  deleteProperty,
  editProperty,
  setShowModal,
}) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
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
            const [inputValue, setInputValue] = useState(property.name);

            const [isEdit, setIsEdit] = useState(false);

            return (
              <Tr key={property.id}>
                <Td>
                  <Typography textColor="neutral800">{property.key}</Typography>
                </Td>

                <Td>
                  {isEdit ? (
                    <PropertyInput
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  ) : (
                    <Typography textColor="neutral800">{property.value}</Typography>
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
                        onClick={() => editProperty(property.id, { name: inputValue })}
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
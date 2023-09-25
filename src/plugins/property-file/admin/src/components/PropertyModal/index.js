import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";

export default function TodoModal({ showModal , onClose, onSubmit  }) {
  const [inputKey, setInputKey] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
  
      await onSubmit({ key: inputKey , value: inputValue , type: "add" });
      onClose();
    } catch (e) {
      console.log("error", e);
    }
  };

  const getError = () => {
    if (inputKey.length > 40) {
      return "Content is too long";
    }

    return null;
  };

  return (
  <>
  {showModal && <ModalLayout
      onClose={() => onClose()}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add Data
        </Typography>
      </ModalHeader>

      <ModalBody>
        <div className="col-md-6">
        <TextInput
          placeholder = "Please insert key"
          name =  "text"
          value= {inputKey}
          onChange = {(e) => setInputKey(e.target.value)}
          label="Key"
          cssClass="mb-4"
          error={getError()}
        />
</div>
<div className="col-md-6">

         <TextInput
          placeholder = "Please insert value"
          name =  "text"
          value= {inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
          label="Value"
          error={getError()}
        />
</div>
        
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => onClose(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit" onClick = {(e) => handleSubmit(e)}>Add Property</Button>}
      />
    </ModalLayout>}
  </> 
  );
}
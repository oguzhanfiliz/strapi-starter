import React, { useEffect, useState } from "react";
import {
  SingleSelect,
  SingleSelectOption
} from "@strapi/design-system";
import axios from "axios";

export function LanguageCombobox({ value, changeLanguage,languages }) {
  async function handleOnChange(event) {
    await changeLanguage(event);
  }
  return (
    <SingleSelect
      selectButtonTitle={languages[value]}
      label="Language"
      placeholder="Select Translate language"
      value={value}
      onChange={handleOnChange}
      changeLanguage={changeLanguage}
    >
      {Object.keys(languages).map((key) => (
        <SingleSelectOption key={key} value={key}>{languages[key]}</SingleSelectOption>
      ))}
    </SingleSelect>
  );
}

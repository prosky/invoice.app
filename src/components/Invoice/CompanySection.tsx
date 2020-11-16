import React, {FC} from "react";
import View from "../View";
import EditableInput from "../Inputs/EditableInput";
import EditableSelect from "../Inputs/EditableSelect";
import countries from "../../data/countries";
import {CompanyInterface} from "../../data/types";
import {useTranslation} from "react-i18next";


interface Params {
  company: CompanyInterface,
  onChange?: (company: CompanyInterface) => void
}

const CompanySection: FC<Params> = ({company, onChange}) => {

  const {t} = useTranslation();

  const handleChange = (key: keyof CompanyInterface, value: any) => {
    company[key] = value;
    onChange && onChange(company);
  }

  return (
    <>
      <EditableInput
        className="fs-20 bold"
        placeholder={t("Your Company")}
        value={company.name}
        onChange={(value) => handleChange('name', value)}
      />
      <EditableInput
        placeholder={t("Company's Address")}
        value={company.address}
        onChange={(value) => handleChange('address', value)}
      />
      <EditableInput
        placeholder={t("City, State Zip")}
        value={company.address2}
        onChange={(value) => handleChange('address2', value)}
      />
      <EditableSelect
        placeholder={t("Company's Country")}
        options={countries}
        value={company.country}
        onChange={(value) => handleChange('country', value)}
      />
      <EditableInput
        placeholder={t("Company Identification Number")}
        value={company.cin}
        onChange={(value) => handleChange('cin', value)}
      />
      <EditableInput
        placeholder={t("Tax Identification Number")}
        value={company.tin}
        onChange={(value) => handleChange('tin', value)}
      />
    </>
  );
}
export default CompanySection;

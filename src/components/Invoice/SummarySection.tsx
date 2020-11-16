import View from "../View";
import EditableInput from "../Inputs/EditableInput";
import React, {FC, useContext} from "react";
import ApplicationContext from "../../model/ApplicationContext";
import {InvoiceLabels} from "../../data/types";
import Text from "../Text";
import {Formatter} from "../../formatter";

interface Props {
  subTotal: number,
  saleTax: number,
  onChange: (labels: InvoiceLabels) => void
}


const SummarySection: FC<Props> = ({subTotal, saleTax, onChange}) => {

  const {app} = useContext(ApplicationContext);
  const {invoice} =app;
  const {money} = new Formatter(invoice);

  const handleLabelChange = (name: keyof InvoiceLabels, value: any) => {
    invoice.labels[name] = value;
    onChange(invoice.labels);
  }

  return (

    <View className="flex justify-content-end">
      <View className="w-50 mt-20">
        <View className="flex">
          <View className="w-50 p-5">
            <EditableInput
              value={invoice.labels.subTotal}
              onChange={(value) => handleLabelChange('subTotal', value)}
            />
          </View>
          <View className="w-50 p-5">
            <Text className="right bold dark">
              {money(subTotal)}
            </Text>
          </View>
        </View>
        <View className="flex">
          <View className="w-50 p-5">
            <EditableInput
              value={invoice.labels.tax}
              onChange={(value) => handleLabelChange('tax', value)}
            />
          </View>
          <View className="w-50 p-5">
            <Text className="right bold dark">
              {money(saleTax)}
            </Text>
          </View>
        </View>
        <View className="flex bg-gray p-5">
          <View className="w-50 p-5">
            <EditableInput
              className="bold"
              value={invoice.labels.total}
              onChange={(value) => handleLabelChange('total', value)}
            />
          </View>
          <View className="w-50 p-5 flex">
            <Text className="right bold dark">
              {money(subTotal + saleTax, true)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export default SummarySection;

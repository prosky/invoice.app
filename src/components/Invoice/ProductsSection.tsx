import View from "../View";
import EditableInput from "../Inputs/EditableInput";
import EditableTextarea from "../Inputs/EditableTextarea";
import Text from "../Text";
import React, {FC, useContext, useEffect, useState} from "react";
import {InvoiceLabels, ProductInterface} from "../../data/types";
import ApplicationContext from "../../model/ApplicationContext";
import factory from "../../data/initialData";
import PageContext from "../../model/PageContext";
import {useTranslation} from "react-i18next";
import EditableInputNumber from "../Inputs/EditableInputNumber";
import SummarySection from "./SummarySection";
import {Button} from "antd";
import {MinusCircleFilled, PlusCircleOutlined} from "@ant-design/icons";


interface ProductLineProps {
  index: number
  product: ProductInterface
  onChange: (product: ProductInterface) => void
  onRemove: (index: number) => void
}

const ProductLine: FC<ProductLineProps> = ({index, product, onChange, onRemove}) => {

  const {t} = useTranslation();
  const {app} = useContext(ApplicationContext);
  const {invoice, formatter} = app;
  const {pdfMode} = React.useContext(PageContext);
  const {money} = formatter;

  const [data, setData] = useState<ProductInterface>(product);

  const calculateAmount = (data: ProductInterface): number => {
    return invoice.calculatePrice(data) + invoice.calculateTax(data);
  }

  const handleChange = (name: keyof ProductInterface, value: string | number | undefined) => {
    // @ts-ignore
    product[name] = value;
    setData({...product});
    onChange && onChange(product);
  }

  return (
    <View key={index} className='tr'>
      <View className="td cell-width-big cell-padding pb-10">
        <EditableTextarea
          className="dark"
          rows={1}
          placeholder={t("Enter item name/description")}
          value={data.description}
          onChange={(value) => handleChange('description', value)}
        />
      </View>
      <View className="td cell-width cell-padding pb-10">
        <EditableInputNumber
          className="dark right"
          min={0}
          value={data.quantity}
          onChange={(value) => handleChange('quantity', value)}
        />
      </View>
      {invoice.withVAT &&
      <View className="td cell-width cell-padding pb-10">
        <EditableInputNumber
          className="dark right"
          min={0}
          value={data.taxRate}
          onChange={(value) => handleChange('taxRate', value)}
        />
      </View>
      }
      <View className="td cell-width cell-padding pb-10">
        <EditableInputNumber
          className="dark right"
          value={data.price}
          min={0}
          onChange={(value) => handleChange('price', value)}
        />
      </View>
      <View className=" td cell-width cell-padding pb-10">
        <Text className="dark right">
          {money(calculateAmount(product))}
        </Text>
      </View>
      {!pdfMode && (
        <View className='td'>
          <Button aria-label={t("Remove Row")} type='link'
                  title={t("Remove Row")} danger={true}
                  className={'red'} shape="circle" icon={<MinusCircleFilled/>} onClick={() => onRemove(index)}>
          </Button>
        </View>
      )}
    </View>
  );
};

interface ProductsSectionProps {
  onChange: () => void
}

const ProductsSection: FC<ProductsSectionProps> = ({onChange}) => {

  const {t} = useTranslation();

  const {app} = useContext(ApplicationContext);
  const {invoice} = app;
  const {pdfMode} = React.useContext(PageContext);

  const [products, setProducts] = useState<ProductInterface[]>(invoice.products);


  const handleRemove = (i: number) => {
    invoice.products = invoice.products.filter((productLine, index) => index !== i);
    setProducts([...invoice.products]);
    onChange();
  }

  const handleLabelChange = (name: keyof InvoiceLabels, value: any) => {
    invoice.labels[name] = value;
    onChange();
  }
  const handleChange = () => {
    setProducts([...invoice.products]);
    onChange();
  }
  const handleAdd = () => {
    invoice.products.push(factory.product());
    setProducts([...invoice.products]);
    onChange();
  }

  const [subTotal, setSubTotal] = useState<number>(invoice.sumPrice());
  const [saleTax, setSaleTax] = useState<number>(invoice.sumTax());


  useEffect(() => {
    setSubTotal(invoice.sumPrice());
    setSaleTax(invoice.sumTax());
  }, [products]);

  return (
    <>
      <View className="mt-20 table">
        <View className='bg-dark thead'>
          <View className='tr'>
            <View className="td cell-width-big cell-padding">
              <EditableInput
                className="white bold"
                value={invoice.labels.description}
                onChange={(value) => handleLabelChange('description', value)}
              />
            </View>
            <View className="th cell-width cell-padding">
              <EditableInput
                className="white bold right"
                value={invoice.labels.quantity}
                onChange={(value) => handleLabelChange('quantity', value)}
              />
            </View>
            {invoice.withVAT &&
            <View className="th cell-width cell-padding">
              <EditableInput className="white bold right" value={invoice.labels.taxRate}
                             onChange={(value) => handleLabelChange('taxRate', value)}
              />
            </View>}
            <View className="th cell-width cell-padding">
              <EditableInput className="white bold right" value={invoice.labels.price}
                             onChange={(value) => handleLabelChange('price', value)}
              />
            </View>
            <View className="th cell-width cell-padding">
              <EditableInput className="white bold right" value={invoice.labels.sum}
                             onChange={(value) => handleLabelChange('sum', value)}
              />
            </View>
            {!pdfMode && (<View className='th'/>)}
          </View>
        </View>
        <View className='tbody'>
          {products.map((product, i) => (
            <ProductLine key={i} product={product} index={i} onRemove={handleRemove} onChange={handleChange}/>
          ))}
        </View>
      </View>
      {!pdfMode &&
      <View className="mt-10">
        <Button type='primary' icon={<PlusCircleOutlined/>} onClick={handleAdd}>
          {t('Add Line Item')}
        </Button>
      </View>
      }
      <SummarySection onChange={onChange} subTotal={subTotal} saleTax={saleTax}/>
    </>
  );
}
export default ProductsSection;
